import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeFlashcard } from './materializeFlashcard';
const id=(n:number)=>'b775647f-203d-481a-a1c7-4d331c'+String(n).padStart(6,'0');
const block=(slug:string,n:number)=>({config:{id:id(n),slug,type:'text',params:{},locale:{value:{uk:'Слово'}}}});
const side=(slug:string,n:number)=>({items:{[slug]:block(slug,n)},order:[slug]});
const fixture=()=>({config:{
 id:id(10),slug:'cardOne',parameters:{
   tags:['math'],flags:[
      {type:'list' as const,count:3},
      {type:'acronym' as const,value:{uk:'АБВ',en:'NOT REVIEWED'}},
      {type:'custom' as const,color:'info' as const,value:{uk:'Підказка',en:'NOT REVIEWED'}},
   ],
   relationships:{items:{reverseCard:{relationshipId:'connectionOne',type:'reverse' as const,position:'peer' as const,relatedFlashcardId:id(11)}},order:['reverseCard']},
 },content:{front:side('frontText',1),back:side('backText',2),hint:side('hintText',3)},
},production:{pending:true,specification:'## Reviewed card production\n'}});
const context={
 directory:'flashcards',documentLanguage:'uk',plannedLanguages:['uk','en'],
 materializeBlock:(node:{config:{slug:string}},ctx:{directory:string})=>({
  exportName:node.config.slug,
  files:[{path:ctx.directory+'/index.ts',kind:'typescript' as const,content:'export const '+node.config.slug+' = 0;\n'}],
 }),
};
test('Flashcard: three standalone sides, ordered flags, relationships, source locales, syntax',()=>{
 const output=materializeFlashcard(fixture() as never,context);
 assert.deepEqual(output,materializeFlashcard(fixture() as never,context));
 const main=output.files.find(file=>file.path==='flashcards/cardOne.ts');
 assert.ok(main);
 assert.match(main.content,/defineFlashcard<"cardOne"/);
 assert.match(main.content,/typeof content.front.items/);
 assert.match(main.content,/typeof content.back.items/);
 assert.match(main.content,/typeof content.hint.items/);
 assert.match(main.content,/typeof parameters.flags/);
 assert.match(main.content,/relationshipId: "connectionOne"/);
 assert.match(main.content,/TODO \(BLOCKER\)/);
 assert.doesNotMatch(main.content,/NOT REVIEWED/);
 for(const role of ['front','back','hint'])
   assert(output.files.some(file=>file.path==='flashcards/cardOne/content/'+role+'/index.ts'));
 assert(output.files.some(file=>file.path==='flashcards/cardOne/specification.md'));
 for(const file of output.files.filter(file=>file.kind==='typescript')){
  const ast=ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true);
  assert.deepEqual(ast.parseDiagnostics.map(e=>ts.flattenDiagnosticMessageText(e.messageText,'\n')),[]);
 }
});
test('Flashcard: source locale, duplicate flags, missing bank and pre-existing content blockages',()=>{
 const noSource=fixture();
 Object.assign(noSource.config.parameters.flags[1],{value:{en:'unreviewed'}});
 assert.throws(()=>materializeFlashcard(noSource as never,context),/source-language/);
 const duplicate=fixture();
 duplicate.config.parameters.flags.push({type:'list',count:2} as never);
 assert.throws(()=>materializeFlashcard(duplicate as never,context),/duplicate built-in/);
 const missing=fixture();
 missing.config.content.front.order=[];
 assert.throws(()=>materializeFlashcard(missing as never,context),/order/);
 assert.throws(()=>materializeFlashcard(fixture() as never,{
  ...context,existingPaths:new Set(['flashcards/cardOne.ts']),
 }),/no clobber/);
  assert.throws(()=>materializeFlashcard(fixture() as never,{...context,
    languages:{document:'uk' as const,planned:['en'] as const},
  }),/languages.planned/);
});
