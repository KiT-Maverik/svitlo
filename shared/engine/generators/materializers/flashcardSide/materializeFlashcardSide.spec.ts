import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { materializeFlashcardSide } from './materializeFlashcardSide';
const block=(slug:string,n:number)=>({config:{id:'b775647f-203d-481a-a1c7-4d331c'+String(n).padStart(6,'0'),slug,type:'text'}});
const context={
  directory:'flashcards/cardOne/content/front',role:'front' as const,languages:{document:'uk' as const,planned:['uk','en'] as const},
  materializeBlock:(node:{config:{slug:string}},ctx:{directory:string})=>({
    exportName:node.config.slug,
    files:[{path:ctx.directory+'/index.ts',content:'export const '+node.config.slug+' = 1;\n',kind:'typescript' as const}],
  }),
};
test('FlashcardSide: correct child module paths, original order, no invented UUID, syntax',()=>{
  const source={items:{second:block('second',2),first:block('first',1)},order:['first','second']};
  const output=materializeFlashcardSide(source,context);
  const root=output.files.find(file=>file.path.endsWith('/front/index.ts'));
  assert.ok(root);
  assert.equal(output.exportName,'front');
  assert.match(root.content,/defineFlashcardSide<typeof items, \["uk"\]>/);
  assert.match(root.content,/order: \["first","second"\]/);
  assert(!root.content.includes('id:'));
  assert(output.files.some(file=>file.path.endsWith('/front/items/first/index.ts')));
  assert.deepEqual(output,materializeFlashcardSide(source,context));
  for(const file of output.files.filter(file=>file.kind==='typescript')){
    const ast=ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true);
    assert.equal(ast.parseDiagnostics.length,0);
  }
});
test('FlashcardSide: order/role/slug and create-only protections',()=>{
  const first=block('first',1);
  assert.throws(()=>materializeFlashcardSide({items:{first},order:[]},context),/order/);
  assert.throws(()=>materializeFlashcardSide({items:{},order:[]},context),/front cannot be empty/);
  assert.doesNotThrow(()=>materializeFlashcardSide({items:{},order:[]},{...context,role:'hint'}));
  assert.throws(()=>materializeFlashcardSide({items:{first},order:['first']},{
    ...context,existingPaths:new Set(['flashcards/cardOne/content/front/index.ts']),
  }),/no clobber/);
  assert.throws(()=>materializeFlashcardSide({items:{first},order:['first']},{
    ...context,languages:{document:'uk' as const,planned:['en'] as const},
  }),/languages.planned/);
});
