// import { Arrow } from "./Arrow/Arrow";

import "./Pagination.scss";

export const Pagination = (props) => {
  // **Props
  const { totalPages, currentPage = 1, onPageChange, hideOnSinglePage = false, scrollRef } = props;

  const pageChangeHandler = (page) => () => {
    if (page <= 0 || page > Math.ceil(totalPages)) {
      return;
    }

    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }

    onPageChange(page);
  };

  const renderPagination = () => {
    const paginationArray = [];

    for (let i = 1; i <= Math.ceil(totalPages); i += 1) {
      if (i === 1) {
        paginationArray.push(i);
      }

      if (i === currentPage - 1 && i !== 1) {
        paginationArray.push(i);
      }

      if (i === currentPage) {
        paginationArray.push(i);
      }

      if (i === currentPage + 1 && i !== Math.ceil(totalPages)) {
        paginationArray.push(i);
      }

      if (i === Math.ceil(totalPages)) {
        paginationArray.push(i);
      }
    }

    const filteredArray = Array.from(new Set(paginationArray));

    if (filteredArray[1] >= 3) {
      filteredArray.splice(1, 0, 0);
    }

    if (filteredArray[filteredArray.length - 2] + 1 !== filteredArray[filteredArray.length - 1]) {
      filteredArray.splice(filteredArray.length - 1, 0, 0);
    }

    return filteredArray;
  };

  if ((hideOnSinglePage && totalPages <= 1) || !totalPages) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="pagination__list">
        {/* <button className="pagination__item pagination__item--prev" onClick={pageChangeHandler(currentPage - 1)}>
          <Arrow disabled={currentPage === 1} />
        </button> */}
        {renderPagination().map((pagination, index) => {
          if (pagination) {
            return (
              <button
                key={`number-${pagination}-${index}`}
                className={currentPage === pagination ? "pagination__item pagination__item--active" : "pagination__item"}
                aria-label={`Go to ${pagination} page`}
                onClick={pageChangeHandler(pagination)}
              >
                {pagination}
              </button>
            );
          }

          return (
            <button key={`dots-${pagination}-${index}`} className="pagination__item pagination__item--divider" onClick={pageChangeHandler(pagination)}>
              ...
            </button>
          );
        })}
        {/* <button className="pagination__item pagination__item--next" onClick={pageChangeHandler(currentPage + 1)}>
          <Arrow disabled={currentPage === totalPages} rotation={180} />
        </button> */}
      </div>
    </div>
  );
};
