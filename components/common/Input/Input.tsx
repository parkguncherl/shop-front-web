'use client';
import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, prefix, suffix, className, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={clsx(styles.inputWrap, { [styles.hasError]: !!error })}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input ref={ref} className={clsx(styles.input, className)} {...props} />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
