import React, { useContext, useState } from 'react'
import { PaginationContext } from '../../context/PaginationContext'
import './Pagination.css'

function Pagination2({ data, dataLimit }) {

  const { goToPreviousPage, goToNextPage, currentPage, changePage, getPaginationGroup } = useContext(PaginationContext)
  const [pages] = useState(Math.round(data.length / dataLimit));

  return (
    <>
    <div className="pagination">
      <button onClick={goToPreviousPage} className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>Prev</button>

      {getPaginationGroup().map((item, index) => (
        <button key={index} onClick={
          changePage
        } className={`paginationItem ${currentPage === item ? 'active' : null}`}><span>{item}</span></button>
      ))}

      <button onClick={goToNextPage} className={`next ${currentPage === pages ? 'disabled' : ''}`} > Next </button>
    </div>
    </>
  )
}

export default Pagination2