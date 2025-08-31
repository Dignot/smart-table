import { getPages } from "../lib/utils.js";

export const initPagination = ({ pages, fromRow, toRow, totalRows }, createPage) => {
  const pageTemplate = pages.firstElementChild.cloneNode(true);
  pages.firstElementChild.remove();

  let pageCount;

  const applyPagination = (query, state, action) => {
    const limit = state.rowsPerPage;
    let page = state.page;

    if (action) {
      switch (action.name) {
        case "prev":
          page = Math.max(1, page - 1);
          break;
        case "next":
          page = pageCount ? Math.min(pageCount, page + 1) : page + 1;
          break;
        case "first":
          page = 1;
          break;
        case "last":
          page = pageCount || 1;
          break;
      }
    }

    return Object.assign({}, query, { limit, page });
  };

  const updatePagination = (total, { page, limit }) => {
    pageCount = Math.max(1, Math.ceil(total / limit));

    const visiblePages = getPages(page, pageCount, 5);
    pages.replaceChildren(
      ...visiblePages.map((pageNumber) => {
        const el = pageTemplate.cloneNode(true);
        return createPage(el, pageNumber, pageNumber === page);
      })
    );


    const start = total > 0 ? (page - 1) * limit + 1 : 0;
    const end = total > 0 ? Math.min(page * limit, total) : 0;

    fromRow.textContent = start;
    toRow.textContent = end;
    totalRows.textContent = total;
  };

  return {
    applyPagination,
    updatePagination,
  };
};
