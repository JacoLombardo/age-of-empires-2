import React, { useContext, useEffect } from 'react';
import { PaginationContext } from '../../context/PaginationContext';
import './Pagination.css'

function Pagination2({ data, RenderComponent, pageLimit, dataLimit }) {

  const { getPaginatedData, setDataLimit, setPageLimit, setData, setCurrentPage } = useContext(PaginationContext);

  setDataLimit(dataLimit);
  setPageLimit(pageLimit);
  setData(data);

  useEffect(() => {
    setCurrentPage(1)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  return (
    <>
    {getPaginatedData().map((data) => (
        <RenderComponent key={data.id} data={data} />
      ))}
    </>
  )
}

export default Pagination2