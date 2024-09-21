import { usePagination } from "@/hooks/usePagination";

// let currentPage = 5;
// let size = 10;
// let total = 102;
// let siblingCount = 1;

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination(
    totalCount,
    siblingCount,
    pageSize,
    currentPage,
  );
  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center align-items-center gap-xl-1">
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === '...') {
            return <div key={index} className="pagination-item dots">&#8230;</div>;
          }

          // Render our Page Pills
          return (
            <div key={index}>
              {pageNumber === currentPage ?
                <button style={{ height: "35px", width: "30px", border: "1px solid rgb(243 243 243)", backgroundColor: "rgb(53 89 210)" }}
                  className="text-center align-items-center d-flex justify-content-center rounded text-white">
                  {pageNumber}
                </button>
                :
                <button onClick={() => {
                  console.log(pageNumber);
                  onPageChange(pageNumber)
                }} style={{ height: "35px", width: "30px", border: "1px solid rgb(243 243 243)", backgroundColor: "#fff" }}
                  className="text-center align-items-center d-flex justify-content-center rounded">
                  {pageNumber}
                </button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;