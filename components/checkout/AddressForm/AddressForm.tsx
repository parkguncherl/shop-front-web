'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from './AddressForm.module.scss';

export interface AddressFormValues {
  recipientName: string;
  phone: string;
  zipCode: string;
  address1: string;
  address2: string;
  memo: string;
}

interface AddressFormProps {
  defaultValues?: Partial<AddressFormValues>;
  onSubmit: (values: AddressFormValues) => void;
}

const MEMO_OPTIONS = ['배송 전 연락 바랍니다', '부재 시 문 앞에 놓아주세요', '부재 시 경비실에 맡겨주세요', '직접 입력'];

export default function AddressForm({ defaultValues, onSubmit }: AddressFormProps) {
  const [memoOption, setMemoOption] = useState('');
  const [customMemo, setCustomMemo] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({ defaultValues });

  const handleMemoSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setMemoOption(val);
    if (val === '직접 입력') {
      setCustomMemo(true);
      setValue('memo', '');
    } else {
      setCustomMemo(false);
      setValue('memo', val);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <h3 className={styles.title}>배송지 정보</h3>

      <div className={styles.fields}>
        <Input
          label="수령인"
          placeholder="수령인 이름"
          error={errors.recipientName?.message}
          {...register('recipientName', { required: '수령인을 입력해주세요' })}
        />

        <Input
          label="연락처"
          placeholder="010-0000-0000"
          type="tel"
          error={errors.phone?.message}
          {...register('phone', {
            required: '연락처를 입력해주세요',
            pattern: { value: /^[0-9-]{10,13}$/, message: '올바른 연락처를 입력해주세요' },
          })}
        />

        <div className={styles.zipRow}>
          <Input
            label="우편번호"
            placeholder="우편번호"
            readOnly
            error={errors.zipCode?.message}
            {...register('zipCode', { required: '주소를 검색해주세요' })}
          />
          <Button type="button" variant="outline" size="sm" className={styles.searchBtn}>
            주소 검색
          </Button>
        </div>

        <Input placeholder="기본 주소" readOnly {...register('address1')} />

        <Input placeholder="상세 주소 입력" error={errors.address2?.message} {...register('address2', { required: '상세 주소를 입력해주세요' })} />

        <div className={styles.field}>
          <label className={styles.label}>배송 메모</label>
          <select className={styles.select} value={memoOption} onChange={handleMemoSelect}>
            <option value="">선택하세요</option>
            {MEMO_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {customMemo && <Input placeholder="배송 메모를 입력해주세요" {...register('memo')} />}
        </div>
      </div>

      <Button type="submit" size="full" className={styles.submitBtn}>
        배송지 저장
      </Button>
    </form>
  );
}
