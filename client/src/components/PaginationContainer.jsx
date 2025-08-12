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

 
  const pageButton = ({pageNumber, activeClass}) => {

   return <button
            key={pageNumber}
            className={`page-btn ${activeClass && 'active-page'}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
  }

 // displaying page buttons based on number of total pages

 const renderButtons = () => {

  const pageArray = []; 
  
  if(totalPages > 4) {
    
    //adding first 3 buttons
    pageArray.push(pageButton({pageNumber: 1, activeClass: currentPage === 1})) 
    pageArray.push(pageButton({pageNumber: 2, activeClass: currentPage === 2})) 
    pageArray.push(<span
            key='dots-1'
            className={`page-btn`}
          >
            ...
          </span>) 
    
    //adding 4th button on condition
  
    if(currentPage !== 1 && currentPage !== 2 & currentPage !== totalPages -1 && currentPage !== totalPages) { pageArray.push(pageButton({pageNumber: currentPage, activeClass: true}))}
    
    // adding 5th button on condition 
    if(pageArr.length > 3) {pageArray.push(<span
            key='dots-2'
            className={`page-btn`}
          >
            ...
          </span>) }

    //adding last two buttons 
    pageArray.push(pageButton({pageNumber: totalPages - 1, activeClass: currentPage === totalPages - 1})) 
    pageArray.push(pageButton({pageNumber: totalPages, activeClass: currentPage === totalPages})) 

  } else {
   pageArray.push(pageButton({pageNumber: 1, activeClass: currentPage === 1}));  
pageArray.push(pageButton({pageNumber: 2, activeClass: currentPage === 2})) 
pageArray.push(pageButton({pageNumber: 3, activeClass: currentPage === 3})) 
pageArray.push(pageButton({pageNumber: 4, activeClass: currentPage === 4})) 
  }
  
  return pageArray; 

 }

  return (
    <div className='mt-8 flex justify-end gap-x-2'>
      <button
        className='arrow-btn'
        onClick={() => {
          let prevPage = currentPage - 1;

          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <FaArrowLeft />
      </button>
       {renderButtons()}
      <button className="arrow-btn" onClick={() => {
          let nextPage = currentPage + 1;

          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }} ><FaArrowRight /></button>
    </div>
  );
}

export default PaginationContainer;
