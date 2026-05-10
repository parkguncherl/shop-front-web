'use client';
import { useEffect } from 'react';
import { initGuestToken } from '@/libs/guestToken';

export default function GuestTokenInit() {
  useEffect(() => {
    initGuestToken();
  }, []);

  return null; // UI 없음
}
