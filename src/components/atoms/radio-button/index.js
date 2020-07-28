import React from 'react';
import {
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel
} from '@material-ui/core';
import './styles.scss'


export const RadioButtons = ({
    labelText = '',
    selectedValue = 1,
    radioGroupItems = [],
    defaultValue = 1,
    handleValueChange = () => { },
    text, config, input, meta: { touched, error }, widthStyle, index, onClick,
}) => {
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    const style = widthStyle ? widthStyle : "col-sm-6";
    return (
        <div className={style}>
            <FormLabel component="legend">{labelText}</FormLabel>
            <RadioGroup aria-label="position" name="position" value={selectedValue} onChange={(event) => handleValueChange(Number(event.target.value))} row>
                {
                    radioGroupItems.map((item, index) => {
                        return (
                            <FormControlLabel
                                checked={index === selectedValue ? true : false}
                                key={index + ''}
                                value={item.value}
                                control={<Radio color="primary" />}
                                label={item.label ? item.label : ''}
                                className="form-group"
                                labelPlacement="end"
                            />
                        )
                    })
                }
                {validationSpan}
            </RadioGroup>
        </div>
    );
}
export default RadioButtons;