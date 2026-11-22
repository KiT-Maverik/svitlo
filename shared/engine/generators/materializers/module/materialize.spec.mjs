import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeCourse} from '../course/materialize.mjs';
import {materializeModule} from './materialize.mjs';
import {materializeChapter} from '../chapter/materialize.mjs';
import {materializeEpisode} from '../episode/materialize.mjs';
const ts=createRequire(import.meta.url)('typescript');
const IDs={"course":"50d8cd6f-41f1-4cb4-a156-d6f898d552a7","module":"f1ac35c6-19e3-49ab-af76-4105b02412b2","chapter":"b2d91c34-5847-48cb-bc88-1721ef7055ea","episode":"fe1042c9-9b4a-4b8d-af84-a1b7b036bc89","lesson":"778597bc-a34a-472d-a317-69c97ff452e6"};
const section=(slug,id)=>({type:'content',id,slug,params:{},locale:{title:{uk:'Розділ'}},content:{items:{},order:[]}});
const ep=(slug='episodeOne')=>({type:'episode',id:IDs.episode,slug,params:{languages:['uk','en']},locale:{title:{uk:'Пригода',en:'Journey'}},section:{items:{opening:section('opening','1e2e9488-6304-4d87-b597-f13ac724c3b5')},order:['opening']}});
const ch=(slug='chapterOne')=>({type:'chapter',id:IDs.chapter,slug,params:{},locale:{title:{uk:'Глава'}},content:{items:{episodeOne:ep()},order:['episodeOne']}});
const mod=(slug='moduleOne')=>({type:'module',id:IDs.module,slug,params:{},locale:{title:{uk:'Модуль'}},content:{items:{chapterOne:ch()},order:['chapterOne']}});
const lesson=(slug,tag)=>({type:'lesson',slug,lessonId:IDs.lesson,overrides:{base:{locale:{title:tag}},locale:{uk:{locale:{title:tag}}}}});
const course=()=>({type:'course',id:IDs.course,slug:'rootCourse',params:{languages:['uk','en'],scenarioMode:'story'},locale:{title:{uk:'Курс',en:'Course'},description:{uk:'Про курс',en:'Description'}},content:{items:{moduleOne:mod(),directEpisode:{...ep('directEpisode'),id:'ec4a2e1f-5f42-40ef-a879-e668b59b8d04'},directLesson:lesson('directLesson','А')},order:['moduleOne','directEpisode','directLesson']}});
const sectionRenderer=(node,ctx)=>({id:node.id,exportName:node.slug,files:[{path:ctx.directory+'/index.ts',kind:'typescript',content:'export const '+node.slug+' = {};\\n'}]});
const reused=[];
const lessonBridge=(node,ctx)=>{
 reused.push({location:ctx.directory,lessonId:node.lessonId,overrides:ctx.overrides});
 return {lessonId:node.lessonId,exportName:node.slug,files:[{path:ctx.directory+'/index.ts',kind:'typescript',content:'export const '+node.slug+' = {};\\n'}]};
};

const ctx=()=>({sourceLanguage:'uk',materializeCourse,materializeModule,materializeChapter,materializeEpisode,materializeSection:sectionRenderer,materializeLessonPlacement:lessonBridge});
const syntax=files=>{for(const file of files.filter(file=>file.kind==='typescript'))assert.equal(ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS).parseDiagnostics.length,0,file.path)};
test('Module handles direct Chapters, Episodes and Lesson placements',()=>{
 const value=mod();
 value.content.items.directLesson=lesson('directLesson','Додано');
 value.content.order.push('directLesson');
 const first=materializeModule(value,ctx());
 assert.ok(first.files.some(file=>file.path==='content/chapterOne/index.ts'));
 assert.ok(first.files.some(file=>file.path==='content/directLesson/index.ts'));
 assert.match(first.files.find(file=>file.path==='index.ts').content,/defineModule</);
 syntax(first.files);
});
