'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface SessionProviderCompProps {
  children: ReactNode;
}

export default function SessionProviderComp({ children }: SessionProviderCompProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
