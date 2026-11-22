import type { Lesson_Config } from '../../../configurators/lessons/defineLesson/defineLesson.schemas';

/**
 * Standalone Lesson source materializer. Accepts ordinary authored Config data,
 * not a live Configurator or YAML parser. Sections are independently delegated
 * to the same renderer used by the Course Episode materializer.
 */
export type ChildConfig = { id: string; slug: string; type: string; [key: string]: unknown };
export type SourceChild = ChildConfig | { config: ChildConfig; production?: Record<string, unknown> };
export type Source = Omit<Lesson_Config, 'section'> & {
  section: { items: Record<string, SourceChild>; order: string[] };
};
export type GeneratedFile = { path: string; content: string; kind: 'typescript' | 'specification' | 'markdown' | 'code' };
export type Diagnostic = { path: string; code: string; message: string; severity: 'warning' };
export type Result = { exportName: string; files: GeneratedFile[]; diagnostics: Diagnostic[] };
export type Options = {
  documentLanguage: string;
  directory?: string;
  production?: Record<string, unknown>;
  renderSection: (config: ChildConfig, options: {
    directory: string; documentLanguage: string; languagesImport: string; production?: Record<string, unknown>;
  }) => Result;
};
const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const slug = /^[A-Za-z][A-Za-z0-9]*$/;
const localeKey = /^[a-z]{2}(?:-[A-Z]{2})?$/;
const sectionTypes = new Set(['content','practice','codingTask','learningFlow','flashcards','quiz','quest']);
const reserved = new Set(['await','break','case','catch','class','const','continue','debugger','default','delete','do','else','enum','export','extends','false','finally','for','function','if','import','in','instanceof','new','null','return','super','switch','this','throw','true','try','typeof','var','void','while','with','yield','let','static','languages','content','section','stages','tasks']);
const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v);
const reference = Symbol('authored import');
type Reference = { [reference]: string };
const imported = (name: string): Reference => ({ [reference]: name });
const exported = (name: string): string => reserved.has(name) ? 'config_' + name : name;
function part(value: string, location: string): void {
  if (typeof value !== 'string' || !slug.test(value) || value === '__proto__' || value === 'constructor')
    throw new Error(location + ': unsafe or missing camelCase slug');
}
function destination(directory: string, name: string): string {
  if (directory) for (const segment of directory.split('/')) part(segment,'output path');
  return [directory,name].filter(Boolean).join('/');
}
function render(value: unknown, depth = 0): string {
  if (isObject(value) && reference in value) return String(value[reference]);
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(item => render(item, depth + 1)).join(', ') + ']';
  if (!isObject(value)) throw new Error('Unsupported non-JSON authoring value');
  const entries = Object.keys(value);
  if (!entries.length) return '{}';
  return '{\n' + entries.map(key =>
    '  '.repeat(depth + 1) + JSON.stringify(key) + ': ' + render(value[key], depth + 1) + ','
  ).join('\n') + '\n' + '  '.repeat(depth) + '}';
}
function filterLocale(value: unknown, source: string): unknown {
  if (Array.isArray(value)) return value.map(child => filterLocale(child, source));
  if (!isObject(value)) return value;
  const keys = Object.keys(value);
  if (keys.length && keys.every(key => localeKey.test(key)))
    return Object.hasOwn(value, source) ? { [source]: filterLocale(value[source], source) } : {};
  return Object.fromEntries(keys.map(key => [key, filterLocale(value[key], source)]));
}
function sourceNode(value: SourceChild): { config: ChildConfig; production?: Record<string, unknown> } {
  if (isObject(value) && isObject(value.config))
    return {config:value.config as ChildConfig,...(isObject(value.production)?{production:value.production}:{})};
  return {config:value as ChildConfig};
}
/** Exact Section order; no implicit sorting or inferred child identities. */
function validateSections(source: Source): void {
  if (!isObject(source.section) || !isObject(source.section.items) || !Array.isArray(source.section.order))
    throw new Error('lesson.section: expected { items, order }');
  const keys = Object.keys(source.section.items);
  if (keys.length !== source.section.order.length || new Set(source.section.order).size !== keys.length ||
    source.section.order.some(key => typeof key !== 'string' || !Object.hasOwn(source.section.items,key)))
    throw new Error('lesson.section.order: expected every item once');
  const ids = new Set<string>([source.id]);
  for (const key of keys) {
    part(key,'lesson.section.items.'+key);
    const {config} = sourceNode(source.section.items[key]);
    if (!isObject(config) || !uuid.test(config.id) || config.slug !== key || !sectionTypes.has(config.type))
      throw new Error('lesson.section.items.'+key+': invalid Section type/UUID/slug');
    if (ids.has(config.id)) throw new Error('lesson.section.items.'+key+': duplicate UUID '+config.id);
    ids.add(config.id);
  }
}
export function materializeLesson(config: Source, options: Options): Result {
  const dir = options.directory ?? '';
  destination(dir,'index.ts');
  if (config.type !== 'lesson' || !uuid.test(config.id)) throw new Error('lesson: invalid type/UUID');
  part(config.slug,'lesson.slug');
  if (!localeKey.test(options.documentLanguage)) throw new Error('lesson: invalid documentLanguage');
  const planned = config.params?.languages;
  if (!Array.isArray(planned) || !planned.length || planned.some(language => typeof language !== 'string' || !localeKey.test(language)) ||
      new Set(planned).size !== planned.length)
    throw new Error('lesson.params.languages: invalid planned language set');
  if (!planned.includes(options.documentLanguage))
    throw new Error('lesson.params.languages: source language must be in planned languages');
  validateSections(config);
  const files:GeneratedFile[] = [], diagnostics:Diagnostic[] = [];
  const seen=new Set<string>(),imports:string[] = [];
  const add=(file:GeneratedFile):void=>{
    if(seen.has(file.path))throw new Error('lesson: duplicate output '+file.path);
    seen.add(file.path);
    files.push(file);
  };
  const items:Record<string,Reference>={};
  let pendingAssessment=false,hasQuiz=false,hasFlashcards=false,hasQuest=false;
  for (const key of Object.keys(config.section.items).sort()) {
    const node=sourceNode(config.section.items[key]);
    if(node.config.type==='quiz')hasQuiz=true;
    if(node.config.type==='flashcards')hasFlashcards=true;
    if(node.config.type==='quest')hasQuest=true;
    const childDir=destination(dir,'sections/'+key);
    const languagesImport='../../languages';
    const child=options.renderSection(node.config,{
      directory:childDir,documentLanguage:options.documentLanguage,languagesImport,
      ...(node.production?{production:node.production}:{})
    });
    if(child.exportName!==exported(key))throw new Error('lesson.section.items.'+key+': incorrect child export');
    for(const file of child.files){
      if(!file.path.startsWith(childDir+'/'))throw new Error('lesson: Section escaped its source ownership '+file.path);
      add(file);
    }
    diagnostics.push(...child.diagnostics);
    if(child.diagnostics.some(d=>d.code.startsWith('pending-')))pendingAssessment=true;
    const alias='child_section_items_'+key;
    items[key]=imported(alias);
    imports.push('import { '+child.exportName+' as '+alias+' } from '+JSON.stringify('./sections/'+key)+';');
  }
  const blockers:string[]=[];
  if(planned.length>1)blockers.push('// TODO (BLOCKER): Restore reviewed Lesson languages: '+JSON.stringify(planned)+'.');
  const sourceLanguages=[
    "import type { SupportedLanguages } from '@svitlo/engine/build';",
    '',...(planned.length>1?[blockers[0]]:[]),
    'export const languages = '+JSON.stringify([options.documentLanguage])+' as const satisfies SupportedLanguages;',''
  ].join('\n');
  add({path:destination(dir,'languages.ts'),kind:'typescript',content:sourceLanguages});
  if((config.params.quizRequiredForCompletion===true||options.production?.quizRequired===true)&&!hasQuiz)
    blockers.push('// TODO (BLOCKER): Add the editorially required Quiz Section with real reviewed Question IDs.');
  if(options.production?.flashcardsRequired===true&&!hasFlashcards)
    blockers.push('// TODO (BLOCKER): Add the editorially required Flashcards Section with real reviewed Flashcard IDs.');
  if(pendingAssessment)
    blockers.push('// TODO (BLOCKER): Resolve pending Quiz/Flashcards selections in the owned Section modules before publication.');
  if(hasQuest)blockers.push('// TODO (BLOCKER): Quest is Build-only and cannot be published by defineLesson or Lesson runtime yet.');
  if(options.production?.pending===true)blockers.push('// TODO (BLOCKER): Complete Lesson methodology and independent review.');
  if(blockers.length) diagnostics.push({path:destination(dir,'index.ts'),code:'pending-lesson',message:blockers.join(' '),severity:'warning'});
  const {section:_ignored,...metadata}=config;
  const params={...metadata.params,languages:imported('languages')};
  const own={...metadata,params,locale:filterLocale(metadata.locale,options.documentLanguage),section:imported('section')};
  const source=[
    "import { defineLesson } from '@svitlo/engine/build';",
    'import { languages } from "./languages";',
    ...imports,'',...blockers,
    'const section = '+render({items,order:[...config.section.order]})+';',
    'export const '+exported(config.slug)+' = defineLesson<'+JSON.stringify(config.slug)+', typeof languages, typeof section.items>(',
    render(own)+');',''
  ].join('\n');
  if(typeof options.production?.methodology==='string'&&options.production.methodology.trim())
    add({path:destination(dir,'methodology.md'),kind:'markdown',content:options.production.methodology.trimEnd()+'\n'});
  const extra=Object.entries(options.production??{}).filter(([key])=>!['documentLanguage','pending','methodology'].includes(key));
  if(extra.length)add({path:destination(dir,'specification.md'),kind:'specification',content:extra.map(([key,value])=>
    '# '+key+'\n\n'+(typeof value==='string'?value.trimEnd():JSON.stringify(value,null,2))).join('\n\n')+'\n'});
  add({path:destination(dir,'index.ts'),kind:'typescript',content:source});
  return{exportName:exported(config.slug),files,diagnostics};
}
