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

/** A skillDomain owns its source module, delegating child materialization to actual child renderers. */
export function materializeSkillDomain(input,context={}){
 const config=unwrap(input),meta=production(input),dir=context.directory??'';
 const {id,slug}=identity(config,context,dir,'skillDomain'),language=source(context);
 const files=[],imports=[],diagnostics=[],identities=new Set(),keys=new Set();
 const groups={};
 for(const key of Object.keys(config.groups??{}).sort()){
  ensure(key,dir+'.groups.'+key);
  if(keys.has(key))throw Error(dir+': reused child slug '+key);
  keys.add(key);
  const raw=unwrap(config.groups[key]);
  if(raw?.slug!==undefined&&raw.slug!==key)throw Error(dir+'.groups.'+key+': child slug mismatch');
  if(typeof context.materializeSkillGroup!=='function')throw Error(dir+'.groups.'+key+': missing SkillGroup renderer');
  const nested=record(config.groups[key]?.config)?{...config.groups[key],config:{...raw,slug:key}}:{...raw,slug:key};
  const child=context.materializeSkillGroup(nested,{...context,directory:[dir,'groups',key].filter(Boolean).join('/')});
  if(!Array.isArray(child?.files)||!child.exportName)throw Error('Invalid SkillGroup materializer result');
  const actualId=child.id??raw.id;
  if(typeof actualId!=='string'||!uuid.test(actualId))throw Error(dir+'.groups.'+key+': immutable child UUID required');
  if(identities.has(actualId))throw Error(dir+'.groups.'+key+': duplicate UUID');
  identities.add(actualId);
  const alias='child_group_'+key;
  imports.push('import { '+child.exportName+' as '+alias+' } from "./groups/'+key+'";');
  groups[key]=alias;
  files.push(...child.files);
  diagnostics.push(...(child.diagnostics??[]));
 }
 const skills={};
 for(const key of Object.keys(config.skills??{}).sort()){
  ensure(key,dir+'.skills.'+key);
  if(keys.has(key))throw Error(dir+': reused Skill slug '+key);
  keys.add(key);
  const raw=unwrap(config.skills[key]);
  if(raw?.slug!==undefined&&raw.slug!==key)throw Error(dir+'.skills.'+key+': child slug mismatch');
  if(typeof context.materializeSkill!=='function')throw Error(dir+'.skills.'+key+': missing Skill renderer');
  const nested=record(config.skills[key]?.config)?{...config.skills[key],config:{...raw,slug:key}}:{...raw,slug:key};
  const child=context.materializeSkill(nested,{...context,directory:[dir,'skills',key].filter(Boolean).join('/')});
  if(!Array.isArray(child?.files)||!child.exportName)throw Error('Invalid Skill materializer result');
  const actualId=child.id??raw.id;
  if(typeof actualId!=='string'||!uuid.test(actualId))throw Error(dir+'.skills.'+key+': immutable child UUID required');
  if(identities.has(actualId))throw Error(dir+'.skills.'+key+': duplicate UUID');
  identities.add(actualId);
  const alias='child_skill_'+key;
  imports.push('import { '+child.exportName+' as '+alias+' } from "./skills/'+key+'";');
  skills[key]=alias;
  files.push(...child.files);
  diagnostics.push(...(child.diagnostics??[]));
 }
 if(Object.keys(skills).length===0 && Object.keys(groups).length===0)throw Error(dir+': at least one child required');
 const data={id,slug,description:{
  methodological:config.description?.methodological,
  ...(config.description?.frontend===undefined?{}:{frontend:localized(config.description.frontend,language,dir+'.description.frontend')})
 },title:localized(config.title,language,dir+'.title')};
 const blocked=todo(meta,context,language);
 if(blocked)diagnostics.push({path:dir,code:'pending-locales',severity:'warning'});
 const map=obj=>'{ '+Object.entries(obj).map(([key,alias])=>JSON.stringify(key)+': '+alias).join(', ')+' }';
 const result="import { defineSkillDomain } from '@svitlo/engine/build';\n"+
  "import type { SupportedLanguages } from '@svitlo/engine/build';\n"+
  imports.join('\n')+'\n\n'+
  'const languages = '+JSON.stringify([language])+' as const satisfies SupportedLanguages;\n'+
  'const groups = '+map(groups)+';\n'+
  'const skills = '+map(skills)+';\n\n'+
  blocked+'export const '+exportName(slug)+' = defineSkillDomain<'+[JSON.stringify(slug),'typeof groups','typeof skills','typeof languages'].join(', ')+
  '>({\n'+Object.entries(data).map(([key,value])=>'  '+JSON.stringify(key)+': '+JSON.stringify(value,null,2)+',').join('\n')+'\n  groups,\n  skills,\n});\n';
 const produced=[...files,...sidecars(meta,dir),{path:[dir,'index.ts'].filter(Boolean).join('/'),kind:'typescript',content:result}];
 const visited=new Set();
 for(const item of produced){if(visited.has(item.path))throw Error('duplicate generated path: '+item.path);visited.add(item.path)}
 return {id,exportName:exportName(slug),files:produced,diagnostics};
}