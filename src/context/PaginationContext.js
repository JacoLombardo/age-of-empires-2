// 1. Import hook

import { createContext, useState } from "react";

// 2. Create Context / Store

export const PaginationContext = createContext();

// 3. Create provider
export const PaginationContextProvider = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [dataLimit, setDataLimit] = useState();
    const [pageLimit, setPageLimit] = useState();
    const [pageNumber, setPageNumber] = useState();
    const [startIndex, setStartIndex] = useState();
    const [endIndex, setEndIndex] = useState();
    const [start, setStart] = useState();

    function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    setPageNumber(Number(event.target.textContent));
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
      setStartIndex(currentPage * dataLimit - dataLimit)
      setEndIndex(startIndex + dataLimit)
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    setStart(Math.floor((currentPage - 1) / pageLimit) * pageLimit)
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };



//  4. Move state and function

  return (
      <PaginationContext.Provider value={{
          getPaginationGroup, getPaginatedData, changePage, goToPreviousPage, goToNextPage, currentPage, setCurrentPage, data, setData,
          dataLimit, setDataLimit, pageNumber, setPageNumber, startIndex, setStartIndex, endIndex, setEndIndex, start, setStart, setPageLimit
      }}>{props.children}</PaginationContext.Provider>
  );
};
