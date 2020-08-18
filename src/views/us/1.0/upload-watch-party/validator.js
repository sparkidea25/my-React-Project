const { STRINGS } = require(`../../../../shared/constants/us/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX } = require(`../../../../shared/constants`)

const validator = values => {
    var errors = {};

    const partyArrayErrors = [];
    values && values.WatchParty && values.WatchParty.forEach((party, partyIndex) => {
        const partyErrors = {};

        if (!party || !party.show) {
            partyErrors.show = VALIDATION_MESSAGES.SHOW_NAME_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.host) {
            partyErrors.host = VALIDATION_MESSAGES.HOST_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.sports) {
            partyErrors.sports = VALIDATION_MESSAGES.SPORTS_REQUIRED
            partyArrayErrors[partyIndex] = partyErrors
        }
        if (!party.league) {
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
        // if (!party.contentLength) {
        //     partyErrors.contentLength = VALIDATION_MESSAGES.CONTENT_REQUIRED
        //     partyArrayErrors[partyIndex] = partyErrors
        // }
    })
    console.log(partyArrayErrors, 'partyArrayErrors')
    if (partyArrayErrors.length) {
        errors.WatchParty = partyArrayErrors;
    }
    return errors
};

export default validator;