export type ContentEntity_ConfigType = 'definition' | 'data' | 'response';

/** Shared, build-time shape for typed authoring creators. */
export type Entity_Creator<Data, Context, Resource> = {
  getData(): Data;
  toResource(context: Context): Resource;
};
