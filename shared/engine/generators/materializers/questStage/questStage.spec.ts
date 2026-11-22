import assert from 'node:assert/strict';
import test from 'node:test';
import { materializeQuestStage, type ChildConfig } from './questStage';
const id=(n:string)=>'12345678-1234-4234-8234-1234567890'+n;
const media=(type:string,slug:string,n:string):ChildConfig=>({id:id(n),slug,type,params:{},locale:{}});
const stage=()=>({id:id('01'),slug:'start',type:'questStage',content:{
 video:{medium:media('video','medium','02'),small:media('video','small','03')},
 audio:{dialogue:media('audio','dialogue','04'),narration:null,background:null},
 image:media('image','image','05'),subtitles:media('subtitles','subtitles','06')
}});
test('Quest Stage: seven mandatory slots, explicit null tracks and delegated media paths',()=>{
 const calls:string[]=[];
 const out=materializeQuestStage(stage() as Parameters<typeof materializeQuestStage>[0],{
  documentLanguage:'en',directory:'stages/start',languagesImport:'../../languages',
  renderMedia:(config,ctx)=>{calls.push(ctx.directory);return {exportName:config.slug,files:[{path:ctx.directory+'/index.ts',kind:'typescript' as const,content:'//media'}],diagnostics:[]}}
 });
 assert.equal(calls.length,5);
 assert.deepEqual(calls.sort(),['stages/start/content/video/medium','stages/start/content/video/small','stages/start/content/audio/dialogue','stages/start/content/image','stages/start/content/subtitles'].sort());
 const src=out.files.at(-1)?.content??'';
 assert.match(src,/"narration": null/);
 assert.match(src,/defineStage<"start", typeof languages>/);
 assert.doesNotMatch(src,/TODO \(BLOCKER\)/);
});
test('Quest Stage: missing mandatory subtitles does not generate fake media',()=>{
 const value=stage();
 value.content.subtitles=undefined as never;
 assert.throws(()=>materializeQuestStage(value as Parameters<typeof materializeQuestStage>[0],{documentLanguage:'en',languagesImport:'./languages',renderMedia:()=>{throw new Error('unused')}}),/mandatory media is missing/);
});
