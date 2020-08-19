const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, PASSWORD_LENGTH } = require(`../../../../shared/constants`)

const validator = values => {
    const errors = {};
    if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else {
        if (values[STRINGS.PASSWORD_INPUT_NAME].length < PASSWORD_LENGTH) {
            errors[STRINGS.PASSWORD_INPUT_NAME] =
                VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
        }
    }

    return errors;
};

export default validator;