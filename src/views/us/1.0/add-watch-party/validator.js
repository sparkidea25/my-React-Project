import moment from "moment"
const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, NAME_REGX } = require(`../../../../shared/constants`)
const { calculateCurrentTimeInEst } = require(`../../../../helpers`);

const validator = values => {
    const errors = {};

    if (!values[STRINGS.SHOW_NAME]) {
        errors[STRINGS.SHOW_NAME] =
            VALIDATION_MESSAGES.SHOW_NAME_REQUIRED;
    } else if (
        !NAME_REGX.test(
            values[STRINGS.SHOW_NAME]
        )) {
        errors[STRINGS.SHOW_NAME] = VALIDATION_MESSAGES.NAME_VALIDATION;
    }
    if (!values[STRINGS.HOST_NAME]) {
        errors[STRINGS.HOST_NAME] =
            VALIDATION_MESSAGES.HOST_REQUIRED;
    } else if (
        !NAME_REGX.test(
            values[STRINGS.HOST_NAME]
        )) {
        errors[STRINGS.HOST_NAME] = VALIDATION_MESSAGES.NAME_VALIDATION;
    }
    if (!values[STRINGS.PLATFORM_NAME]) {
        errors[STRINGS.PLATFORM_NAME] =
            VALIDATION_MESSAGES.PLATFORM_REQUIRED;
    }
    if (!values[STRINGS.LEAGUE_NAME]) {
        errors[STRINGS.LEAGUE_NAME] =
            VALIDATION_MESSAGES.LEAGUE_REQUIRED;
    }
    if (!values[STRINGS.SPORTS_NAME]) {
        errors[STRINGS.SPORTS_NAME] =
            VALIDATION_MESSAGES.SPORTS_REQUIRED;
    }

    if (!values[STRINGS.END_TIME]) {
        errors[STRINGS.END_TIME] =
            VALIDATION_MESSAGES.END_TIME_REQUIRED;
    }
    if (!values[STRINGS.START_TIME]) {
        errors[STRINGS.START_TIME] =
            VALIDATION_MESSAGES.START_TIME_REQUIRED;
    }
    if (values[STRINGS.START_TIME] && values[STRINGS.END_TIME]) {
        if (values[STRINGS.END_TIME] < values[STRINGS.START_TIME]) {
            errors[STRINGS.END_TIME] =
                VALIDATION_MESSAGES.START_TIME_SHOULD_BE_AHEAD;
        } else {

            var diff = (values[STRINGS.START_TIME].getTime() - values[STRINGS.END_TIME].getTime()) / 1000;
            diff /= 60;
            let timediff = Math.abs(Math.round(diff));

            if (timediff == 0) {
                errors[STRINGS.END_TIME] =
                    VALIDATION_MESSAGES.SAME_TIME_VALIDATION;
            }
        }
    }

    if (!values[STRINGS.START_TIME] && values[STRINGS.END_TIME]) {
        errors[STRINGS.END_TIME] =
            VALIDATION_MESSAGES.SELECT_START_TIME_FIRST;
    }
    // var localZone = moment.tz.guess();
    let currTime
    // = new Date();
    // var zoneOffset = moment.tz(new Date(), localZone).utcOffset();
    // var estOffset = moment.tz(new Date(), 'America/New_York').utcOffset();

    currTime = calculateCurrentTimeInEst()
    // currTime.setHours((currTime.getHours() - (zoneOffset / 60) + (estOffset / 60)), (currTime.getMinutes() - (zoneOffset % 60) + (estOffset % 60)), 0)
    if (values[STRINGS.START_TIME]) {
        let pickedTime = values[STRINGS.START_TIME]

        if (new Date(pickedTime) < new Date(currTime)) {
            errors[STRINGS.START_TIME] =
                VALIDATION_MESSAGES.TIME_SHOUDLD_NOT_BE_IN_PAST;
        }
    }
    if (values[STRINGS.END_TIME]) {
        let pickedTime = values[STRINGS.END_TIME]
        if (new Date(pickedTime) < new Date(currTime)) {
            errors[STRINGS.END_TIME] =
                VALIDATION_MESSAGES.END_TIME_SHOUDLD_NOT_BE_IN_PAST;
        }
    }


    return errors;
};

export default validator;