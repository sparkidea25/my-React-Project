const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { diff_minutes, calculateCurrentTimeInEst } = require(`../../../../helpers`);
const { VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX } = require(`../../../../shared/constants`)

const validator = values => {
    var errors = {};
    var currentTime = calculateCurrentTimeInEst()
    const partyArrayErrors = [];

    values && values.WatchParty && values.WatchParty.forEach((party, partyIndex) => {
        const partyErrors = {};

        if (!party || !party.contentName) {
            partyErrors.contentName = VALIDATION_MESSAGES.SHOW_NAME_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        } else if (!NAME_REGX.test(party.contentName)) {
            partyErrors.contentName = VALIDATION_MESSAGES.NAME_VALIDATION
            partyArrayErrors[partyIndex] = partyErrors
        }
        // if (!party.host) {
        //     partyErrors.host = VALIDATION_MESSAGES.HOST_REQUIRED
        //     partyArrayErrors[partyIndex] = partyErrors
        // }
        //  else
          if (!NAME_REGX.test(party.host)) {
            partyErrors.host = VALIDATION_MESSAGES.NAME_VALIDATION
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.sports) {
            partyErrors.sports = VALIDATION_MESSAGES.SPORTS_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (party.sports &&  party.sports.value && !party.league) {
            partyErrors.league = VALIDATION_MESSAGES.LEAGUE_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.platform) {
            partyErrors.platform = VALIDATION_MESSAGES.PLATFORM_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.startTime) {
            partyErrors.startTime = VALIDATION_MESSAGES.START_TIME_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.endTime) {
            partyErrors.endTime = VALIDATION_MESSAGES.END_TIME_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (party.startTime && party.endTime) {

            let timediff = diff_minutes(new Date(party.startTime), new Date(party.endTime))

            if (new Date(party.endTime) < new Date(party.startTime)) {
                partyErrors.endTime = VALIDATION_MESSAGES.START_TIME_SHOULD_BE_AHEAD;
                partyArrayErrors[partyIndex] = partyErrors
            } else if (timediff == 0) {
                partyErrors.endTime = VALIDATION_MESSAGES.SAME_TIME_VALIDATION;
                partyArrayErrors[partyIndex] = partyErrors
            }
        }
        if (party.startTime) {
            let pickedTime = party.startTime
            if (new Date(pickedTime) < new Date(currentTime)) {
                partyErrors.startTime = VALIDATION_MESSAGES.TIME_SHOUDLD_NOT_BE_IN_PAST;
                partyArrayErrors[partyIndex] = partyErrors
            }
        }
        if (party.endTime) {
            let pickedTime = party.endTime
            if (new Date(pickedTime) < new Date(currentTime)) {
                partyErrors.endTime = VALIDATION_MESSAGES.END_TIME_SHOUDLD_NOT_BE_IN_PAST;
                partyArrayErrors[partyIndex] = partyErrors
            }
        }
        if (!party.startTime && party.endTime) {
            partyErrors.endTime =
                VALIDATION_MESSAGES.SELECT_START_TIME_FIRST;
            partyArrayErrors[partyIndex] = partyErrors
        }

    })

    if (partyArrayErrors.length) {
        errors.WatchParty = partyArrayErrors;
    }

    return errors
};

export default validator;