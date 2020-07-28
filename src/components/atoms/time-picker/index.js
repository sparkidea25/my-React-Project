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
    meta: { touched, error },
    config,
    minDate,
    maxDate,
    widthStyle,
    disabled = false,
    onChangeTime,
    timeValue
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [inputValue, setTimeInputValue] = useState('');
    widthStyle = widthStyle ? widthStyle : "col-md-6";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    useEffect(() => {
        setTimeInputValue(input.value)
    }, [input.value !== inputValue])
    return (
        <div className={widthStyle}>
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
                            value={input.value}
                            placeholder={'Choose Time'}
                            onChange={(value) => { if (onChangeTime) { onChangeTime(value) } }}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            InputProps={{
                                disabled: true,
                                style: { color: 'black' },
                                onClick: () => {
                                    !disabled && setOpenCalendar(true)
                                },
                                value: input.value ? moment(input.value).format("h:mm A") : ''
                            }}
                            onOpen={() => { setOpenCalendar(true) }}
                            onClose={() => { setOpenCalendar(false) }}
                            open={openCalendar}
                        />
                    </Grid>
                    {validationSpan}
                </MuiPickersUtilsProvider>
            </div>
        </div>

    );
};