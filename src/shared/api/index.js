const SERVER_URL = 'https://api.getcollyde.com'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/admin/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    EXPORT_CSV: SERVER_URL + API_VERSION + '/watchParty/importArray',
    WATCH_PARTY_LISTING: SERVER_URL + API_VERSION + '/watchParty/listing',
    UPDATE_WATCH_PARTY: SERVER_URL + API_VERSION + '/watchParty/edit',
    GET_LEAGUES: SERVER_URL + API_VERSION + '/league/getAllLeagues',
    GET_PLATFORMS: SERVER_URL + API_VERSION + '/platform/getAllPlatforms',
    GET_SPORTS: SERVER_URL + API_VERSION + '/sports/getAllSports',
    ADD_WATCH_PARTY: SERVER_URL + API_VERSION + '/watchParty/add',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/admin/forgot-password',
    RESET_PASSWORD: SERVER_URL + API_VERSION + '/admin/reset-password',
    UPLOAD_IMAGE: SERVER_URL + API_VERSION + '/uploadFile',
  }
};