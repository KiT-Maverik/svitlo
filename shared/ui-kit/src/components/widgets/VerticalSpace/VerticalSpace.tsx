// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../types/css-modules.d.ts" />
import type { ReactNode } from 'react';
import styles from './VerticalSpace.module.css';
import { testId } from './VerticalSpace.constants';

type VerticalSpaceProps = {
  top?: ReactNode;
  center: ReactNode;
  bottom?: ReactNode;
  className?: string;
};

export default function VerticalSpace({ top, center, bottom, className }: VerticalSpaceProps) {
  return (
    <div
      data-testid={testId.container}
      data-has-top={top != null}
      data-has-bottom={bottom != null}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      {top != null && (
        <div data-testid={testId.slots.top} className={styles.edge}>
          {top}
        </div>
      )}
      <div data-testid={testId.slots.center} className={styles.center}>
        {center}
      </div>
      {bottom != null && (
        <div data-testid={testId.slots.bottom} className={styles.edge}>
          {bottom}
        </div>
      )}
    </div>
  );
}
