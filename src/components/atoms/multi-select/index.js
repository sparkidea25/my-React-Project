import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import './style.scss'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const MultipleSelect = ({
    dataItems = [],
    labelText,
    dropDataSet = () => { }
}) => {
    const classes = useStyles();
    const [userTypes, setUserType] = useState([dataItems[0].label]);
    const [selectedValue, setSelectedValues] = useState([dataItems[0].value])

    const handleChangeMultiple = event => {
        let temp = [...userTypes];
        let tempValues = [...selectedValue];
        let value = event.target.value[event.target.value.length - 1];
        if (userTypes.includes(dataItems[value - 1].label)) {
            temp.splice(temp.indexOf(dataItems[value - 1].label), 1);
            tempValues.splice(tempValues.indexOf(dataItems[value - 1].value), 1);
        }
        else {
            temp.push(dataItems[value - 1].label);
            tempValues.push(dataItems[value - 1].value);
        }
        setUserType(temp);
        setSelectedValues(tempValues);
        dropDataSet(tempValues.includes(1) ? [] : tempValues)
    };

    return (
        <div className={'drop-down arrow_after'}>
            <label>{labelText}</label>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={userTypes}
                    onChange={handleChangeMultiple}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {dataItems.map((item, index) => {
                        return (
                            <MenuItem key={item.label} value={item.value}>
                                <Checkbox checked={userTypes.includes(item.label)}
                                />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    );
}