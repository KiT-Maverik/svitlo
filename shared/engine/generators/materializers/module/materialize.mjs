const uuid=/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slugPattern=/^[A-Za-z][A-Za-z0-9]*$/;
const record=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const unwrap=x=>record(x?.config)?x.config:x;
const production=x=>record(x?.config)?x.production:undefined;
const ensure=(value,path)=>{if(typeof value!=='string'||!slugPattern.test(value)||['constructor','__proto__'].includes(value))throw Error(path+': unsafe slug');return value};
const safeDirectory=dir=>{
 if(typeof dir!=='string')throw Error('unsafe generated directory');
 if(dir&&dir.split('/').some(part=>!slugPattern.test(part)||['constructor','__proto__'].includes(part)))
  throw Error(String(dir)+': unsafe generated directory');
 return dir;
};
const identity=(config,ctx,dir,kind)=>{
 safeDirectory(dir);
 const slug=ensure(config?.slug,dir+'.slug'),id=config?.id??ctx.deriveId?.(kind,dir||slug);
 if(typeof id!=='string'||!uuid.test(id))throw Error(dir+'.id: immutable UUID or parent deterministic deriveId required');
 return {id,slug};
};
const source=ctx=>{if(!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(ctx.sourceLanguage??''))throw Error('sourceLanguage: reviewed locale required');return ctx.sourceLanguage};
const localized=(value,language,path)=>{
 if(typeof value==='string')return value;
 if(!record(value)||typeof value[language]!=='string'||!value[language].trim())throw Error(path+': missing reviewed '+language+' locale');
 return {[language]:value[language]};
};
const todo=(production,ctx,language)=>{
 const langs=production?.plannedLanguages??ctx.plannedLanguages??[language];
 if(!Array.isArray(langs)||new Set(langs).size!==langs.length||!langs.includes(language))throw Error('plannedLanguages: invalid language scope');
 return langs.length>1?'// TODO (BLOCKER): Restore reviewed languages: '+JSON.stringify(langs)+'\n':'';
};
const exportName=slug=>['class','default','export','import','const','new','return','let','var','await','content','languages','section'].includes(slug)?'config_'+slug:slug;
const sidecars=(meta,dir)=>{
 if(meta===undefined)return [];
 if(!record(meta))throw Error(dir+'.production: object expected');
 const outputs=[];
 if(typeof meta.methodology==='string'&&meta.methodology.trim())outputs.push({path:[dir,'methodology.md'].filter(Boolean).join('/'),kind:'markdown',content:meta.methodology.trimEnd()+'\n'});
 const rest=Object.entries(meta).filter(([key])=>!['documentLanguage','methodology','plannedLanguages','pending'].includes(key));
 if(rest.length)outputs.push({path:[dir,'specification.md'].filter(Boolean).join('/'),kind:'specification',content:rest.map(([key,value])=>'# '+key+'\n\n'+(typeof value==='string'?value.trimEnd():JSON.stringify(value,null,2))).join('\n\n')+'\n'});
 return outputs;
};


/** Materialize module plain Config as authored TS; child source is delegated, never inlined. */
export function materializeModule(input,context={}){
 const config=unwrap(input),meta=production(input),dir=context.directory??'';
 if(dir && dir.split('/').some(part=>!slugPattern.test(part)))throw Error(dir+': unsafe generated directory');
 const {id,slug}=identity(config,context,dir,'module'),lang=source(context);
 if(config.type!=='module')throw Error(dir+': expected module Config');
 const collection=config.content;
 if(!record(collection)||!record(collection.items)||!Array.isArray(collection.order))throw Error(dir+'.content: expected {items,order}');
 const keys=Object.keys(collection.items),order=collection.order;
 if(new Set(order).size!==order.length||keys.length!==order.length||order.some(key=>typeof key!=='string'||!Object.hasOwn(collection.items,key)))
  throw Error(dir+'.content.order: each child key must appear exactly once');
 const planned=config.params?.languages??meta?.plannedLanguages??context.plannedLanguages??[lang];
 if(!Array.isArray(planned)||!planned.includes(lang)||new Set(planned).size!==planned.length)throw Error(dir+'.params.languages: source language missing or duplicate');
 const imports=[],items={},files=[],diagnostics=[],placements=[],seenIds=new Set();
 for(const key of order){
  ensure(key,dir+'.content.items.'+key);
  const node=collection.items[key],raw=unwrap(node);
  if(!record(raw)||typeof raw.type!=='string')throw Error(dir+'.content.items.'+key+': missing child type');
  if(raw.type!=='lesson'&&raw.slug!==undefined&&raw.slug!==key)throw Error(dir+'.content.items.'+key+': child slug mismatch');
  const nodeConfig={...raw,slug:raw.type==='lesson'?(raw.slug??key):key};
  const nested=record(node?.config)?{...node,config:nodeConfig}:nodeConfig;
  const childFolder=[dir,'content',key].filter(Boolean).join('/');
  const childContext={...context,directory:childFolder,placement:key,plannedLanguages:planned};
  let child;
  switch(raw.type){
   case 'chapter':
    if(typeof context.materializeChapter!=='function')throw Error(childFolder+': Chapter materializer missing');
    child=context.materializeChapter(nested,childContext);break;
   case 'episode':
    if(typeof context.materializeEpisode!=='function')throw Error(childFolder+': Episode materializer missing');
    child=context.materializeEpisode(nested,childContext);break;
   case 'lesson': {
    if(typeof context.materializeLessonPlacement!=='function')throw Error(childFolder+': parent Lesson placement bridge required');
    if(raw.lessonId!==undefined&&!uuid.test(raw.lessonId))throw Error(childFolder+'.lessonId: verified UUID required');
    if(raw.overrides!==undefined&&(!record(raw.overrides)||!record(raw.overrides.base)||
       (raw.overrides.locale!==undefined&&!record(raw.overrides.locale))))
      throw Error(childFolder+'.overrides: expected built sparse {base,locale} result, not a raw patch');
    child=context.materializeLessonPlacement(nested,{...childContext,lessonId:raw.lessonId,overrides:raw.overrides});
    const refId=raw.lessonId??child?.lessonId;
    if(typeof refId!=='string'||!uuid.test(refId))throw Error(childFolder+': new Lesson handoff must allocate a persistent UUID');
    placements.push({path:childFolder,slug:key,lessonId:refId,overrides:raw.overrides});
    if(seenIds.has(refId))throw Error(childFolder+': duplicate child UUID');
    seenIds.add(refId);
    break;
   }
   default:throw Error(childFolder+': disallowed child type '+raw.type);
  }
  if(!child?.exportName||!Array.isArray(child.files))throw Error(childFolder+': invalid child materializer result');
  if(raw.type!=='lesson'){
   const resolvedId=raw.id??child.id;
   if(typeof resolvedId!=='string'||!uuid.test(resolvedId))throw Error(childFolder+': child immutable UUID missing');
   if(seenIds.has(resolvedId))throw Error(childFolder+': duplicate child UUID');
   seenIds.add(resolvedId);
  }
  const alias='child_'+key;
  imports.push('import { '+child.exportName+' as '+alias+' } from "./content/'+key+'";');
  items[key]=alias;
  files.push(...child.files);
  diagnostics.push(...(child.diagnostics??[]));
  placements.push(...(child.placements??[]));
 }
 const fields={...config,id,slug};
 delete fields.content;
 delete fields.params;
 if(record(fields.locale)){
  fields.locale={...fields.locale};
  for(const field of ['title']){
   if(fields.locale[field]!==undefined)fields.locale[field]=localized(fields.locale[field],lang,dir+'.locale.'+field);
  }
 }
 const languageTodo=todo({plannedLanguages:planned},context,lang);
 if(languageTodo)diagnostics.push({path:dir,code:'pending-locales',severity:'warning'});
 const orderSource=JSON.stringify(order);
 const itemsSource='{ '+Object.entries(items).map(([key,alias])=>JSON.stringify(key)+': '+alias).join(', ')+' }';
 const attrs=Object.entries(fields).map(([key,value])=>'  '+JSON.stringify(key)+': '+JSON.stringify(value,null,2)+',').join('\n');
 const params=config.params;
 if(!record(params))throw Error(dir+'.params: Config params object required');
 const paramFields=Object.entries(params).filter(([key])=>key!=='languages')
   .map(([key,value])=>JSON.stringify(key)+': '+JSON.stringify(value)+',').join(' ');
 const paramsSource='{ '+paramFields+''+' }';
 const result="import { defineModule } from '@svitlo/engine/build';\n"+
  "import type { SupportedLanguages } from '@svitlo/engine/build';\n"+
  imports.join('\n')+'\n\n'+
  'const languages = '+JSON.stringify([lang])+' as const satisfies SupportedLanguages;\n'+
  'const content = { items: '+itemsSource+', order: '+orderSource+' };\n\n'+languageTodo+
  'export const '+exportName(slug)+' = defineModule<'+
  [JSON.stringify(slug),'typeof content.items','typeof languages'].join(', ')+
  '>({\n'+attrs+'\n  params: '+paramsSource+',\n  content,\n});\n';
 const produced=[...files,...sidecars(meta,dir),{path:[dir,'index.ts'].filter(Boolean).join('/'),kind:'typescript',content:result}];
 const paths=new Set();
 for(const file of produced){if(paths.has(file.path))throw Error('duplicate generated file: '+file.path);paths.add(file.path)}
 return {id,exportName:exportName(slug),files:produced,diagnostics,placements};
}