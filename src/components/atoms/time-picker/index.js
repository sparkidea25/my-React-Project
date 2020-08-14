import React, { useState, useEffect } from "react";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import './style.scss';

export const TimePickerInput = ({
    value,
    input,
    label,
    // meta: { touched, error },
    config,
    minDate,
    maxDate,
    minTime,
    maxTime,
    widthStyle,
    disabled = false,
    onChangeTime,
    timeValue,
    error = () => { }
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [inputValue, setTimeInputValue] = useState(value || '');

    const [errorMsg, setErrorMsg] = useState('')
    widthStyle = widthStyle ? widthStyle : "";
    const validationSpan =
        errorMsg !== '' ? (
            <span className="error_msg text-danger">{errorMsg}</span>
        ) : null;
    useEffect(() => {
        setTimeInputValue(value)
    }, [value !== inputValue])
    return (
        //<div className={widthStyle}>
        <div className="form-group">
            {label && <label>{label}</label>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardTimePicker
                        className='form-control'
                        margin="normal"
                        helperText={''}
                        error={false}
                        id="time-picker"
                        value={value}
                        placeholder={'Choose Time'}
                        // validationError={(val) => {
                        //     return <p></p>
                        // }}
                        onChange={(value) => {

                            if (onChangeTime) { onChangeTime(value) }
                            setErrorMsg('')

                        }}
                        // onChange={(value) => { if (onChangeTime) { onChangeTime(value) } }}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        InputProps={{
                            disabled: true,
                            style: { color: 'black' },
                            onClick: () => {
                                !disabled && setOpenCalendar(true)
                            },
                            //value: value ? moment(value) : ''
                        }}
                        onOpen={() => { setOpenCalendar(true) }}
                        onClose={() => { setOpenCalendar(false) }}
                        open={openCalendar}
                    />
                </Grid>
                {validationSpan}
            </MuiPickersUtilsProvider>
        </div>
        //</div>

    );
};