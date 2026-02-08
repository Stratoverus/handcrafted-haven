'use client';

import { AuthView } from '@neondatabase/neon-js/auth/react/ui';
import { usePathname } from 'next/navigation';

export default function LoginPage() {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <AuthView pathname={pathname} />
    </div>
  );
}