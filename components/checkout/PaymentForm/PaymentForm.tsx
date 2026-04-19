'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button/Button';
import styles from './PaymentForm.module.scss';

const PAYMENT_METHODS = [
  { value: 'card', label: '신용/체크카드' },
  { value: 'kakao', label: '카카오페이' },
  { value: 'naver', label: '네이버페이' },
  { value: 'toss', label: '토스페이' },
  { value: 'vbank', label: '무통장 입금' },
];

interface PaymentFormProps {
  totalPrice: number;
  onPay: (method: string) => void;
  loading?: boolean;
}

export default function PaymentForm({ totalPrice, onPay, loading = false }: PaymentFormProps) {
  const [selected, setSelected] = useState('card');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>결제 수단</h3>

      <div className={styles.methods}>
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.value}
            type="button"
            className={`${styles.method} ${selected === m.value ? styles.selected : ''}`}
            onClick={() => setSelected(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label className={styles.agree}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className={styles.checkbox} />
        <span>구매 조건 및 개인정보 처리 방침에 동의합니다.</span>
      </label>

      <Button size="full" loading={loading} disabled={!agreed} onClick={() => onPay(selected)} className={styles.payBtn}>
        {totalPrice.toLocaleString()}원 결제하기
      </Button>
    </div>
  );
}
