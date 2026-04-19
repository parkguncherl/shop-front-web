import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

/** 가격 포맷: 12000 → "12,000원" */
export const formatPrice = (price: number): string => `${price.toLocaleString('ko-KR')}원`;

/** 할인율 계산: (원가, 할인가) → 30 */
export const calcDiscount = (original: number, sale: number): number => Math.round((1 - sale / original) * 100);

/** 날짜 포맷: ISO 문자열 → "2025.01.15" */
export const formatDate = (iso: string): string => format(parseISO(iso), 'yyyy.MM.dd', { locale: ko });

/** 날짜+시간 포맷: ISO 문자열 → "2025.01.15 14:30" */
export const formatDateTime = (iso: string): string => format(parseISO(iso), 'yyyy.MM.dd HH:mm', { locale: ko });

/** 전화번호 포맷: "01012345678" → "010-1234-5678" */
export const formatPhone = (phone: string): string => phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

/** 주문번호 마스킹: 앞 8자리만 표시 */
export const maskOrderNo = (orderNo: string): string => orderNo.substring(0, 8).toUpperCase();

/** 배송비 계산 */
export const calcShipping = (price: number, threshold = 50000, fee = 3000): number => (price >= threshold ? 0 : fee);
