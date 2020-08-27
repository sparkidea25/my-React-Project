
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export const getPhoneValid = (phone) => {
    try {
        let number
        let country = 'US'
        number = phoneUtil.parseAndKeepRawInput(phone, country);
        let valid = phoneUtil.isValidNumberForRegion(number, country)
        if (valid === true) {
            return 'valid'
        } else {
            return 'invalid'
        }
    } catch (err) {
        // console.log('err')
    }
}