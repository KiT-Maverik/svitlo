import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export type NativeBackHandler = (canGoBack: boolean) => void;

/** Only native app lifecycle/back-navigation belongs here. Browser fetch,
 * IndexedDB and History do not need Capacitor wrappers. */
export async function registerNativeBackButton(handler: NativeBackHandler): Promise<() => void> {
  if (!Capacitor.isNativePlatform()) return () => undefined;
  const listener = await App.addListener('backButton', ({ canGoBack }) => handler(canGoBack));
  return () => { void listener.remove(); };
}

export async function registerAppResume(handler: () => void): Promise<() => void> {
  if (!Capacitor.isNativePlatform()) return () => undefined;
  const listener = await App.addListener('resume', handler);
  return () => { void listener.remove(); };
}
