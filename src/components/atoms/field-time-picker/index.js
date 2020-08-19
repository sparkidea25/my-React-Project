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

export const TimePickerInputField = ({
    value,
    input,
    label,
    meta: { touched, error },
    config,
    minDate,
    maxDate,
    minTime,
    maxTime,
    widthStyle,
    disabled = false,
    onChangeTime,
    timeValue,
    defaultValue,
    placeholder
    // error = () => { }
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [inputValue, setTimeInputValue] = useState(defaultValue || '');

    const [errorMsg, setErrorMsg] = useState('')
    widthStyle = widthStyle ? widthStyle : "";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    useEffect(() => {
        setTimeInputValue(defaultValue)
    }, [defaultValue !== inputValue])

    const copyDate = (date, time) => {
        time = time ? new Date(time) : new Date()
        date = date ? new Date(date) : new Date()
        time.setDate(date.getDate());
        time.setMonth(date.getMonth());
        time.setYear(date.getFullYear());
        console.log(time, 'check time')
        return time;
    }

    return (
        //<div className={widthStyle}>
        <div className="form-group">
            {label && <label>{label}</label>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardTimePicker
                        {...input}
                        {...config}
                        className='form-control'
                        margin="normal"
                        helperText={''}
                        error={false}
                        id="time-picker"
                        value={defaultValue}
                        placeholder={placeholder}
                        onChange={(value) => {

                            let update = copyDate(minTime, value)

                            input.onChange(update);
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