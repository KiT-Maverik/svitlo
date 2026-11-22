import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeAssessmentMethod} from './materialize.mjs';
const ts=createRequire(import.meta.url)('typescript');
const ID='89d2e806-53ed-4370-ab47-b0c60d96a3c5';
const example=()=> ({id:ID,slug:'example',title:{uk:'Оцінювання',en:'Assessment'},description:{uk:'Опис',en:'Description'}});
test('assessmentMethod preserves identity, approved language, production specification and deterministic TS',()=>{
 const input={config:example(),production:{methodology:'Reviewed methodology',plannedLanguages:['uk','en']}};
 const first=materializeAssessmentMethod(input,{sourceLanguage:'uk'});
 const code=first.files.find(file=>file.path==='index.ts').content;
 assert.match(code,/export const example = defineAssessmentMethod/);
 assert.match(code,/TODO \(BLOCKER\)/);
 assert.ok(first.files.some(file=>file.path==='methodology.md'));
 assert.equal(ts.createSourceFile('index.ts',code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS).parseDiagnostics.length,0);
 assert.deepEqual(materializeAssessmentMethod(input,{sourceLanguage:'uk'}),first);
});
test('assessmentMethod refuses fake identity and path traversal',()=>{
 assert.throws(()=>materializeAssessmentMethod({...example(),id:undefined},{sourceLanguage:'uk'}),/immutable UUID/);
 assert.throws(()=>materializeAssessmentMethod({...example(),slug:'../bad'},{sourceLanguage:'uk'}),/unsafe slug/);
});

test('assessmentMethod rejects escaped destination directories',()=>{
 assert.throws(()=>materializeAssessmentMethod(example(),{sourceLanguage:'uk',directory:'../unsafe'}),/unsafe generated directory/);
});
