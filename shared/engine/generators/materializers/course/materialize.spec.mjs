import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeCourse} from './materialize.mjs';
import {materializeModule} from '../module/materialize.mjs';
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
test('Course > Module > Chapter > Episode + direct placements and authored order',()=>{
 const first=materializeCourse({config:course(),production:{methodology:'Approved Course source'}},ctx());
 const paths=first.files.map(f=>f.path);
 assert.ok(paths.includes('content/moduleOne/content/chapterOne/content/episodeOne/index.ts'));
 assert.ok(paths.includes('content/directEpisode/index.ts'));
 assert.ok(paths.includes('content/directLesson/index.ts'));
 assert.ok(paths.includes('methodology.md'));
 const main=first.files.find(f=>f.path==='index.ts').content;
 assert.match(main,/defineCourse<"rootCourse", typeof content.items, typeof languages>/);
 assert.match(main,/TODO \(BLOCKER\): Restore reviewed languages/);
 assert.deepEqual(course().content.order,['moduleOne','directEpisode','directLesson']);
 syntax(first.files);
 assert.deepEqual(materializeCourse({config:course(),production:{methodology:'Approved Course source'}},ctx()).files,first.files);
});
test('the same imported Lesson may have two contextual sparse overrides in different Chapters',()=>{
 reused.length=0;
 const src=course();
 const c1=ch('chapterOne');
 c1.content={items:{lessonHere:lesson('lessonHere','First')},order:['lessonHere']};
 const c2={...ch('chapterTwo'),id:'5872ef76-c6f7-432c-bb8f-3124c876f021'};
 c2.content={items:{lessonThere:lesson('lessonThere','Second')},order:['lessonThere']};
 src.content={items:{one:{...mod(),content:{items:{chapterOne:c1,chapterTwo:c2},order:['chapterOne','chapterTwo']}}},order:['one']};
 src.content.items.one.slug='one';
 const result=materializeCourse(src,ctx());
 assert.equal(reused.length,2);
 assert.equal(reused[0].lessonId,reused[1].lessonId);
 assert.notDeepEqual(reused[0].overrides,reused[1].overrides);
 assert.notEqual(reused[0].location,reused[1].location);
 assert.equal(result.placements.length,2);
});
test('invalid ordering, unsafe placements and built override shape fail without output',()=>{
 const c=course();c.content.order=['moduleOne','directEpisode'];
 assert.throws(()=>materializeCourse(c,ctx()),/content.order/);
 const e=course();e.content.items['../bad']=e.content.items.directLesson;e.content.order.push('../bad');
 assert.throws(()=>materializeCourse(e,ctx()),/unsafe slug/);
 const patch=course();patch.content.items.directLesson.overrides={locale:{uk:{}}};
 assert.throws(()=>materializeCourse(patch,ctx()),/sparse/);
});

test('refuses directory traversal before source emission',()=>{
 assert.throws(()=>materializeCourse(course(),{sourceLanguage:'uk',directory:'../unsafe'}),/unsafe generated directory/);
});
