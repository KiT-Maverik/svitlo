/**
 * Create-only staged BuildAnswerWithBlocks source emission.
 * This is NOT a Props publisher or a YAML/Configurator adapter.
 * Child blocks belong to their concrete materializers (Agents C/D).
 */
import type { Question_BuildAnswerWithBlocks_Config } from '../../../configurators/questions/defineBuildAnswerWithBlocks/defineBuildAnswerWithBlocks.schemas';

type PlainBlock = { id: string; slug: string; type: string } & Record<string, unknown>;
type BlockNode = PlainBlock | { config: PlainBlock; production?: Record<string, unknown> };
type BlockCollection = { items: Record<string, BlockNode>; order: string[] };
type Content = Omit<Question_BuildAnswerWithBlocks_Config['content'], 'question' | 'hint' | 'explanation' | 'correctSequence' | 'distractors'> & {
  question: BlockCollection;
  hint?: BlockCollection;
  explanation?: BlockCollection;
  correctSequence: BlockCollection; distractors: BlockCollection;
};
export type BuildAnswerWithBlocksSource = Omit<Question_BuildAnswerWithBlocks_Config, 'content'> & { content: Content };
export type BuildAnswerWithBlocksNode = { config: BuildAnswerWithBlocksSource; production?: { pending?: boolean; specification?: string } };
type OutputFile = { path: string; content: string; kind: 'typescript' | 'markdown' | 'code' };
type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
type ChildOutput = { exportName: string; files: OutputFile[]; diagnostics?: Diagnostic[] };
export type BuildAnswerWithBlocksContext = {
  /** Question-kind bank folder, e.g. questions/selectOneAnswer. */
  directory: string;
  documentLanguage: string;
  plannedLanguages?: readonly string[];
  /** The parent binds the matching concrete ContentBlock renderer. */
  materializeBlock: (node: { config: PlainBlock; production?: Record<string, unknown> }, context: {
    directory: string; documentLanguage: string
  }) => ChildOutput;
  /** A parent preflight may pass all known authored destinations to refuse clobbering. */
  existingPaths?: ReadonlySet<string>;
};
const validSlug = /^[a-z][A-Za-z0-9]*$/;
const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const validUUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const validLocale = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const allowedBlocks = new Set(['text','markdown','code','image','video','youtube','audio','subtitles','scene','carousel','checkpoint']);
const collectionPaths = new Set(["content.question","content.hint","content.explanation","content.correctSequence","content.distractors"]);
const childPatterns = ["content.question.items.*","content.hint.items.*","content.explanation.items.*","content.correctSequence.items.*","content.distractors.items.*"];
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value!==null && typeof value==='object' && !Array.isArray(value);
const fail = (location: string, reason: string): never => { throw new Error('buildAnswerWithBlocks '+location+': '+reason); };
function safeSlug(value: unknown, location: string): string {
  if (typeof value!=='string' || !validSlug.test(value) || ['constructor','prototype','__proto__'].includes(value))
    fail(location,'invalid or unsafe slug');
  return value;
}
function checkPath(value: string): void {
  if (!value || value.startsWith('/') || value.split('/').some(part=>
    !part || part==='.' || part==='..' || !/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9]+)?$/.test(part)))
    fail(value,'unsafe destination path');
}
function assertCollection(value: unknown, location: string): asserts value is { items: Record<string, unknown>; order: string[] } {
  if (!isRecord(value) || !isRecord(value.items) || !Array.isArray(value.order))
    fail(location,'expected items/order collection');
  const keys=Object.keys(value.items);
  if (keys.length!==value.order.length || new Set(value.order).size!==keys.length ||
      value.order.some(key=>typeof key!=='string' || !Object.hasOwn(value.items,key)))
    fail(location+'.order','order must include each item exactly once');
  for (const key of keys) safeSlug(key,location+'.items.'+key);
}
/** Prune only true locale-code dictionaries, not ordinary maps (e.g. accepted answers). */
function sourceLocale(value: unknown, language: string, location: string): unknown {
  if (Array.isArray(value)) return value.map((item,index)=>sourceLocale(item,language,location+'['+index+']'));
  if (!isRecord(value)) return value;
  const keys=Object.keys(value);
  if (keys.length && keys.every(key=>validLocale.test(key))) {
    if (!Object.hasOwn(value,language)) fail(location,'reviewed source-language value missing: '+language);
    return { [language]: sourceLocale(value[language],language,location+'.'+language) };
  }
  return Object.fromEntries(keys.map(key=>[key,sourceLocale(value[key],language,location+'.'+key)]));
}
export function materializeBuildAnswerWithBlocks(node: BuildAnswerWithBlocksNode, context: BuildAnswerWithBlocksContext): ChildOutput {
  const config=node.config;
  if (!isRecord(config) || config.type!=='buildAnswerWithBlocks') fail('config.type','incorrect kind');
  const name=safeSlug(config.slug,'config.slug');
  if (typeof config.id!=='string' || !validUUID.test(config.id) || config.id==='00000000-0000-0000-0000-000000000000')
    fail('config.id','immutable non-Nil Question UUID required');
  if (!validLocale.test(context.documentLanguage)) fail('documentLanguage','valid source locale required');
  if (!isRecord(config.params) || !isRecord(config.content)) fail('config','params/content required');
  assertCollection(config.content.question,'content.question');
  if (!config.content.question.order.length) fail('content.question','reviewed prompt required');
  if (config.content.hint!==undefined) assertCollection(config.content.hint,'content.hint');
  if (config.content.explanation!==undefined) assertCollection(config.content.explanation,'content.explanation');
  assertCollection(config.content.correctSequence,'content.correctSequence');
  assertCollection(config.content.distractors,'content.distractors');
  if (!config.content.correctSequence.order.length) fail('content.correctSequence','at least one answer block required');
  const planned=context.plannedLanguages ?? [context.documentLanguage];
  if (!planned.includes(context.documentLanguage)) fail('plannedLanguages','source language must be included');
  checkPath(context.directory);
  const modulePath=context.directory+'/'+name+'.ts';
  const files: OutputFile[]=[];
  const diagnostics: Diagnostic[]=[];
  const imports: string[]=[];
  const blockers: string[]=[];
  if (node.production?.pending===true) blockers.push('Independent Question Bank review and content completion required.');
  const remaining=planned.filter(code=>code!==context.documentLanguage);
  if (remaining.length) blockers.push('Restore independently reviewed translations for '+remaining.join(', ')+'.');
  const matches=(pattern: string,parts: string[])=>{
    const tokens=pattern.split('.');
    return tokens.length===parts.length && tokens.every((token,index)=>token==='*'||token===parts[index]);
  };
  const render=(value: unknown,parts: string[],depth=0): string=>{
    const location=parts.join('.');
    if (childPatterns.some(pattern=>matches(pattern,parts))) {
      if (!isRecord(value)) fail(location,'nested ContentBlock Config required');
      const child=isRecord(value.config)?value.config:value;
      if (!isRecord(child) || typeof child.type!=='string' || !allowedBlocks.has(child.type))
        fail(location,'unrecognized ContentBlock kind');
      if (typeof child.id!=='string' || !validUUID.test(child.id)) fail(location+'.id','existing child UUID required');
      safeSlug(child.slug,location+'.slug');
      if (parts.at(-2)==='items' && child.slug!==parts.at(-1))
        fail(location+'.slug','child slug must match collection key');
      const childDir=context.directory+'/'+name+'/'+location.replaceAll('.','/');
      checkPath(childDir);
      const out=context.materializeBlock(
        { config: child as PlainBlock, ...(isRecord(value.production)?{production:value.production}:{}) },
        {directory:childDir,documentLanguage:context.documentLanguage},
      );
      if (!out || !validIdentifier.test(out.exportName) || !Array.isArray(out.files))
        fail(location,'invalid child materializer result');
      const alias='child_'+parts.join('_');
      if (!validIdentifier.test(alias)) fail(location,'invalid import name');
      imports.push('import { '+out.exportName+' as '+alias+' } from '+JSON.stringify('./'+name+'/'+location.replaceAll('.','/'))+';');
      files.push(...out.files);
      diagnostics.push(...(out.diagnostics ?? []));
      return alias;
    }
    if (collectionPaths.has(location)) assertCollection(value,location);
    if (location==='locale' || (false))
      value=sourceLocale(value,context.documentLanguage,location);
    if (typeof value==='number' && !Number.isFinite(value)) fail(location,'nonfinite numeric value');
    if (value===null || typeof value==='string' || typeof value==='number' || typeof value==='boolean')
      return JSON.stringify(value);
    if (Array.isArray(value)) return '['+value.map((item,index)=>render(item,[...parts,String(index)],depth+1)).join(', ')+']';
    if (!isRecord(value)) fail(location,'unsupported opaque source expression; preserve through parent');
    const entries=Object.entries(value).map(([key,item])=>
      '  '.repeat(depth+1)+(validIdentifier.test(key)&&key!=='__proto__'?key:JSON.stringify(key))+': '+render(item,[...parts,key],depth+1));
    return entries.length?'{\n'+entries.join(',\n')+'\n'+'  '.repeat(depth)+'}':'{}';
  };
  const nested='const content = '+render(config.content,['content'])+';\n\n';
  const metadata=Object.entries(config).filter(([key])=>key!=='content').map(([key,item])=>
    '  '+key+': '+render(item,[key],1)+',').join('\n');
  files.push({
    path:modulePath,kind:'typescript',
    content:[
      "import { defineBuildAnswerWithBlocks } from '@svitlo/engine/build';",
      ...imports.sort(),'',
      ...blockers.map(reason=>'// TODO (BLOCKER): '+reason),
      nested+'export const '+name+' = defineBuildAnswerWithBlocks<'+JSON.stringify(name)+', typeof content, ['+JSON.stringify(context.documentLanguage)+']>({\n'+
        metadata+'\n  content,\n});\n',
    ].join('\n'),
  });
  if (node.production?.specification) files.push({
    path:context.directory+'/'+name+'/specification.md',
    content:node.production.specification.trimEnd()+'\n',kind:'markdown',
  });
  const seen=new Set<string>();
  for (const file of files) {
    checkPath(file.path);
    if (seen.has(file.path)) fail(file.path,'duplicate emitted destination');
    if (context.existingPaths?.has(file.path)) fail(file.path,'existing authored file; create-only/no clobber');
    seen.add(file.path);
  }
  return {exportName:name,files:files.sort((a,b)=>a.path.localeCompare(b.path,'en')),diagnostics};
}
