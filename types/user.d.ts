export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImageUrl?: string;
  grade: UserGrade;
  point: number;
  createdAt: string;
}

export type UserGrade = 'BRONZE' | 'SILVER' | 'GOLD' | 'VIP';

export const USER_GRADE_LABEL: Record<UserGrade, string> = {
  BRONZE: '브론즈',
  SILVER: '실버',
  GOLD: '골드',
  VIP: 'VIP',
};

export interface UserAddress {
  id: number;
  recipientName: string;
  phone: string;
  zipCode: string;
  address1: string;
  address2: string;
  isDefault: boolean;
  memo?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}
