'use client';

import styles from '@/app/(shop)/page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DisplayRequestProductDetInfoListFilter, DisplayResponseProductInfoForEnum } from '@/generated';
import publicApi from '@/libs/publicApi';
import { useCommonStore } from '@/stores/useCommonStore';
import useFilters from '@/hooks/useFilters';
import { useProductStore } from '@/stores/useProductStore';

interface ExtendedDisplayResponseProductInfoForEnum extends DisplayResponseProductInfoForEnum {
  src?: string;
}

/** 상품 - 카테고리 (조건부) 페이지 */
const Product = () => {
  /** 홈페이지 전역 스토어 - State */
  const [pagingOnProduct, setPagingOnProduct] = useProductStore((s) => [s.paging, s.setPaging]);
  const [getFileUrl] = useCommonStore((s) => [s.getFileUrl]);

  /** filters, lastInfo's filters*/
  const [filters, onChangeFilters, onFiltersReset, dispatch] = useFilters<DisplayRequestProductDetInfoListFilter>({
    lastProdId: undefined,
  });

  const [productInfosForEnum, setProductInfosForEnum] = useState<ExtendedDisplayResponseProductInfoForEnum[]>([]);

  /** 품목정보 목록 조회 */
  const {
    data: productInfoListForEnum,
    isSuccess: isProductInfoListForEnumSuccess,
    isLoading: isProductInfoListForEnumLoading,
    refetch: productInfoListForEnumRefetch,
  } = useQuery({
    queryKey: ['/frontWeb/display/productInfoListForEnum'],
    queryFn: () =>
      // 인증 토큰 불필요
      publicApi.get('/frontWeb/display/productInfoListForEnum', {
        params: {
          //curPage: paging.curPage,
          //pageRowCount: pagingOnContents.pageRowCount,
          ...filters,
        },
      }),
    refetchOnMount: 'always',
  });

  const syncProductInfosWithImgSrcs = async (ListForEnum: DisplayResponseProductInfoForEnum[]) => {
    const extendedDisplayResponseProductInfoListForEnum: ExtendedDisplayResponseProductInfoForEnum[] = [];
    for (let i = 0; i < ListForEnum.length; i++) {
      extendedDisplayResponseProductInfoListForEnum.push({
        ...ListForEnum[i],
        src: ListForEnum[i].sysFileNm ? await getFileUrl(ListForEnum[i].sysFileNm as string) : undefined,
      });
    }

    return extendedDisplayResponseProductInfoListForEnum;
  };

  useEffect(() => {
    if (isProductInfoListForEnumSuccess) {
      const { resultCode, body, resultMessage } = productInfoListForEnum.data;
      if (resultCode === 200) {
        syncProductInfosWithImgSrcs(body.rows || []).then((ResponseProductInfoListForEnum) => {
          console.log('ResponseProductInfoListForEnum: ', ResponseProductInfoListForEnum);
          setProductInfosForEnum(ResponseProductInfoListForEnum);
        });
      } else {
        console.error(resultMessage);
      }
    }
  }, [productInfoListForEnum, isProductInfoListForEnumSuccess]);

  return <div className={'productLayout'}></div>;
};

export default Product;
