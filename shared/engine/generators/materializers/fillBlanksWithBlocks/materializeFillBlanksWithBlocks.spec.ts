import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { materializeFillBlanksWithBlocks } from './materializeFillBlanksWithBlocks';
const id=(n:number)=>'b775647f-203d-481a-a1c7-4d331c'+String(n).padStart(6,'0');
const block=(slug:string,n:number)=>({config:{id:id(n),slug,type:'text',params:{},locale:{value:{uk:'Текст'}}}});
const collection=<T>(items:Record<string,T>)=>({items,order:Object.keys(items)});
const fixture=()=>({config:{
  id:id(1),slug:'sampleQuestion',type:'fillBlanksWithBlocks' as const,
  params:{ assessmentMethod: 'retrieval', restrictions: [] },
  locale:{ placeholder: { uk: 'Пропуск', en: 'NOT REVIEWED' } },
  content:{question:collection({prompt:block('prompt',2)}),hint:collection({hint:block('hint',8)}), slots: collection({ firstGap: { correctAnswer: block('answer',3) } }), distractors: collection({ wrong: block('wrong',4) })},
}});
const context={
  directory:'questions/fillBlanksWithBlocks',documentLanguage:'uk',plannedLanguages:['uk','en'],
  materializeBlock:(node:{config:{slug:string}},props:{directory:string})=>({
    exportName:node.config.slug,
    files:[{path:props.directory+'/index.ts',content:'export const '+node.config.slug+' = {};\n',kind:'typescript' as const}],
  }),
};
test('fillBlanksWithBlocks: deterministic modular source, nested imports, source locale and syntax',()=>{
  const node=fixture();
  const a=materializeFillBlanksWithBlocks(node as never,context);
  const b=materializeFillBlanksWithBlocks(node as never,context);
  assert.deepEqual(a,b);
  const main=a.files.find(file=>file.path==='questions/fillBlanksWithBlocks/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content,/defineFillBlanksWithBlocks</);
  assert.match(main.content,/TODO \(BLOCKER\)/);
  assert.match(main.content,/child_content_question_items_prompt/);
  assert.doesNotMatch(main.content,/NOT REVIEWED/);
  assert(a.files.some(file=>file.path.endsWith('content/question/items/prompt/index.ts')));
  for(const file of a.files.filter(file=>file.kind==='typescript')){
    const source=ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true);
    assert.deepEqual(source.parseDiagnostics.map(error=>ts.flattenDiagnosticMessageText(error.messageText,'\n')),[]);
  }
});
test('fillBlanksWithBlocks: rejects missing questions, incorrect order, and pre-existing authored outputs',()=>{
  const noPrompt=fixture();
  noPrompt.config.content.question.order=[];
  assert.throws(()=>materializeFillBlanksWithBlocks(noPrompt as never,context),/reviewed prompt/);
  const bad=fixture();
  bad.config.content.question.order=['notThere'];
  assert.throws(()=>materializeFillBlanksWithBlocks(bad as never,context),/order/);
  assert.throws(()=>materializeFillBlanksWithBlocks(fixture() as never,{...context,existingPaths:new Set(['questions/fillBlanksWithBlocks/sampleQuestion.ts'])}),/no clobber/);
});
