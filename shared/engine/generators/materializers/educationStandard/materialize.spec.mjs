import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeEducationStandard} from './materialize.mjs';
const ts=createRequire(import.meta.url)('typescript');
const ID='89d2e806-53ed-4370-ab47-b0c60d96a3c5';
const example=()=> ({id:ID,slug:'example',name:'Standard name',description:{methodological:'Origin',frontend:{uk:'Опис',en:'Description'}},params:{countries:['UA'],nameLanguage:'uk'}});
test('educationStandard preserves identity, approved language, production specification and deterministic TS',()=>{
 const input={config:example(),production:{methodology:'Reviewed methodology',plannedLanguages:['uk','en']}};
 const first=materializeEducationStandard(input,{sourceLanguage:'uk'});
 const code=first.files.find(file=>file.path==='index.ts').content;
 assert.match(code,/export const example = defineEducationStandard/);
 assert.match(code,/en.*Description/);
 assert.ok(first.files.some(file=>file.path==='methodology.md'));
 assert.equal(ts.createSourceFile('index.ts',code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS).parseDiagnostics.length,0);
 assert.deepEqual(materializeEducationStandard(input,{sourceLanguage:'uk'}),first);
});
test('educationStandard refuses fake identity and path traversal',()=>{
 assert.throws(()=>materializeEducationStandard({...example(),id:undefined},{sourceLanguage:'uk'}),/immutable UUID/);
 assert.throws(()=>materializeEducationStandard({...example(),slug:'../bad'},{sourceLanguage:'uk'}),/unsafe slug/);
});

test('educationStandard rejects escaped destination directories',()=>{
 assert.throws(()=>materializeEducationStandard(fixture(),{sourceLanguage:'uk',directory:'../unsafe'}),/unsafe generated directory/);
});
