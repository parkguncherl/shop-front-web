import React from 'react';
import styles from './Badge.module.scss';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'new' | 'sale' | 'best' | 'sold';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return <span className={clsx(styles.badge, styles[variant], className)}>{children}</span>;
}
