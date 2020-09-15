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
    selectedValue = '',
    radioGroupItems = [],
    defaultValue = 1,
    handleValueChange = () => { },
    // text, config, input, meta: { touched, error }, widthStyle, index, onClick,
}) => {

    // const validationSpan =
    //     touched && error ? (
    //         <span className="error_msg text-danger">{error}</span>
    //     ) : null;
    //const style = widthStyle ? widthStyle : "col-sm-6";
    return (
        <div >
            <FormLabel component="legend">{labelText}</FormLabel>
            <RadioGroup aria-label="position" name="position" value={selectedValue} onChange={(event) => {
                console.log('event', event.target.value)
                handleValueChange(event.target.value)
            }} row>
                {
                    radioGroupItems.map((item, index) => {
                        return (
                            <FormControlLabel
                                checked={item.value === selectedValue ? true : false}
                                key={index + ''}
                                value={item.value}
                                control={<Radio color="primary" />}
                                label={item.label ? item.label : ''}
                                className="radio-group"
                                labelPlacement="end"
                            />
                        )
                    })
                }
                {/* {validationSpan} */}
            </RadioGroup>
        </div >
    );
}
export default RadioButtons;