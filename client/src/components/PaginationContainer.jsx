import { useJobsContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function PaginationContainer() {
  const { search, pathname } = useLocation();
  const { totalPages, currentPage } = useJobsContext();
  console.log(currentPage);

  const navigate = useNavigate();

  const pageArr = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);

    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className='mt-8 flex justify-end gap-x-2'>
      <button
        className='btn'
        onClick={() => {
          let prevPage = currentPage - 1;

          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <FaArrowLeft />
      </button>
      {pageArr.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            className={`page-btn font-medium md:text-lg `}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button className="btn" onClick={() => {
          let nextPage = currentPage + 1;

          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }} ><FaArrowRight /></button>
    </div>
  );
}

export default PaginationContainer;
