import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import './styles.scss';
const { CustomTable } = require(`../../atoms/custom-table`);
const { CustomDropdown } = require(`../../atoms/drop-down`);
const { CustomPagination } = require(`../../atoms/pagination`);

export const TestQuestionTable = ({
    textSearchLabel,
    imgSrc,
    roleDropdownLabel,
    TABLE_ARROW_DOWN,
    ROLE_LABELS,
    columns,
    INFO_ICON,
    textFieldValue,
    roleDropdownOption,
    paginationLengthLabel,
    paginationLength,
    tabValue,
    tableData,
    apiData,
    noRecordsFound,
    onPaginationLengthChange,
    paginationLengthDataItems,
    onPageChange,
    currentPage,
    sortByKey,
    sortType,
    setSortKey,
    setRoleSelected
}) => {
    return (
        <div className='test-question-table-container'>
            {tabValue == 0 && <div className="table_filter">
                <div className="form-row table-listing">
                    <div className='col-md-3'>
                        <div className='table-search'>
                            <TextField
                                className='text-field'
                                label={textSearchLabel}
                                type="text"
                                value={textFieldValue}
                                placeholder={'Search'}
                                onChange={e => {
                                    apiData({ searchString: e.target.value })
                                }}
                            />
                            <i><img className='search-icon' src={imgSrc} alt={''} /></i>
                        </div>
                    </div>
                    <div className={'col-md-9'}>
                        <div className={'d-flex justify-content-between justify-content-md-end select_multi'}>
                            <CustomDropdown
                                labelText={roleDropdownLabel}
                                dataItems={roleDropdownOption}
                                dropDataSet={(value) => {
                                    setRoleSelected(value)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>}
            <CustomTable
                rows={tableData && tableData.length ? tableData : []}
                rowsPerPage={paginationLength}
                showProfile={true}
                columns={columns}
                activePage={1}
                sortByKey={sortByKey}
                sortType={sortType}
                emptyDataMessage={noRecordsFound}
                TABLE_ARROW_DOWN={TABLE_ARROW_DOWN}
                ROLE_LABELS={ROLE_LABELS}
                INFO_ICON={INFO_ICON}
                setSortKey={setSortKey}
            />
            {tableData && tableData.data.length > 0 && <div className='text-center px-3'>
                <div className="pagi-list d-inline-flex flex-column flex-md-row">
                    <CustomDropdown
                        labelText={paginationLengthLabel}
                        dataItems={paginationLengthDataItems}
                        dropDataSet={(value) => {
                            onPaginationLengthChange(value)
                        }}
                    />
                    <CustomPagination
                        limit={paginationLength}
                        totalPages={tableData && tableData.metaData && tableData.metaData.total}
                        itemsCount={paginationLength}
                        currentPage={currentPage}
                        onPageChange={
                            (value) => {
                                onPageChange(value)
                            }
                        }
                        itemsCount={tableData && tableData.length}
                    />
                </div>
            </div>}
        </div>
    );
}

