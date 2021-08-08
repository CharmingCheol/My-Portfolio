export type PaginationIcon = "first" | "previous" | "next" | "last";

export interface Props {
  className?: string[];

  /** 맨 앞으로 가기 버튼 출력. default값은 true */
  isShowedFirstButton?: boolean;

  /** 맨 뒤로 가기 버튼 출력. default값은 true */
  isShowedLastButton?: boolean;

  /** 현재 선택 된 page number */
  now: number;

  /** 페이지네이션 버튼 총 갯수 */
  total: number;

  /** 한 페이지에 보여질 페이지 버튼 갯수. default값은 5 */
  visibleCount?: number;

  onClick: (params?: any) => void;
}
