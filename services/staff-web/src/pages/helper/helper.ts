import { IPageProps } from "../index";

/**
 * @method getAllPages
 * @desc
 * Deal with the nest route first
 * Flatten nest array
 */

function getAllPages(pagesInfoList: IPageProps[]) {
  const allRoutes = [...pagesInfoList];
  pagesInfoList.forEach((pagesInfo: IPageProps) => {
    if (pagesInfo.routes) allRoutes.unshift(...getAllPages(pagesInfo.routes));
  });
  return allRoutes;
}

export default getAllPages;
