import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import PaginationCustom from '../Library/Pagination';

const Table = (props)=> {

    
    const pageSize = 10;
    
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(tableList !== ''){
            const firstPageIndex = (currentPage - 1) * pageSize;
            const lastPageIndex = firstPageIndex + pageSize;
            setPaginatedPosts(tableList.slice(firstPageIndex,lastPageIndex)); 
            //setPaginatedPosts(_(tableList).slice(startIndex).take(pageSize).value());       
        }else{
            setPaginatedPosts('')
        }

    }, [tableList, pageSize, currentPage]);

    const totalCount = tableList ? tableList.length : 0 ;
    
    
    return (
        <React.Fragment>
            
            <nav className='d-flex justify-content-center'>

                <PaginationCustom
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </nav>
        </React.Fragment>
    )
}

export default Table
