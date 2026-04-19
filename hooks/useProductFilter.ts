import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const q = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  const pushParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === '') params.delete(k);
        else params.set(k, v);
      });
      // 필터 변경 시 페이지 초기화
      if (!('page' in updates)) params.delete('page');
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return {
    category,
    sort,
    q,
    page,
    setCategory: (val: string) => pushParams({ category: val }),
    setSort: (val: string) => pushParams({ sort: val }),
    setPage: (val: number) => pushParams({ page: String(val) }),
  };
}
