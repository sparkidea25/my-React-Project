import React from 'react';
import moment from 'moment';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import classNames from 'classnames';
import './style.scss';
export const CustomTable = ({
    columns = [],
    rows = [],
    rowsPerPage = 5,
    activePage = 1,
    showProfile = false,
    isEvent = false,
    editAction = true,
    actionLeftText = 'Reject',
    actionRightText = 'Approve',
    TABLE_ARROW_UP,
    TABLE_ARROW_DOWN,
    ROLE_LABELS,
    emptyDataMessage,
    addContactList = [],
    sortByKey,
    sortType,
    expandRow,
    INFO_ICON,
    EDIT_ICON,
    DELETE_ICON,
    QUESTION_TYPE,
    onAccept = () => { },
    onReject = () => { },
    setSortKey = () => { },
    onRowClick = () => { },
    onEditClick = () => { },
    onDeleteClick = () => { },
    onInfoClick = () => { },
    onStatusChange = () => { },
    tableContainerStyle = {},
}) => {

    const [onEdit, setOnEdit] = React.useState(false)
    const [noOfQuestion, setNoOfQestion] = React.useState()


    return (
        <div className={classNames([tableContainerStyle, 'table-container'])}>
            <div className={"table-responsive"}>
                <Table className="table-borderless">
                    <TableHead>
                        <TableRow>
                            {columns.map((item) => {
                                if (item.id === 'name' || item.id === 'date' || item.id === 'startDate' || item.id === 'dateTime' || item.id === 'endDate' || item.id === 'championship-name' || item.id === "question" || item.id === "questionType") {
                                    return (
                                        <TableCell
                                            id={item.id + ''}
                                            key={item.id}
                                            align={item.align}
                                            style={{ minWidth: item.minWidth, backgroundColor: "transparent" }}
                                        >
                                            {item.label}
                                            {rows && rows.length > 1 && <span className="ad_arrows" onClick={() => setSortKey(item.id)}>
                                                <img
                                                    style={{ opacity: (sortByKey === item.id && sortType === 1) && '1' }}
                                                    className={classNames(['show-challenges'])}
                                                    src={TABLE_ARROW_UP} alt="" />
                                                <img
                                                    style={{ opacity: (sortByKey === item.id && sortType === -1) && '1' }}
                                                    className={classNames(['down-arrow'])}
                                                    src={TABLE_ARROW_DOWN} alt="" />
                                            </span>}
                                        </TableCell>
                                    )
                                }
                                else {
                                    return (
                                        <TableCell
                                            id={item.id + ''}
                                            key={item.id}
                                            align={item.align}
                                            style={{ minWidth: item.minWidth, backgroundColor: "transparent" }} >
                                            {item.label}
                                        </TableCell>
                                    )
                                }
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length ? rows.slice((activePage - 1) * rowsPerPage, (activePage - 1) * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                            return (
                                <React.Fragment key={`row-${rowIndex}-wrapper`}>
                                    <TableRow
                                        hover
                                        className={'table-row-data'}
                                        tabIndex={-1}
                                        id={row._id}
                                        onClick={() => { }}
                                        key={`row-${rowIndex}`}
                                    >
                                        {columns.map((column, index) => {
                                            if (column.id === 'date') {
                                                const value = row.createdAt;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {moment(new Date(value)).format('DD-MMM-YYYY')}
                                                    </TableCell>
                                                );

                                            }
                                            if (column.id === 'question') {
                                                const value = row.question;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );

                                            }
                                            if (column.id === 'user-type-name') {
                                                const value = row.value;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );

                                            }
                                            if (column.id === 'questionType') {
                                                const value = row.questionType;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align} style={{ textTransform: 'capitalize' }}>
                                                        {QUESTION_TYPE[value - 1].label}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'time') {
                                                if (!isEvent) {
                                                    const value = row.time;
                                                    return (
                                                        <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                }
                                                else {
                                                    const value = new Date(row.dateTime).toLocaleTimeString();
                                                    return (
                                                        <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                            {moment(value, 'HH:mm').format('hh:mm A')}
                                                        </TableCell>
                                                    );
                                                }
                                            }
                                            if (column.id === 'startDate') {
                                                const value = row.startDate;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {moment(new Date(value)).format('DD-MMM-YYYY')}
                                                    </TableCell>
                                                );

                                            }
                                            if (column.id === 'dateTime') {
                                                const value = row.dateTime;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {moment(new Date(value)).format('DD-MMM-YYYY')}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'championship-name') {
                                                const value = row.championshipName;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'endDate') {
                                                const value = row.endDate;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {moment(new Date(value)).format('DD-MMM-YYYY')}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'role') {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {ROLE_LABELS[value - 1]}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'createTestAction') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <div className={'user-action-div'}>
                                                            {
                                                                <React.Fragment>
                                                                    <i className={`edit-icon ${!isEvent && `mr-0`}`} onClick={() => onEditClick(row)}>
                                                                        <img src={EDIT_ICON} alt="" width={18} height={18} />
                                                                    </i>
                                                                </React.Fragment>
                                                            }
                                                        </div>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'action') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <div className={'user-action-div'}>
                                                            {editAction
                                                                ?
                                                                <React.Fragment>
                                                                    <i className={`edit-icon ${!isEvent && `mr-0`}`} onClick={() => onEditClick(row._id)}>
                                                                        <img src={EDIT_ICON} alt="" width={18} height={18} />
                                                                    </i>
                                                                    {isEvent &&
                                                                        <i className={'edit-icon'} onClick={() => onDeleteClick(row._id)}>
                                                                            <img src={DELETE_ICON} alt="" width={18} height={18} />
                                                                        </i>
                                                                    }
                                                                </React.Fragment>
                                                                : <React.Fragment>
                                                                    <button className={'reject-button'} onClick={() => onReject(row._id)}>{actionLeftText}</button>
                                                                    <button className={'accept-button'} onClick={() => onAccept(row._id)}>{actionRightText}</button>
                                                                </React.Fragment>}
                                                        </div>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === "testType") {
                                                const value = row.userRole;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {ROLE_LABELS[value - 1]}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'noOfQuestion') {
                                                const value = row.totalQuestions;
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'status') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {
                                                            row.preRegistered && !row.isCompleted ? <React.Fragment>
                                                                <label className={'invited-label'}>
                                                                    Invited
                                                            </label> <i className={'info-icon'} onClick={() => onInfoClick(row)}>
                                                                    <img src={INFO_ICON} alt="" width={12} height={12} />
                                                                </i>
                                                            </React.Fragment>
                                                                : <label>{row.approved === 2 ? 'Registered' : '-'}</label>
                                                        }
                                                    </TableCell>
                                                );
                                            }

                                            if (column.id === 'active') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <span className={'switch-button'}>
                                                            <label>
                                                                <input
                                                                    className={'toggle-button'}
                                                                    type="checkbox"
                                                                    onChange={(event) => {
                                                                        row.totalQuestions ? onStatusChange(event.target.checked, row.userRole) :
                                                                            onStatusChange(event.target.checked, row._id)
                                                                    }}
                                                                    checked={row.status}
                                                                    disabled={false}
                                                                />
                                                            </label>
                                                        </span>
                                                    </TableCell>
                                                );
                                            }
                                            if (column.id === 'access') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <span className={'switch-button'}>
                                                            <label>
                                                                <input
                                                                    className={'toggle-button'}
                                                                    type="checkbox"
                                                                    onChange={(event) => onStatusChange(event.target.checked, row._id)}
                                                                    checked={addContactList.length ? addContactList.includes(row._id) : row.emergencyAccess}
                                                                    disabled={false}
                                                                />
                                                            </label>
                                                        </span>
                                                    </TableCell>
                                                );
                                            }

                                            if (column.id === 'ambassadorAccess') {
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <span className={'switch-button'}>
                                                            <label>
                                                                <input
                                                                    className={'toggle-button'}
                                                                    type="checkbox"
                                                                    onChange={
                                                                        (event) => onStatusChange(event.target.checked, row._id, rowIndex)
                                                                    }
                                                                    checked={row.ambassadorAccess}

                                                                />
                                                            </label>
                                                        </span>
                                                    </TableCell>
                                                );

                                            }

                                            if (column.id === 'name') {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        <div className={classNames([
                                                            'user-name',
                                                            { 'pointer': showProfile }
                                                        ])} onClick={() => onRowClick(row._id)}>
                                                            {showProfile && <i>
                                                                <img src={row.profileUrl} alt="" className={'rounded-circle'} width={50} height={50} />
                                                            </i>}
                                                            {value}
                                                        </div>
                                                    </TableCell>
                                                );
                                            }
                                            else {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={`${column.id}-${index}`} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }

                                        })}
                                    </TableRow>
                                    {
                                        expandRow && <TableRow>
                                            <TableCell colSpan={'4'} className="pt-0">
                                                <div className="total_attempts">
                                                    {row.tests.length ? <div className="row">
                                                        {row.tests.map((item, index) => {
                                                            return (
                                                                <div className="col-md-12">
                                                                    <span>{`Attempt ${item.attempt}`} </span>
                                                                    <span>  {`${item.percentage}%`} </span>
                                                                </div>
                                                            )
                                                        }
                                                        )}
                                                    </div> :
                                                        <div className="row">
                                                            <div className="col-md-12 text-center">
                                                                <span>{`User has not given any attempts for this championship.`} </span>
                                                            </div></div>}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </React.Fragment>
                            );
                        })
                            :
                            <TableRow>
                                <TableCell colSpan={5} align={'center'}>
                                    {emptyDataMessage}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
        </div >

    )
}