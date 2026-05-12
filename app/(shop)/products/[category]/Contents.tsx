'use client';

import styles from '@/app/(shop)/page.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  ContentsRequestContentsInfoListFilter,
  ContentsResponseContentsInfo,
} from '@/generated';
import publicApi from '@/libs/publicApi';
import useFilters from '@/hooks/useFilters';
import { useContentsStore } from '@/stores/useContentsStore';
import { Contents as ContentsRegExps } from '../../../../libs/const';
import { useWebCommonStore } from '@/stores/useWebCommonStore';


interface ExtendedContentsResponseContentsInfo extends ContentsResponseContentsInfo {
  src?: string;
}

/** 상품 - 카테고리 (조건부) 페이지 */
const Contents = () => {
  /** 홈페이지 전역 스토어 - State */
  const [pagingOnContents, setPagingOnContents] = useContentsStore((s) => [s.paging, s.setPaging]);
  const [getFileUrl] = useWebCommonStore((s) => [s.getFileUrl]);

  /** filters, lastInfo's filters*/
  const [filters, onChangeFilters, onFiltersReset, dispatch] = useFilters<ContentsRequestContentsInfoListFilter>({
    lastId: undefined,
  });

  const [contentsResponseContentsInfoList, setContentsResponseContentsInfoList] = useState<ContentsResponseContentsInfo[]>([]);

  /** 품목정보 목록 조회 */
  const {
    data: contentsInfoList,
    isSuccess: isContentsInfoListSuccess,
    isLoading: isContentsInfoListLoading,
    refetch: contentsInfoListRefetch,
  } = useQuery({
    queryKey: ['/frontWeb/contents/contentsInfoListPaging'],
    queryFn: () =>
      // 인증 토큰 불필요
      publicApi.get('/frontWeb/contents/contentsInfoListPaging', {
        params: {
          //curPage: paging.curPage,
          pageRowCount: pagingOnContents.pageRowCount,
          ...filters,
        },
      }),
    refetchOnMount: 'always',
  });

  // todo 텍스트 토큰에서 이미지 sysFileNm 추출 후 조회하여야
  // const syncContentsInfosWithImgSrcs = async (ListForEnum: DisplayResponseProductInfoForEnum[]) => {
  //   const extendedContentsResponseContentsInfoList: ExtendedContentsResponseContentsInfo[] = [];
  //   for (let i = 0; i < ListForEnum.length; i++) {
  //     extendedContentsResponseContentsInfoList.push({
  //       ...ListForEnum[i],
  //       src: ListForEnum[i].sysFileNm ? await getFileUrl(ListForEnum[i].sysFileNm as string) : undefined,
  //     });
  //   }
  //
  //   return extendedContentsResponseContentsInfoList;
  // };

  // const attachImgSrcForEachContents = async (contentInfos: ContentsResponseContentsInfo[]) => {
  //   for (let i = 0; i < contentInfos.length; i++) {
  //     if (contentInfos[i].fileId) {
  //       await selectFileList(contentInfos[i].fileId as number).then(async (fileDetList) => {})
  //     }
  //   }
  // }

  useEffect(() => {
    if (isContentsInfoListSuccess) {
      const { resultCode, body, resultMessage } = contentsInfoList.data;
      if (resultCode === 200) {
        const contentInfos: ContentsResponseContentsInfo[] = body.rows || [];
        console.log('contentInfos: ', contentInfos);
        // syncContentsInfosWithImgSrcs(body.rows || []).then((extendedContentsResponseContentsInfoList) => {
        //   console.log('extendedContentsResponseContentsInfoList: ', extendedContentsResponseContentsInfoList);
        //   setContentsResponseContentsInfoList(extendedContentsResponseContentsInfoList);
        // });
      } else {
        console.error(resultMessage);
      }
    }
  }, [contentsInfoList, isContentsInfoListSuccess]);

  return (
    <div className={styles.page}>
      {/* 필터 행 */}
      <div className={styles.filterRow}>
        {/*<div className={styles.titleWrap}>*/}
        {/*  <span className={styles.pageTitle}>베스트셀러</span>*/}
        {/*  <span className={styles.totalCount}>({productInfosForEnum.length})</span>*/}
        {/*</div>*/}
        <button className={styles.sortBtn}>상품정렬 ▽</button>
      </div>

      {/* 2컬럼 그리드 */}
      <div className={styles.grid}>
        {/*{contentsResponseContentsInfoList.map((contentsInfo, index) => (*/}
        {/*  <div key={index} className={styles.card}>*/}
        {/*    <div className={styles.imageWrap}>*/}
        {/*      /!*<img src={`https://picsum.photos/seed/${index + 1 + 10}/400/500`} alt={product.prodNm} className={styles.image} />*!/*/}
        {/*      {contentsInfo.src ? (*/}
        {/*        <img src={contentsInfo.src} alt={contentsInfo.prodNm} className={styles.image} />*/}
        {/*      ) : (*/}
        {/*        <div title={contentsInfo.prodNm} className={`${styles.image} ${styles.defaultImg}`} />*/}
        {/*      )}*/}
        {/*      /!*{product.badge && <span className={`${styles.badge} ${styles[product.badge]}`}>{product.badge.toUpperCase()}</span>}*!/*/}
        {/*      <button className={styles.wishBtn} aria-label="찜하기">*/}
        {/*        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">*/}
        {/*          <path*/}
        {/*            d="M11 18.5S3 13.5 3 8a5 5 0 019.5-2.2A5 5 0 0119 8c0 5.5-8 10.5-8 10.5z"*/}
        {/*            stroke="currentColor"*/}
        {/*            strokeWidth="1.5"*/}
        {/*            strokeLinecap="round"*/}
        {/*          />*/}
        {/*        </svg>*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*    <div className={styles.info}>*/}
        {/*      <p className={styles.name}>{contentsInfo.prodNm}</p>*/}
        {/*      <div className={styles.priceRow}>*/}
        {/*        {contentsInfo.discountRate && contentsInfo.discountRate != 0 && (*/}
        {/*          <span className={styles.discount}>{Math.round(product.discountRate || 0)}%</span>*/}
        {/*        )}*/}
        {/*        <span className={styles.price}>*/}
        {/*          {((contentsInfo.sellAmt || 0) - (contentsInfo.sellAmt || 0) * Math.round(contentsInfo.discountRate || 0)).toLocaleString()}원*/}
        {/*        </span>*/}
        {/*        {contentsInfo.sellAmt && contentsInfo.discountRate && contentsInfo.discountRate != 0 && (*/}
        {/*          <span className={styles.originalPrice}>{contentsInfo.sellAmt.toLocaleString()}원</span>*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export default Contents;
