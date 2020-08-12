import React from 'react';
import ReactPaginate from 'react-paginate';
import './style.scss';

export const PreviewSlider = ({
    limit,
    currentPage,
    totalPages = 5,
    itemsCount = 1,
    nextLabel = '>',
    breakLabel = '...',
    previousLabel = '<',
    outOfString = 'Out of',
    displayingString = 'Displaying',
    onPageChange,
}) => {
    return (
        <div className='pagination-div'>
            <h5 className={'pagination-text'}>{displayingString} <span>
                {(1 + (limit * (currentPage - 1))) + '-' + ((limit * (currentPage - 1)) + itemsCount) + ' '}
            </span>{outOfString + ' '}<span>{totalPages}</span></h5>
            {/* <ReactPaginate
                forcePage={currentPage - 1}
                previousLabel={previousLabel}
                nextLabel={nextLabel}
                breakLabel={breakLabel}
                breakClassName={'break-me'}
                pageCount={totalPages / limit}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                onPageChange={onPageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            /> */}
        </div>
    )
}