/**
 * 기본적인 main layout을 적용하는 페이지인지 확인하는 함수입니다.
 * MainLayout 컴포넌트, Header Route 컴포넌트에서 사용됩니다.
 * @param pathname
 * @returns boolean
 */
const fnGetMainLayoutPage = (pathname: string) => {
  if (pathname.includes("/project")) return false;
  if (pathname === process.env.WRITE_PAGE) return false;
  return true;
};

export default fnGetMainLayoutPage;
