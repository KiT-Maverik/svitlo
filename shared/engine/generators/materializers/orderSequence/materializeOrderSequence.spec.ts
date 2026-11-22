import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { materializeOrderSequence } from './materializeOrderSequence';
const id=(n:number)=>'b775647f-203d-481a-a1c7-4d331c'+String(n).padStart(6,'0');
const block=(slug:string,n:number)=>({config:{id:id(n),slug,type:'text',params:{},locale:{value:{uk:'Текст'}}}});
const collection=<T>(items:Record<string,T>)=>({items,order:Object.keys(items)});
const fixture=()=>({config:{
  id:id(1),slug:'sampleQuestion',type:'orderSequence' as const,
  params:{ assessmentMethod: 'retrieval', restrictions: [] },
  locale:{},
  content:{question:collection({prompt:block('prompt',2)}),hint:collection({hint:block('hint',8)}), sequence: collection({ first: block('first', 3), second: block('second', 4) })},
}});
const context={
  directory:'questions/orderSequence',languages:{document:'uk' as const,planned:['uk','en'] as const},
  materializeBlock:(node:{config:{slug:string}},props:{directory:string})=>({
    exportName:node.config.slug,
    files:[{path:props.directory+'/index.ts',content:'export const '+node.config.slug+' = {};\n',kind:'typescript' as const}],
  }),
};
test('orderSequence: deterministic modular source, nested imports, source locale and syntax',()=>{
  const node=fixture();
  const a=materializeOrderSequence(node as never,context);
  const b=materializeOrderSequence(node as never,context);
  assert.deepEqual(a,b);
  const main=a.files.find(file=>file.path==='questions/orderSequence/sampleQuestion.ts');
  assert.ok(main);
  assert.match(main.content,/defineOrderSequence</);
  assert.match(main.content,/TODO \(BLOCKER\)/);
  assert.match(main.content,/child_content_question_items_prompt/);
  assert.doesNotMatch(main.content,/NOT REVIEWED/);
  assert(a.files.some(file=>file.path.endsWith('content/question/items/prompt/index.ts')));
  for(const file of a.files.filter(file=>file.kind==='typescript')){
    const source=ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true);
    assert.deepEqual(source.parseDiagnostics.map(error=>ts.flattenDiagnosticMessageText(error.messageText,'\n')),[]);
  }
});
test('orderSequence: rejects missing questions, incorrect order, and pre-existing authored outputs',()=>{
  const noPrompt=fixture();
  noPrompt.config.content.question.order=[];
  assert.throws(()=>materializeOrderSequence(noPrompt as never,context),/reviewed prompt/);
  const bad=fixture();
  bad.config.content.question.order=['notThere'];
  assert.throws(()=>materializeOrderSequence(bad as never,context),/order/);
  assert.throws(()=>materializeOrderSequence(fixture() as never,{...context,existingPaths:new Set(['questions/orderSequence/sampleQuestion.ts'])}),/no clobber/);
});
