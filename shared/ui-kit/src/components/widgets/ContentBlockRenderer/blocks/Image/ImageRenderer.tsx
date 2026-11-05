'use client';

import { createContext, useContext, type ComponentType, type ImgHTMLAttributes, type ReactNode, type Ref } from 'react';

/** React-DOM image attributes plus optional host-specific optimization flags. */
export type ImageRendererProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
  fill?: boolean;
  unoptimized?: boolean;
  ref?: Ref<HTMLImageElement>;
};

export type ImageRenderer = ComponentType<ImageRendererProps>;

const Context = createContext<ImageRenderer | null>(null);

/** Default renderer works in any DOM-based React host, including Electron and WebView. */
function NativeImage({ fill: _fill, unoptimized: _unoptimized, ...props }: ImageRendererProps) {
  return <img {...props} />;
}

/** Framework adapters may supply optimized images without coupling the UI Kit to Next.js. */
export function ImageRendererProvider({ children, renderer }: {
  children: ReactNode;
  renderer: ImageRenderer;
}) {
  return <Context.Provider value={renderer}>{children}</Context.Provider>;
}

export function useImageRenderer(): ImageRenderer {
  return useContext(Context) ?? NativeImage;
}
