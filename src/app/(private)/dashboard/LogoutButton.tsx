'use client'

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Logout
    </Button>
  );
}