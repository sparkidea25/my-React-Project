import React, { useState, useEffect } from "react";

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
// import FloatingLabelInput from 'react-floating-label-input';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './style.scss';
import moment from "moment";

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
    dateValue,
    dob,
    placeholder = 'DOB',
    format = 'dd/MM/yyyy'
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateSelected, setDateSelected] = useState()
    const { onChange, value: inputValue } = input
    if (config && config.value) {
        const { value: configValue } = config
    }
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;





    return (
        <div className="form-group">
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
                        format={format}
                        minDate={minDate && new Date(minDate)}
                        maxDate={maxDate && new Date(maxDate)}
                        disabled={disabled}
                        value={input.value}
                        style={{ display: "none" }}

                        placeholder={placeholder}
                        KeyboardButtonProps={{ disabled: true, style: { display: "none" } }}

                        InputProps={{
                            disabled: true,
                            style: { color: 'black', display: "none" },
                            onClick: () => {
                                setOpenCalendar(true)
                            }
                        }}
                        onClick={() => {
                            setOpenCalendar(true)
                        }}
                        onClose={() => { setOpenCalendar(false) }}
                        open={openCalendar}
                        {...config}
                    />
                    <TextField
                        id={placeholder}
                        label={placeholder}
                        onClick={() => setOpenCalendar(true)}
                        onChange={() => setOpenCalendar(true)}
                        value={(!!input && !!input.value) ? moment(input.value).format("DD/MM/YYYY") : !!config && !!config.value ? moment(config.value).format("DD/MM/YYYY") : ''}
                        autoComplete='off'
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            {validationSpan}
        </div>
    );
}; 