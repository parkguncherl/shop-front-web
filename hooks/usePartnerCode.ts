import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/libs/api';

export function usePartnerCode(partnerUpperCode: string) {
  return useQuery({
    queryKey: ['selectLowerCodeByCodeUpper', partnerUpperCode],
    queryFn: async () => {
      const res = await publicApi.get(`/frontWeb/webCommon/lower/${partnerUpperCode}`);
      return res.data.body;
    },
    enabled: !!partnerUpperCode,
  });
}
