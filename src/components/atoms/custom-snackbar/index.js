import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import './style.scss';
const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: 'rgb(246,194,198)',
        color: '#fff'
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    errorIcon: {
        fontSize: 20,
        color: 'white',
        fill: 'red'
    },
    successIcon: {
        fontSize: 20,
        color: 'white',
        fill: 'white'
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        color: 'red'
    },
    successMessage: {
        display: 'flex',
        alignItems: 'center',
        color: 'white'
    },
}));

export const CustomizedSnackbars = (props) => {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackbarContent
            className={classNames([classes[variant], className])}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classNames([variant === 'error' ? classes.errorMessage : classes.successMessage, 'message-text'])}>
                    <Icon style={{ fill: (variant === 'error') ? 'red' : '#fff' }} className={classNames([classes.icon, classes.iconVariant])} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classNames([variant === 'error' ? classes.errorIcon : classes.successIcon])} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}