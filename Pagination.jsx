import React from 'react';
import {Pagination} from 'react-bootstrap'
import { usePagination, DOTS } from '../../../Hooks/usePagination';

const PaginationCustom = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Pagination>
            {/* Left navigation arrow */}
      
            <Pagination.Prev 
                disabled = {currentPage === 1}
                onClick={onPrevious}
            />
      
            {paginationRange.map(pageNumber => {
                
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <Pagination.Ellipsis />;
                }
                
                // Render our Page Pills
                return (
                
                    <Pagination.Item
                        active ={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                
                );
            })}
            {/*  Right Navigation arrow */}
            <Pagination.Next  
                disabled = {currentPage === lastPage}
                onClick={onNext}
            />
        </Pagination>
    );
};

export default PaginationCustom;
