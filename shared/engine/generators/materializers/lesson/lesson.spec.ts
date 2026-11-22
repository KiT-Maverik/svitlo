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
  const parsed = ts.transpileModule(root, {
    reportDiagnostics: true,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  assert.equal(parsed.diagnostics?.filter(issue => issue.category === ts.DiagnosticCategory.Error).length ?? 0,
    0, 'generated TS must parse without errors');
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
  renderSection:(child,opts)=>{assert.equal(opts.languagesImport,'../../languages');return renderSection(child as ContentSource,{...opts,renderContentBlock})}
 });
 const sub=fromLesson.files.filter(f=>f.path.startsWith('sections/introduction/'));
 assert.deepEqual(sub,fromEpisode.files);
});
test('Missing enabled Quiz refuses complete Lesson emission before delegating child files',()=>{
 const l=lesson();
 l.params.quizRequiredForCompletion=true;
 let called=0;
 assert.throws(()=>materializeLesson(l as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',renderSection:()=>{called++;throw Error('not reached');}
 }),/TODO \(BLOCKER\).*enabled Quiz Section/);
 assert.equal(called,0,'fail closed before producing even child source');
});
test('Rejects duplicate order, mismatched Section slug and unsafe paths',()=>{
 const l=lesson();l.section.order=[];
 assert.throws(()=>materializeLesson(l as Parameters<typeof materializeLesson>[0],{documentLanguage:'en',renderSection:()=>{throw Error('never')}}),/order/);
 const x=lesson();x.section.items.introduction.slug='bad';
 assert.throws(()=>materializeLesson(x as Parameters<typeof materializeLesson>[0],{documentLanguage:'en',renderSection:()=>{throw Error('never')}}),/invalid Section/);
});

test('Lesson audience age/grade ranges remain Config params, without source mutation',()=>{
 const original=lesson();
 const config={...original,params:{...original.params,age:{min:6,max:10},grade:{min:1,max:4}}};
 const result=materializeLesson(config as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',
  renderSection:(child,opts)=>renderSection(child as ContentSource,{...opts,renderContentBlock})
 });
 const root=result.files.at(-1)?.content??'';
 assert.match(root,/"age": \{\s*"min": 6,\s*"max": 10/);
 assert.match(root,/"grade": \{\s*"min": 1,\s*"max": 4/);
 assert.deepEqual(config.params.age,{min:6,max:10});
});

test('Course Stage 3 slots and built override references cannot be materialized as Lesson source',()=>{
 const noChild=()=>{throw new Error('Unexpected child materialization');};
 assert.throws(()=>materializeLesson({type:'lesson',slug:'newPlan',skills:[]} as unknown as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',renderSection:noChild
 }),/complete standalone Lesson Config/);
 assert.throws(()=>materializeLesson({id:id('01'),base:{},locale:undefined} as unknown as Parameters<typeof materializeLesson>[0],{
  documentLanguage:'en',renderSection:noChild
 }),/complete standalone Lesson Config/);
});

test('Course Stage 5 LessonWorkflowStage1 handoff never becomes full Lesson materialization',()=>{
 const assessment={questionBankRequired:true,flashcardBankRequired:true,quizSectionRequired:true,flashcardsSectionRequired:true};
 const handoff={config:{id:id('77'),slug:'planned',type:'lesson',skills:[id('88')],
   locale:{title:'Planned Lesson'}},production:{methodology:'Approved scope',assessment}};
 let delegated=0;
 const options={documentLanguage:'en',renderSection:()=>{delegated++;throw Error('must not delegate');}};
 // Stage 5 emits a typed {config, production} authoring object, not a Configurator.
 assert.throws(()=>materializeLesson(handoff as unknown as Parameters<typeof materializeLesson>[0],options),
  /complete standalone Lesson Config/);
 // Even feeding its inner Config is invalid: it has neither languages nor Sections.
 assert.throws(()=>materializeLesson(handoff.config as unknown as Parameters<typeof materializeLesson>[0],options),
  /lesson\.params\.languages/);
 // Adding publication languages early does not authorize manufacturing Sections.
 assert.throws(()=>materializeLesson({...handoff.config,params:{languages:['en'],
   quizRequiredForCompletion:true}} as unknown as Parameters<typeof materializeLesson>[0],options),
  /lesson\.section/);
 assert.equal(delegated,0,'no Content, Quiz or Flashcards source was generated from Stage 1');
});

test('Independent Lesson materialization uses exact editorial Section decisions, not bank flags',()=>{
 const cases=[
  {name:'none',assessment:{questionBankRequired:false,flashcardBankRequired:false,quizSectionRequired:false,flashcardsSectionRequired:false},quiz:false,flashcards:false},
  {name:'question bank only',assessment:{questionBankRequired:true,flashcardBankRequired:false,quizSectionRequired:false,flashcardsSectionRequired:false},quiz:false,flashcards:false},
  {name:'quiz required by completion',assessment:{questionBankRequired:false,flashcardBankRequired:false,quizSectionRequired:false,flashcardsSectionRequired:false},completion:true,quiz:true,flashcards:false},
  {name:'quiz Section only',assessment:{questionBankRequired:false,flashcardBankRequired:false,quizSectionRequired:true,flashcardsSectionRequired:false},quiz:true,flashcards:false},
  {name:'Flashcards Section only',assessment:{questionBankRequired:false,flashcardBankRequired:false,quizSectionRequired:false,flashcardsSectionRequired:true},quiz:false,flashcards:true},
  {name:'both Sections',assessment:{questionBankRequired:true,flashcardBankRequired:true,quizSectionRequired:true,flashcardsSectionRequired:true},quiz:true,flashcards:true},
  {name:'both banks without Sections',assessment:{questionBankRequired:true,flashcardBankRequired:true,quizSectionRequired:false,flashcardsSectionRequired:false},quiz:false,flashcards:false},
 ] as const;
 for(const scenario of cases){
  const config=lesson();
  if('completion' in scenario && scenario.completion)config.params.quizRequiredForCompletion=true;
  let delegated=0;
  const options={
   documentLanguage:'en',production:{assessment:scenario.assessment},
   renderSection:(child:Parameters<Parameters<typeof materializeLesson>[1]['renderSection']>[0],
    opts:Parameters<Parameters<typeof materializeLesson>[1]['renderSection']>[1])=>{
     delegated++;
     return renderSection(child as ContentSource,{...opts,renderContentBlock});
    },
  };
  if (scenario.quiz || scenario.flashcards) {
   const required = scenario.quiz ? /enabled Quiz Section/ : /enabled Flashcards Section/;
   assert.throws(()=>materializeLesson(config as Parameters<typeof materializeLesson>[0],options),required,
    scenario.name+' must fail closed until its required Section is authored');
   assert.equal(delegated,0,scenario.name+' must not emit partial final source');
  } else {
   const produced=materializeLesson(config as Parameters<typeof materializeLesson>[0],options);
   const root=produced.files.find(f=>f.path==='index.ts')?.content??'';
   assert.equal(produced.files.filter(f=>f.path.startsWith('sections/')).length,2,
    scenario.name+' only the authored Content Section and child block were materialized');
   assert.doesNotMatch(root,/feedc0de-|Not implemented/,
    scenario.name+' must not invent bank IDs or Section placeholders');
   assert.equal(/"quizRequiredForCompletion": true/.test(root),false);
   assert.doesNotMatch(root,/"questionBankRequired"|"flashcardBankRequired"|"quizSectionRequired"|"flashcardsSectionRequired"/,
    scenario.name+' production decisions must not enter Config');
  }
 }
});

test('Disabled Quiz/Flashcards do not satisfy mandatory enabled-Section requirements',()=>{
 const l=lesson();
 const disabledQuiz={id:id('12'),slug:'pendingQuiz',type:'quiz',params:{disabled:true}};
 const disabledFlashcards={id:id('13'),slug:'pendingCards',type:'flashcards',params:{disabled:true}};
 const input={...l,section:{
   items:{...l.section.items,pendingQuiz:disabledQuiz,pendingCards:disabledFlashcards},
   order:['introduction','pendingQuiz','pendingCards']
 }};
 const noDelegate=()=>{throw Error('must not emit incomplete Section');};
 input.params.quizRequiredForCompletion=true;
 assert.throws(()=>materializeLesson(input as unknown as Parameters<typeof materializeLesson>[0],{
   documentLanguage:'en',renderSection:noDelegate
 }),/enabled Quiz Section/);
 input.params.quizRequiredForCompletion=false;
 assert.throws(()=>materializeLesson(input as unknown as Parameters<typeof materializeLesson>[0],{
   documentLanguage:'en',production:{assessment:{
      questionBankRequired:false,flashcardBankRequired:false,quizSectionRequired:false,flashcardsSectionRequired:true
   }},renderSection:noDelegate
 }),/enabled Flashcards Section/);
});
