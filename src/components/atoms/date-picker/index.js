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

export const DatePickerInput = ({
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
    dateValue
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    widthStyle = widthStyle ? widthStyle : "col-md-12";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    return (
        <div className={widthStyle}>
            {label && <label>{label}</label>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid>
                    <KeyboardDatePicker
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
                        value={input.value}
                        allowKeyboardControl={false}
                        placeholder={'dd/mm/yyyy'}
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
                        onChange={(value) => { if (onChangeDate) { onChangeDate(value) } }}
                        onOpen={() => { setOpenCalendar(true) }}
                        onClose={() => { setOpenCalendar(false) }}
                        open={openCalendar}
                    />
                </Grid>
                {validationSpan}
            </MuiPickersUtilsProvider>
        </div>

    );
};

//className = "form-control"