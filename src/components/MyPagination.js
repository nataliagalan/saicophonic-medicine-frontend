
import React, { useState, useEffect } from 'react';
// import { usePaginatedQuery } from 'react-query';
// import { useDispatch, useSelector  } from 'react-redux';

import Pagination from 'react-bootstrap/Pagination';


const MyPagination = () => {

  const totalPages = (totalCount, perPage) => {

    //let perPage = resolvedData.lenth
    //let totalCount = parseInt(videos[0].all_videos)
    return Math.ceil(totalCount / perPage)
  }
  
  return ( 
  <Pagination>
    <Pagination.Prev 
      onClick={() => setPage(old => Math.max(old - 1, 1))}
      disabled={page === 1}
    />
    <Pagination.Item>{ page }</Pagination.Item>
    <Pagination.Next 
      onClick={() => setPage(old => (!latestData ? old : old + 1))}
      disabled={!latestData}
    />
  </Pagination>
   );
}
 
export default MyPagination;