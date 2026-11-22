import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {materializeCourse} from './materialize.mjs';
import {materializeModule} from '../module/materialize.mjs';
import {materializeChapter} from '../chapter/materialize.mjs';
import {materializeEpisode} from '../episode/materialize.mjs';
const ts=createRequire(import.meta.url)('typescript');
const IDs={course:'50d8cd6f-41f1-4cb4-a156-d6f898d552a7',
 module:'f1ac35c6-19e3-49ab-af76-4105b02412b2',chapter:'b2d91c34-5847-48cb-bc88-1721ef7055ea',
 episode:'fe1042c9-9b4a-4b8d-af84-a1b7b036bc89',lesson:'778597bc-a34a-472d-a317-69c97ff452e6'};
const skillId='00000000-0000-4000-8000-000000000015';
const methodology={purpose:'Teaching',audience:'Learners',approach:'Explore',depth:'Introductory',
 accessibility:'Accessible delivery',scope:'Core',entryConditions:'None',sourceNotes:'Verified sources'};
const matching={methodologySourcePath:'content/book/data/lessons/6/lesson-id/methodology.md',
 sourceSha:'verified-source-sha',matchingRationale:'Same Skills and intended depth',languageEvidence:'uk reviewed'};
const section=(slug,id)=>({type:'content',id,slug,params:{},locale:{title:{uk:'Розділ'}},content:{items:{},order:[]}});
const ep=(slug='episodeOne',id=IDs.episode)=>({config:{type:'episode',id,slug,
 params:{languages:['uk','en']},locale:{title:{uk:'Пригода',en:'Journey'}},
 section:{items:{opening:section('opening','1e2e9488-6304-4d87-b597-f13ac724c3b5')},order:['opening']}},
 production:{focus:'Narrative situation',purpose:'Contextual transition'}});
const lesson=(slug,tag,lessonId=IDs.lesson)=>({config:{type:'lesson',slug,skills:[skillId]},
 production:{kind:'existing',existing:{id:lessonId,base:{locale:{title:tag}},locale:{uk:{locale:{title:tag}}}},
 matching,overrideRationale:'Adapt title to Course sequence'}});
const newLesson=slug=>({config:{type:'lesson',slug,skills:[skillId],locale:{title:{uk:'Новий урок'}}},
 production:{kind:'new',methodology:'Reviewed comprehensive independent methodology',objective:'Describe observations',
 depth:'Introductory',sequenceReason:'Introduce facts before applying',assessmentEvidence:'Practical checkpoint'}});
const unitProduction={methodology:'Methodologically reviewed unit',outcomes:{skills:[skillId]},
 prerequisites:{skills:[]},depth:'Introductory',sequenceReason:'Prerequisite order'};
const ch=(slug='chapterOne')=>({config:{type:'chapter',slug,locale:{title:{uk:'Глава'}},
 content:{items:{episodeOne:ep()},order:['episodeOne']}},production:{...unitProduction}});
const mod=(slug='moduleOne')=>({config:{type:'module',slug,locale:{title:{uk:'Модуль'}},
 content:{items:{chapterOne:ch()},order:['chapterOne']}},production:{...unitProduction}});
const course=()=>({config:{type:'course',id:IDs.course,slug:'rootCourse',
 params:{age:{min:6,max:10}},locale:{title:{uk:'Курс',en:'Course'},description:{uk:'Про курс',en:'Description'}},
 content:{items:{moduleOne:mod(),directEpisode:ep('directEpisode','ec4a2e1f-5f42-40ef-a879-e668b59b8d04'),
 directLesson:lesson('directLesson','Зміна')},order:['moduleOne','directEpisode','directLesson']}},
 production:{languages:{document:'uk',planned:['uk','en']},methodology,
 outcomes:{explanation:'Recognize observable patterns'},prerequisites:{explanation:'None'},
 standardsAlignment:[],openDecisions:{}}});
const sectionRenderer=(node,ctx)=>({id:node.config?.id??node.id,exportName:node.config?.slug??node.slug,
 files:[{path:ctx.directory+'/index.ts',kind:'typescript',content:'export const opening = {};\n'}]});
const reused=[];
const lessonBridge=(node,ctx)=>{
 reused.push({location:ctx.directory,lessonId:ctx.lessonId,kind:ctx.kind,existing:ctx.existing});
 return {lessonId:ctx.lessonId??'80d31f41-75ac-4210-9a6d-7b4c75ad698e',
 exportName:node.config.slug,files:[{path:ctx.directory+'/index.ts',kind:'typescript',
 content:'export const '+node.config.slug+' = {};\n'}]};
};
const deriveId=(kind,placement)=>{
 if(kind==='module'&&placement.endsWith('moduleOne'))return IDs.module;
 if(kind==='chapter'&&placement.endsWith('chapterOne'))return IDs.chapter;
 let hash=2166136261;
 for(const c of kind+':'+placement)hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
 return '00000000-0000-4000-8000-'+hash.toString(16).padStart(12,'0');
};
const ctx=()=>({sourceLanguage:'uk',deriveId,
 materializeCourse,materializeModule,materializeChapter,materializeEpisode,
 materializeSection:sectionRenderer,materializeLessonPlacement:lessonBridge});
const syntax=files=>{for(const file of files.filter(file=>file.kind==='typescript'))
 assert.equal(ts.createSourceFile(file.path,file.content,ts.ScriptTarget.Latest,true,ts.ScriptKind.TS).parseDiagnostics.length,0,file.path)};

test('full Course > Module > Chapter > Episode, direct placements and Stage 1 language metadata',()=>{
 const first=materializeCourse(course(),ctx());
 const paths=first.files.map(f=>f.path);
 assert.ok(paths.includes('content/moduleOne/content/chapterOne/content/episodeOne/index.ts'));
 assert.ok(paths.includes('content/directEpisode/index.ts'));
 assert.ok(paths.includes('content/directLesson/index.ts'));
 const method=first.files.find(f=>f.path==='methodology.md');
 assert.match(method.content,/## Entry conditions/);
 const main=first.files.find(f=>f.path==='index.ts').content;
 assert.match(main,/defineCourse<"rootCourse", typeof content.items, typeof languages>/);
 assert.match(main,/const languages = \["uk"\]/);
 assert.match(main,/TODO \(BLOCKER\): Restore reviewed languages/);
 assert.equal(first.placements.length,1);
 syntax(first.files);
 assert.deepEqual(materializeCourse(course(),ctx()).files,first.files);
});
test('fully typed Stage 3 tree reuses one Lesson twice with independent sparse Build outputs',()=>{
 reused.length=0;
 const src=course();
 const first=ch('chapterOne');
 first.config.content={items:{first:lesson('first','One')},order:['first']};
 const second=ch('chapterTwo');
 second.config.content={items:{second:lesson('second','Two')},order:['second']};
 src.config.content={items:{moduleOne:{...mod(),config:{...mod().config,
 content:{items:{chapterOne:first,chapterTwo:second},order:['chapterOne','chapterTwo']}}},
 newLesson:newLesson('newLesson')},order:['moduleOne','newLesson']};
 const result=materializeCourse(src,ctx());
 assert.equal(reused.filter(c=>c.kind==='existing').length,2);
 assert.equal(reused[0].existing.id,reused[1].existing.id);
 assert.notDeepEqual(reused[0].existing.base,reused[1].existing.base);
 assert.notEqual(reused[0].location,reused[1].location);
 assert.equal(result.placements.length,3);
 assert.equal(result.placements.find(p=>p.kind==='new').lessonId,'80d31f41-75ac-4210-9a6d-7b4c75ad698e');
 syntax(result.files);
});
test('Stage 3 provisional Episode, obsolete Lesson keys, invalid order and unsafe slug are blocked',()=>{
 const draft=course();draft.config.content.items.directEpisode={config:{type:'episode'},production:{focus:'Situation',purpose:'Transition'}};
 assert.throws(()=>materializeCourse(draft,ctx()),/provisional Episode/);
 const old=course();old.config.content.items.directLesson.config.lessonId=IDs.lesson;
 assert.throws(()=>materializeCourse(old,ctx()),/belong to production/);
 const invalid=course();invalid.config.content.order=['moduleOne'];
 assert.throws(()=>materializeCourse(invalid,ctx()),/content.order/);
 const unsafe=course();unsafe.config.content.items['../bad']=unsafe.config.content.items.directLesson;unsafe.config.content.order.push('../bad');
 assert.throws(()=>materializeCourse(unsafe,ctx()),/unsafe slug/);
 const missing=course();delete missing.production.languages;
 assert.throws(()=>materializeCourse(missing,ctx()),/production.languages/);
});
test('the same imported Lesson must keep a verified ID, not an unvalidated raw patch',()=>{
 const bad=course();bad.config.content.items.directLesson.production.existing={base:{params:{}}};
 assert.throws(()=>materializeCourse(bad,ctx()),/existing.id/);
 const patch=course();patch.config.content.items.directLesson.production.existing={id:IDs.lesson,params:{sections:{allowSkipping:false}}};
 assert.throws(()=>materializeCourse(patch,ctx()),/not raw patches/);
});
test('refuses traversal in requested source directory',()=>{
 assert.throws(()=>materializeCourse(course(),{sourceLanguage:'uk',directory:'../unsafe'}),/unsafe generated directory/);
});
