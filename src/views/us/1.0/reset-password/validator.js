const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX } = require(`../../../../shared/constants`)

const validator = values => {
    const errors = {};
    if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }

    return errors;
};

export default validator;