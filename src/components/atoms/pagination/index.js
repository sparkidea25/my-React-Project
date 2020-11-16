import React from 'react';
import ReactPaginate from 'react-paginate';
import { pageData } from '../../../shared/constants';
import './style.scss';
const { Select } = require(`../select`)

export const CustomPagination = ({
    limit,
    currentPage,
    totalPages = 5,
    itemsCount = 1,
    nextLabel = '>',
    breakLabel = '...',
    onChangePageLimit,
    previousLabel = '<',
    outOfString = 'Out of',
    displayingString = 'Displaying',
    onPageChange,
}) => {
    return (
        <div className='container mb-4 mt-3'>
            <div className='row'>
                <div className='col-sm d-flex align-items-center'>
                    <h5 className={'pagination-text'}>{displayingString} <span>
                        {(1 + (limit * (currentPage - 1))) + '-' + ((limit * (currentPage - 1)) + itemsCount) + ' '}
                    </span>{outOfString + ' '}<span>{totalPages}</span></h5>
                </div>
                {!!onChangePageLimit && <div className='mt-3 pageCountField col-sm'>
                    <Select
                        className={'pageCountField'}
                        config={{ value: limit }}
                        defaultValue
                        input={{ onChange: () => { } }}
                        meta={{ error: '', touched: '' }}
                        onValueChange={({ value }) => { onChangePageLimit(value) }}
                        options={pageData}
                    />
                </div>}
                <div className='mt-3 col-sm'>
                    <ReactPaginate
                        forcePage={currentPage - 1}
                        previousLabel={previousLabel}
                        nextLabel={nextLabel}
                        breakLabel={breakLabel}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(totalPages / limit)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        onPageChange={onPageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    )
}