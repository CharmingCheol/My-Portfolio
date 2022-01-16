export type PaginationIcon = "first" | "previous" | "next" | "last";

export interface Props {
  className?: string[];

  /** 맨 앞으로 가기 버튼 출력. default값은 true */
  isShowedFirstButton?: boolean;

  /** 맨 뒤로 가기 버튼 출력. default값은 true */
  isShowedLastButton?: boolean;

  /** 현재 선택 된 page number */
  now: number;

  /** 한번에 보여지는 페이지 버튼 갯수. default값은 5 */
  visiblePage?: number;

  /** 게시글 총 갯수 */
  totalCount: number;

  /** 한 페이지에 보여질 게시글 갯수 */
  size: number;

  onClick: (now: number) => void;
}
