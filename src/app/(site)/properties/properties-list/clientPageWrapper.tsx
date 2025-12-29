'use client';

import { Suspense } from 'react';
import Page from './page';

export default function ClientPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
