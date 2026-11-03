import { useEffect, useState } from 'react';
import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const Code = ({ response }: { response: ContentBlockResponse<'code'> }) => {
  const [loaded, setLoaded] = useState<{ path: string; value: string } | null>(null);
  const [failed, setFailed] = useState<{ path: string; message: string } | null>(null);
  const locationIsLocal = response.fileLocation.startsWith('/') && !response.fileLocation.startsWith('//');

  useEffect(() => {
    if (response.codeParams.length !== 0 || !locationIsLocal) return;
    const controller = new AbortController();
    void fetch(response.fileLocation, { signal: controller.signal })
      .then(async result => {
        if (!result.ok) throw new Error('HTTP ' + result.status);
        return result.text();
      })
      .then(value => {
        if (!controller.signal.aborted) setLoaded({ path: response.fileLocation, value });
      })
      .catch(reason => {
        if (!controller.signal.aborted) setFailed({ path: response.fileLocation, message: String(reason) });
      });
    return () => controller.abort();
  }, [response.fileLocation, response.codeParams, locationIsLocal]);

  if (response.codeParams.length !== 0) {
    throw new Error('Code block selector/parameter transformations are not defined by the Response contract');
  }
  if (!locationIsLocal) throw new Error('Code fileLocation must reference a same-origin published resource');
  if (failed?.path === response.fileLocation) return <p role="alert">{failed.message}</p>;
  return (
    <pre {...localizedAttributes(response)}>
      <code>{loaded?.path === response.fileLocation ? loaded.value : response.fileLocation}</code>
    </pre>
  );
};
