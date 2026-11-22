/**
 * Source-only Flashcard materialization. Each side is a separate Configurator,
 * never an anonymous copied ContentBlock map. No synthetic card, answer, or relationship IDs.
 */
import type { Flashcard_Config } from '../../../configurators/flashcards/defineFlashcard/defineFlashcard.schemas';
import { materializeFlashcardSide, type FlashcardSideSource, type FlashcardSideContext,
  type PlainBlock, type SourceFile, type SourceDiagnostic, type ChildResult } from '../flashcardSide/materializeFlashcardSide';

export type FlashcardSource = Omit<Flashcard_Config,'content'> & {
  content: { front: FlashcardSideSource; back: FlashcardSideSource; hint?: FlashcardSideSource };
};
export type FlashcardNode = {
  config: FlashcardSource;
  production?: { pending?: boolean; specification?: string };
};
export type FlashcardContext = {
  directory: string;
  documentLanguage: string;
  plannedLanguages?: readonly string[];
  existingPaths?: ReadonlySet<string>;
  materializeBlock: FlashcardSideContext['materializeBlock'];
};
const record=(v:unknown):v is Record<string,unknown>=>v!==null && typeof v==='object' && !Array.isArray(v);
const identifier=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const slug=/^[a-z][A-Za-z0-9]*$/;
const uuid=/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const localeCode=/^[a-z]{2}(?:-[A-Z]{2})?$/;
const fail=(location:string,message:string):never=>{throw new Error('flashcard '+location+': '+message);};
function safePath(value:string):void {
  if (!value || value.startsWith('/') || value.split('/').some(part=>!part || part==='.' || part==='..' ||
    !/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9]+)?$/.test(part))) fail(value,'unsafe output path');
}
function sourceValue(value:unknown,language:string,location:string):unknown {
  if(Array.isArray(value)) return value.map((child,index)=>sourceValue(child,language,location+'['+index+']'));
  if(!record(value)) return value;
  const keys=Object.keys(value);
  if(keys.length && keys.every(key=>localeCode.test(key))){
    if(!Object.hasOwn(value,language)) fail(location,'reviewed source-language value required: '+language);
    return { [language]:sourceValue(value[language],language,location+'.'+language) };
  }
  return Object.fromEntries(keys.map(key=>[key,sourceValue(value[key],language,location+'.'+key)]));
}
function literal(value:unknown,location:string,level=0):string {
  if(value===null || typeof value==='string' || typeof value==='boolean') return JSON.stringify(value);
  if(typeof value==='number' && Number.isFinite(value)) return JSON.stringify(value);
  if(Array.isArray(value)) return '['+value.map((entry,i)=>literal(entry,location+'['+i+']',level+1)).join(', ')+']';
  if(!record(value)) fail(location,'unsupported authored value');
  const entries=Object.entries(value).map(([key,item])=>
    '  '.repeat(level+1)+(identifier.test(key)&&key!=='__proto__'?key:JSON.stringify(key))+': '+literal(item,location+'.'+key,level+1));
  return entries.length?'{\n'+entries.join(',\n')+'\n'+'  '.repeat(level)+'}':'{}';
}
function validateParameters(params:FlashcardSource['parameters']):void {
  if(!record(params) || !Array.isArray(params.flags) || !Array.isArray(params.tags))
    fail('parameters','tags and unordered flags arrays required');
  const builtins=new Set<string>();
  for(const [index,flag] of params.flags.entries()){
    if(!record(flag) || !['list','warning','acronym','custom'].includes(flag.type as string))
      fail('parameters.flags['+index+']','invalid flag discriminant');
    if(flag.type!=='custom'){
      if(builtins.has(flag.type as string)) fail('parameters.flags','duplicate built-in flag');
      builtins.add(flag.type as string);
    }
    if(flag.type==='list' && (typeof flag.count!=='number' || !Number.isInteger(flag.count) || flag.count<2))
      fail('parameters.flags['+index+'].count','list count must be >= 2');
    if(['acronym','custom'].includes(flag.type as string) && flag.value===undefined)
      fail('parameters.flags['+index+'].value','localized flag value required');
    if(flag.type==='custom' && typeof flag.color!=='string')
      fail('parameters.flags['+index+'].color','custom flag color required');
  }
  const relations=params.relationships;
  if(relations!==undefined){
    if(!record(relations) || !record(relations.items) || !Array.isArray(relations.order))
      fail('parameters.relationships','expected items/order');
    const keys=Object.keys(relations.items);
    if(keys.length!==relations.order.length || new Set(relations.order).size!==keys.length ||
      relations.order.some(key=>!Object.hasOwn(relations.items,key)))
      fail('parameters.relationships.order','all relationship keys required exactly once');
    const ids=new Set<string>();
    for(const [key,relation] of Object.entries(relations.items)){
      if(!slug.test(key) || !record(relation) || typeof relation.relationshipId!=='string' ||
        !uuid.test(relation.relatedFlashcardId as string))
        fail('parameters.relationships.items.'+key,'valid relationship identity and real target UUID required');
      if(ids.has(relation.relationshipId)) fail('parameters.relationships.items.'+key,'duplicate relationshipId');
      ids.add(relation.relationshipId);
    }
  }
}
export function materializeFlashcard(node:FlashcardNode,context:FlashcardContext):ChildResult {
  const config=node.config;
  if(!record(config) || typeof config.id!=='string' || !uuid.test(config.id) ||
    config.id==='00000000-0000-0000-0000-000000000000') fail('config.id','immutable non-Nil Flashcard UUID required');
  if(typeof config.slug!=='string' || !slug.test(config.slug) ||
    ['default','constructor','__proto__'].includes(config.slug)) fail('config.slug','invalid named Flashcard slug');
  if('type' in config || Object.keys(config).some(key=>!['id','slug','parameters','content'].includes(key)))
    fail('config','Flashcard Config is not a typed Question and has no authored type field');
  if(!localeCode.test(context.documentLanguage)) fail('documentLanguage','valid source language required');
  if(!record(config.content) || !record(config.content.front) || !record(config.content.back))
    fail('content','front and back FlashcardSide Config required');
  validateParameters(config.parameters);
  const planned=context.plannedLanguages??[context.documentLanguage];
  if(!planned.includes(context.documentLanguage)) fail('plannedLanguages','reviewed source locale must be supported');
  safePath(context.directory);
  const files:SourceFile[]=[];
  const diagnostics:SourceDiagnostic[]=[];
  const imports:string[]=[];
  for(const role of ['front','back','hint'] as const){
    const source=config.content[role];
    if(source===undefined) continue;
    const dir=context.directory+'/'+config.slug+'/content/'+role;
    const output=materializeFlashcardSide(source,{
      directory:dir,role,documentLanguage:context.documentLanguage,
      materializeBlock:context.materializeBlock,existingPaths:context.existingPaths,
    });
    files.push(...output.files);
    diagnostics.push(...(output.diagnostics??[]));
    imports.push('import { '+role+' } from '+JSON.stringify('./'+config.slug+'/content/'+role)+';');
  }
  const parameters=structuredClone(config.parameters) as Record<string,unknown>;
  parameters.flags=(config.parameters.flags as unknown[]).map((flag,index)=>{
    if(!record(flag)) fail('parameters.flags['+index+']','flag Config object required');
    return ['acronym','custom'].includes(flag.type as string)?
      { ...flag,value:sourceValue(flag.value,context.documentLanguage,'parameters.flags['+index+'].value') } : flag;
  });
  const languages=context.documentLanguage;
  const hint=config.content.hint!==undefined;
  const paramsSource='const parameters = '+literal(parameters,'parameters')+' satisfies Flashcard_Config[\'parameters\'];\n\n';
  const contentSource='const content = { front, back'+(hint?', hint':'')+' };\n\n';
  const generics='<'+JSON.stringify(config.slug)+', typeof content.front.items, typeof content.back.items, '+
    (hint?'typeof content.hint.items':'{}')+', typeof parameters.flags, '+
    (config.parameters.relationships?'typeof parameters.relationships.items':'{}')+', ['+JSON.stringify(languages)+']>';
  const blockers:string[]=[];
  if(node.production?.pending) blockers.push('Review Flashcard Bank content and relationships before publication.');
  const remaining=planned.filter(code=>code!==languages);
  if(remaining.length) blockers.push('Restore independently reviewed Flashcard languages: '+remaining.join(', ')+'.');
  files.push({
    path:context.directory+'/'+config.slug+'.ts',kind:'typescript',
    content:[
      "import { defineFlashcard, type Flashcard_Config } from '@svitlo/engine/build';",
      ...imports,'',...blockers.map(reason=>'// TODO (BLOCKER): '+reason),
      paramsSource+contentSource+
      'export const '+config.slug+' = defineFlashcard'+generics+'({\n'+
        '  id: '+JSON.stringify(config.id)+',\n'+
        '  slug: '+JSON.stringify(config.slug)+',\n'+
        '  parameters,\n  content,\n});\n',
    ].join('\n'),
  });
  if(node.production?.specification) files.push({
    path:context.directory+'/'+config.slug+'/specification.md',
    content:node.production.specification.trimEnd()+'\n',kind:'markdown',
  });
  const paths=new Set<string>();
  for(const file of files){
    safePath(file.path);
    if(paths.has(file.path)) fail(file.path,'duplicate materialized destination');
    if(context.existingPaths?.has(file.path)) fail(file.path,'existing authored file; create-only/no clobber');
    paths.add(file.path);
  }
  return {exportName:config.slug,files:files.sort((a,b)=>a.path.localeCompare(b.path,'en')),diagnostics};
}
