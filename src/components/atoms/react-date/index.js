import React from "react";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

export const ReactDate = ({
    value,
    onChangeDate = () => { }
}) => {


    return (
        <DatePicker
            selected={value}
            onChange={(value) => onChangeDate(value)}
            showTimeSelect
            dateFormat="Pp"
            locale="es"
        />
    );

}