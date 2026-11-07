export type ContentEntity_ConfigType = 'definition' | 'data' | 'response';

/** A build-time creator owns entity data, never serialization paths or filesystem IO. */
export type Entity_Creator<Data> = {
  getData(): Data;
};
