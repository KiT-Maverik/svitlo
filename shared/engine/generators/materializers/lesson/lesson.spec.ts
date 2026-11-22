import assert from 'node:assert/strict';
import ts from 'typescript';
import test from 'node:test';
import { materializeLesson } from './lesson';
import { materializeContentSection, type Source as ContentSource } from '../contentSection/contentSection';
const id=(n:string)=>'12345678-1234-4234-8234-1234567890'+n;
const section=()=>({id:id('02'),slug:'introduction',type:'content',params:{},
 locale:{title:{en:'Introduction',uk:'Вступ'},navigationLabel:'1'},
 content:{items:{prompt:{id:id('03'),slug:'prompt',type:'text',params:{},locale:{value:{en:'Read',uk:'Читай'}}}},order:['prompt']}
});
const lesson=()=>({id:id('01'),slug:'basics',type:'lesson',skills:[],params:{
 languages:['en','uk'],quizRequiredForCompletion:false,
 sections:{allowNavigation:true,allowSkipping:true,showIndexes:true}},
 locale:{title:{en:'Basics',uk:'Основи'}},section:{items:{introduction:section()},order:['introduction']}
});
const renderContentBlock=(child:{slug:string},o:{directory:string})=>({
 exportName:child.slug,files:[{path:o.directory+'/index.ts',kind:'typescript' as const,content:'// Owned ContentBlock\n'}],diagnostics:[]
});
const renderSection=(child:Parameters<typeof materializeContentSection>[0],o:Parameters<typeof materializeContentSection>[1])=>
 materializeContentSection(child,{...o,renderContentBlock});
test('Lesson source retains immutable ID, order and source-only active languages',()=>{
 const options={documentLanguage:'en',renderSection:(child:Parameters<typeof materializeLesson>[1]['renderSection'] extends (arg:infer C,opts:infer O)=>unknown ? C : never,
  o:Parameters<typeof materializeLesson>[1]['renderSection'] extends (arg:infer C,opts:infer O)=>unknown ? O : never)=>
  renderSection(child as ContentSource,o as Parameters<typeof materializeContentSection>[1])};
 const first=materializeLesson(lesson() as Parameters<typeof materializeLesson>[0],options);
 assert.deepEqual(materializeLesson(lesson() as Parameters<typeof materializeLesson>[0],options),first);
 const root=first.files.at(-1)?.content??'';
  const ast = ts.createSourceFile('source.ts', root, ts.ScriptTarget.Latest, true);
  assert.equal(ast.parseDiagnostics.length, 0, 'generated TS must parse without errors');
 assert.match(root,/defineLesson<"basics", typeof languages, typeof section.items>/);
 assert.match(root,/"order": \["introduction"\]/);
 assert.match(root,new RegExp(id('01')));
 assert.match(root,/"en": "Basics"/);
 assert.doesNotMatch(root,/"uk": "Основи"/);
 assert.equal(first.files.find(f=>f.path==='sections/introduction/index.ts')?.kind,'typescript');
 assert.match(first.files.find(f=>f.path==='languages.ts')?.content??'',/TODO \(BLOCKER\).*Restore reviewed Lesson languages/);
});
test('Section subtree source is byte-identical whether invoked by Lesson or by Episode',()=>{
 const fromEpisode=renderSection(section() as ContentSource,{
  directory:'sections/introduction',documentLanguage:'en',languagesImport:'../../languages',renderContentBlock
 });
 const fromLesson=materializeLesson(lesson() as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',
  renderSection:(child,opts)=>renderSection(child as ContentSource,{...opts,renderContentBlock})
 });
 const sub=fromLesson.files.filter(f=>f.path.startsWith('sections/introduction/'));
 assert.deepEqual(sub,fromEpisode.files);
});
test('Missing required Quiz produces an explicit blocker, never a fabricated bank',()=>{
 const l=lesson();
 l.params.quizRequiredForCompletion=true;
 const out=materializeLesson(l as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',renderSection:(child,opts)=>renderSection(child as ContentSource,{...opts,renderContentBlock})
 });
 assert.match(out.files.at(-1)?.content??'',/TODO \(BLOCKER\).*required Quiz/);
 assert.doesNotMatch(out.files.at(-1)?.content??'',/feedc0de-/);
});
test('Rejects duplicate order, mismatched Section slug and unsafe paths',()=>{
 const l=lesson();l.section.order=[];
 assert.throws(()=>materializeLesson(l as Parameters<typeof materializeLesson>[0],{documentLanguage:'en',renderSection:()=>{throw Error('never')}}),/order/);
 const x=lesson();x.section.items.introduction.slug='bad';
 assert.throws(()=>materializeLesson(x as Parameters<typeof materializeLesson>[0],{documentLanguage:'en',renderSection:()=>{throw Error('never')}}),/invalid Section/);
});
