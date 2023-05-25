import React from 'react'
import styled from 'styled-components';

export default function Paginater({ datas, update, currentPage, pageSize, pageSizeHandler }) {
  const updatePage = (pageNumber) => {
    update(pageNumber);
  }
  const totalPages = () => {
    return Math.ceil(datas.length / pageSize);
  }
  const showPreviousLink = () => {
    return currentPage == 0 ? false : true;
  }
  const showNextLink = () => {
    return currentPage == (totalPages() - 1) ? false : true;
  }
  return (
    <Paginator>
      {totalPages() > 0 && <div className="pagination-wrapper">
      <div className="pages">
      { currentPage + 1 } of { totalPages() }
      </div>
      <div className="rows">
        <span>Rows per page: </span>
        <select name=""  id="" onChange={(e) => pageSizeHandler(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        {showPreviousLink() && <span className="pagination-btn" onClick={() => updatePage(currentPage - 1)}> 
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.58252 1.45911L1.04169 4.99994L4.58252 8.54077M10.9584 4.99994H1.14085" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </span>}
        
        {showNextLink() && <span className="pagination-btn" onClick={() => updatePage(currentPage + 1)}> 
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.41752 1.45911L10.9584 4.99994L7.41752 8.54077M1.04169 4.99994H10.8592" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </span>}
        </div>
      </div>}
    </Paginator>
  )
}

const Paginator = styled.div`
.pagination-wrapper{
  display: flex;
  justify-content: space-between;
  /* position: fixed; */
  bottom: 5%;
  width: 100%;
  height: 70px;
  /* padding: 20px 15px 0px; */
  border-radius: 20px;
  background: #D9D9D95C;
  margin-top: 50px;
}
.pagination-wrapper .pages,
.pagination-wrapper .rows{
  margin: 20px 15px;
}
.pagination-btn {
  cursor: pointer;
  border: 1px solid #ADADAD ;
  border-radius: 6px;
  padding: 2px 12px;
}
.rows select{
  border: 1px solid #ADADAD ;
  border-radius: 6px;
  padding: 2px;
  margin: 0px 10px;
  background: none;
}
`