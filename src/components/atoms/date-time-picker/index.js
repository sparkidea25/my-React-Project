import { KeyboardDateTimePicker } from '@material-ui/pickers'
import React, { useState } from "react";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './style.scss';

export const KeyboardDateTimePickerr = ({
    value,
    input,
    label,
    meta: { touched, error },
    config,
    minDate,
    maxDate,
    widthStyle,
    disabled = false,
    onChangeDate,
    dateValue,
    minTime,
    placeholder,
    maxTime,
    openTo
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [err, setErr] = useState('')
    widthStyle = widthStyle ? widthStyle : "";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) :
            (err !== '') ? (
                <span className="error_msg text-danger">{err}</span>
            ) : null;
    const [dateVal, setDateVal] = useState(null)
    return (
        <>
            {label && <label>{label}</label>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardDateTimePicker
                        className='form-control'
                        {...input}
                        helperText={''}
                        error={false}
                        margin="normal"
                        autoComplete='off'
                        mask={'__/__/____'}
                        id="date-picker-dialog"
                        format='dd/MM/yyyy'
                        minDate={minDate ? minDate : new Date()}
                        disabled={disabled}
                        value={dateVal}
                        openTo={openTo}
                        allowKeyboardControl={false}
                        placeholder={placeholder}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        InputProps={{
                            disabled: true,
                            style: { color: 'black' },
                            onClick: () => {
                                !disabled && setOpenCalendar(true)
                            },

                        }}
                        onChange={(value) => {
                            if (onChangeDate) {
                                value.getTime()
                                console.log('dfdf', value, minTime)
                                if (maxTime <= value.getTime()) {
                                    setErr('')
                                }
                                else if (minTime >= value.getTime()) {
                                    setErr('Past Time cannot be selected')
                                }
                                else {
                                    onChangeDate(value)
                                    setErr('')
                                    setOpenCalendar(false)


                                    setDateVal(value)
                                }
                            }
                        }}
                        onOpen={() => { setOpenCalendar(true) }}
                        onClose={() => { setOpenCalendar(false) }}
                        open={openCalendar}
                    />

                </Grid>
                {validationSpan}
            </MuiPickersUtilsProvider>
        </>

    );
};

//className = "form-control"