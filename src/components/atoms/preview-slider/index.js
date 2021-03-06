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
    outOfString = ' of',
    displayingString = 'Preview',
    onPageChange,
}) => {
    return (
        <div className='preview_pagination'>
            <h5 className={'pagination-text'}>{displayingString} <span>
                {currentPage}
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