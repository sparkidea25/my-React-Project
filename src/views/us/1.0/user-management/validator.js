import moment from "moment"
const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, NAME_REGX, EMAIL_REGX } = require(`../../../../shared/constants`)
const { calculateCurrentTimeInEst } = require(`../../../../helpers`);

const validator = values => {
    const errors = {};
    console.log(values)
    if (!values[STRINGS.FIRST_NAME_INPUT]) {
        errors[STRINGS.FIRST_NAME_INPUT] =
            VALIDATION_MESSAGES.FIRST_NAME_REQUIRED;
    } else if (
        !NAME_REGX.test(
            values[STRINGS.FIRST_NAME_INPUT]
        )) {
        errors[STRINGS.FIRST_NAME_INPUT] = VALIDATION_MESSAGES.NAME_VALIDATION;
    }
    if (!values[STRINGS.LAST_NAME_INPUT]) {
        errors[STRINGS.LAST_NAME_INPUT] =
            VALIDATION_MESSAGES.LAST_NAME_REQUIRED;
    } else if (
        !NAME_REGX.test(
            values[STRINGS.LAST_NAME_INPUT]
        )) {
        errors[STRINGS.LAST_NAME_INPUT] = VALIDATION_MESSAGES.NAME_VALIDATION;
    }
    if (!values[STRINGS.USERNAME_INPUT]) {
        errors[STRINGS.USERNAME_INPUT] =
            VALIDATION_MESSAGES.USER_NAME_REQUIRED;
    }
    if (!values[STRINGS.EMAIL_INPUT_NAME]) {
        errors[STRINGS.EMAIL_INPUT_NAME] =
            VALIDATION_MESSAGES.EMAIL_REQUIRED;
    } else if (
        !EMAIL_REGX.test(
            values[STRINGS.EMAIL_INPUT_NAME].toLowerCase()
        )
    ) {
        errors[STRINGS.EMAIL_INPUT_NAME] =
            VALIDATION_MESSAGES.EMAIL_INVALID;
    }
    if (!values[STRINGS.PHONE_INPUT]) {
        errors[STRINGS.PHONE_INPUT] =
            VALIDATION_MESSAGES.PHONE_REQUIRED;
    }

    if (!values[STRINGS.ADDRESS_INPUT]) {
        errors[STRINGS.ADDRESS_INPUT] =
            VALIDATION_MESSAGES.ADDRESS_REQUIRED;
    }
    if (!values[STRINGS.TIME_ZONE_INPUT]) {
        errors[STRINGS.TIME_ZONE_INPUT] =
            VALIDATION_MESSAGES.TIMEZONE_REQUIRED;
    }

    if (!values[STRINGS.AGE_INPUT]) {
        errors[STRINGS.AGE_INPUT] = VALIDATION_MESSAGES.AGE_REQUIRED;
    }

    return errors;
};

export default validator;