'use client';
import { useEffect } from 'react';
import { initGuestToken } from '@/libs/guestToken';

export default function GuestTokenInit() {
  useEffect(() => {
    console.log('GuestTokenInit====>');
    initGuestToken();
  }, []);

  return null; // UI 없음
}
