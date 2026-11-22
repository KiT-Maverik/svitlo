import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { materializeFillBlanksWithText } from './materializeFillBlanksWithText';
const id=(n:number)=>'b775647f-203d-481a-a1c7-4d331c'+String(n).padStart(6,'0');
const block=(slug:string,n:number)=>({config:{id:id(n),slug,type:'text',params:{},locale:{value:{uk:'Текст'}}}});
const collection=<T>(items:Record<string,T>)=>({items,order:Object.keys(items)});
const fixture=()=>({config:{
  id:id(1),slug:'sampleQuestion',type:'fillBlanksWithText' as const,
  params:{ assessmentMethod: 'retrieval', restrictions: [] },
  locale:{ placeholder: { uk: 'Текст', en: 'NOT REVIEWED' } },
  content:{question:collection({prompt:block('prompt',2)}),hint:collection({hint:block('hint',8)}), slots: collection({ firstGap: { correctAnswers: { accepted: { uk: 'слово', en: 'NOT REVIEWED' } } } })},
}});
const context={
  directory:'questions/fillBlanksWithText',documentLanguage:'uk',plannedLanguages:['uk','en'],
  materializeBlock:(node:{config:{slug:string}},props:{directory:string})=>({
    exportName:node.config.slug,
    files:[{path:props.directory+'/index.ts',content:'export const '+node.config.slug+' = {};\n',kind:'typescript' as const}],
  }),
};
test('fillBlanksWithText: deterministic modular source, nested imports, source locale and syntax',()=>{
  const node=fixture();
  const a=materializeFillBlanksWithText(node as never,context);
  const b=materializeFillBlanksWithText(node as never,context);
  assert.deepEqual(a,b);
  const main=a.files.find(file=>file.path==='questions/fillBlanksWithText/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content,/defineFillBlanksWithText</);
  assert.match(main.content,/TODO \(BLOCKER\)/);
  assert.match(main.content,/child_content_question_items_prompt/);
  assert.doesNotMatch(main.content,/NOT REVIEWED/);
  assert(a.files.some(file=>file.path.endsWith('content/question/items/prompt/index.ts')));
  for(const file of a.files.filter(file=>file.kind==='typescript')){
    const source=ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true);
    assert.deepEqual(source.parseDiagnostics.map(error=>ts.flattenDiagnosticMessageText(error.messageText,'\n')),[]);
  }
});
test('fillBlanksWithText: rejects missing questions, incorrect order, and pre-existing authored outputs',()=>{
  const noPrompt=fixture();
  noPrompt.config.content.question.order=[];
  assert.throws(()=>materializeFillBlanksWithText(noPrompt as never,context),/reviewed prompt/);
  const bad=fixture();
  bad.config.content.question.order=['notThere'];
  assert.throws(()=>materializeFillBlanksWithText(bad as never,context),/order/);
  assert.throws(()=>materializeFillBlanksWithText(fixture() as never,{...context,existingPaths:new Set(['questions/fillBlanksWithText/sampleQuestion.ts'])}),/no clobber/);
});
