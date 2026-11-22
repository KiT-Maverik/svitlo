import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeSkillGroup} from './materialize.mjs';
import {materializeSkill} from '../skill/materialize.mjs';

const ts=createRequire(import.meta.url)('typescript');
const ID='e69e5a56-0d62-4282-aeb0-4d1ca353a0ea';
const SID='9b646e88-7307-413b-9e52-73027616a323';
const GID='8795927b-f5b9-492e-9f4e-d96b9a128fac';
const skill=slug=>({id:SID,slug,name:{uk:'Уміння',en:'Skill'},description:{methodological:'Skill method',frontend:{uk:'Опис',en:'Description'}}});
const config=()=>({id:ID,slug:'firstGroup',name:{uk:'Група'},description:{methodological:'Group'},skills:{firstSkill:skill('firstSkill')}});
const render=()=>materializeSkillGroup({config:config(),production:{plannedLanguages:['uk','en']}},{
 sourceLanguage:'uk',materializeSkill,materializeSkillGroup:undefined});
test('delegates nested source and emits parseable TypeScript with concrete child imports',()=>{
 const result=render();
 const paths=result.files.map(file=>file.path);
 assert.ok(paths.includes('skills/firstSkill/index.ts'));
 
 const code=result.files.find(file=>file.path==='index.ts').content;
 assert.match(code,/defineSkillGroup</);
 assert.match(code,/TODO \(BLOCKER\)/);
 assert.equal(ts.createSourceFile('index.ts',code,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS).parseDiagnostics.length,0);
 assert.deepEqual(render(),result);
});
test('invalid child slug and unresolved dependency fail explicitly',()=>{
 const raw=config();raw.skills.firstSkill.slug='badSlug';
 assert.throws(()=>materializeSkillGroup(raw,{sourceLanguage:'uk',materializeSkill,materializeSkillGroup:undefined}),/slug mismatch/);
 assert.throws(()=>materializeSkillGroup(config(),{sourceLanguage:'uk'}),/missing .* renderer/);
});
