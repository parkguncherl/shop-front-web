'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ContentsRequestContentsInfoListFilter, ContentsResponseContentsInfo } from '@/generated';
import publicApi from '@/libs/publicApi';
import useFilters from '@/hooks/useFilters';
import { useContentsStore } from '@/stores/useContentsStore';
//import { Contents as ContentsRegExps } from '../../../../libs/const';
import { useWebCommonStore } from '@/stores/useWebCommonStore';
import styles from '@/app/(shop)/page.module.scss';

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

  const [contentsResponseContentsInfoList, setContentsResponseContentsInfoList] = useState<ExtendedContentsResponseContentsInfo[]>([]);

  /** 품목정보 목록 조회 */
  const {
    data: contentsInfoList,
    isSuccess: isContentsInfoListSuccess,
    isLoading: isContentsInfoListLoading,
    refetch: contentsInfoListRefetch,
  } = useQuery({
    queryKey: ['/frontWeb/contents/contentsInfoListPaging', pagingOnContents.curPage],
    queryFn: () =>
      // 인증 토큰 불필요
      publicApi.get('/frontWeb/contents/contentsInfoListPaging', {
        params: {
          curPage: pagingOnContents.curPage,
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

  // 컨텐츠 각각에 img src 첨부
  const attachImgSrcForEachContents = async (contentInfos: ContentsResponseContentsInfo[]) => {
    const extendedContentsResponseContentsInfoList: ExtendedContentsResponseContentsInfo[] = [];
    for (let i = 0; i < contentInfos.length; i++) {
      extendedContentsResponseContentsInfoList.push({
        ...contentInfos[i],
        src: contentInfos[i].sysFileNm ? await getFileUrl(contentInfos[i].sysFileNm as string) : undefined,
      });
    }

    return extendedContentsResponseContentsInfoList;
  };

  useEffect(() => {
    if (isContentsInfoListSuccess) {
      const { resultCode, body, resultMessage } = contentsInfoList.data;
      if (resultCode === 200) {
        // const contentInfos: ContentsResponseContentsInfo[] = body.rows || [];
        // console.log('contentInfos: ', contentInfos);
        attachImgSrcForEachContents(body.rows || []).then((extendedContentsResponseContentsInfoList) => {
          setContentsResponseContentsInfoList(extendedContentsResponseContentsInfoList);
        });
      } else {
        console.error(resultMessage);
      }
    }
  }, [contentsInfoList, isContentsInfoListSuccess]);

  return (
    <div className={styles.page}>
      {/* 필터 행 */}
      <div className={'filterRow'}>
        <div className={'titleWrap'}>
          <span className={'pageTitle'}>베스트셀러</span>
          <span className={'totalCount'}>({contentsResponseContentsInfoList.length})</span>
        </div>
        <button className={styles.sortBtn}>상품정렬 ▽</button>
      </div>

      {/* 2컬럼 그리드 */}
      <div className={styles.grid}>
        {contentsResponseContentsInfoList.map((product, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrap}>
              {product.src ? (
                <img src={product.src} alt={product.newsSubTitle} className={styles.image} />
              ) : (
                <div title={product.newsSubTitle} className={`${styles.image} ${styles.defaultImg}`} />
              )}
              <button className={styles.wishBtn} aria-label="찜하기">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 18.5S3 13.5 3 8a5 5 0 019.5-2.2A5 5 0 0119 8c0 5.5-8 10.5-8 10.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{product.newsSubTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
