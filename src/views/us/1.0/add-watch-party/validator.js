const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX } = require(`../../../../shared/constants`)

const validator = values => {
    const errors = {};
    if (!values[STRINGS.SHOW_NAME]) {
        errors[STRINGS.SHOW_NAME] =
            VALIDATION_MESSAGES.SHOW_NAME_REQUIRED;
    }
    if (!values[STRINGS.HOST_NAME]) {
        errors[STRINGS.HOST_NAME] =
            VALIDATION_MESSAGES.HOST_REQUIRED;
    }
    if (!values[STRINGS.PLATFORM_NAME]) {
        errors[STRINGS.PLATFORM_NAME] =
            VALIDATION_MESSAGES.PLATFORM_REQUIRED;
    }
    if (!values[STRINGS.CONTENT_LENGTH]) {
        errors[STRINGS.CONTENT_LENGTH] =
            VALIDATION_MESSAGES.CONTENT_REQUIRED;
    }
    if (!values[STRINGS.LEAGUE_NAME]) {
        errors[STRINGS.LEAGUE_NAME] =
            VALIDATION_MESSAGES.LEAGUE_REQUIRED;
    }
    if (!values[STRINGS.SPORTS_NAME]) {
        errors[STRINGS.SPORTS_NAME] =
            VALIDATION_MESSAGES.SPORTS_REQUIRED;
    }
    if (!values[STRINGS.PICK_DATE]) {
        errors[STRINGS.PICK_DATE] =
            VALIDATION_MESSAGES.DATE_REQUIRED;
    }
    if (!values[STRINGS.END_TIME]) {
        errors[STRINGS.END_TIME] =
            VALIDATION_MESSAGES.END_TIME_REQUIRED;
    }
    if (!values[STRINGS.START_TIME]) {
        errors[STRINGS.START_TIME] =
            VALIDATION_MESSAGES.START_TIME_REQUIRED;
    }
    return errors;
};

export default validator;