import React from 'react';
import './styles.scss';
import Select from '@material-ui/core/Select';
import 'react-dropdown/style.css';
export const CustomDropdown = ({
    dataItems = [],
    labelText,
    selectedData = '',
    value,
    className,
    placeholder = 'Select',
    dropDataSet = () => { },
    disable = false,
    closeAltText = 'close-button',
    openAltText = 'open-button',
    ...props
}) => {
    return (
        <div className={'drop-down'}>
            <label>{labelText}</label>
            <Select
                native
                disabled={disable}
                value={value}
                variant='outlined'
                className={className}
                size='medium'
                onChange={e => {
                    dropDataSet(e.target.value)
                }}
                inputProps={{
                    placeholder: placeholder,
                }}
            >
                {dataItems.map((item, index) => (
                    <option value={item && item.value} key={index + ''}>{item && item.label}</option>
                ))}
            </Select>
            {/* <Dropdown
                options={dataItems}
                value={value}
                disabled={disable}
                placeholder={placeholder}
                className={className}
                onChange={(e) => {
                    dropDataSet(e);
                }}
            /> */}

        </div>
    )
}