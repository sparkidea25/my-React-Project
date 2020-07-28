const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX } = require(`../../../../shared/constants`)

const validator = values => {
    const errors = {};
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

    return errors;
};

export default validator;
