const SERVER_URL = 'http://eb83cf0e4f97.ngrok.io'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/admin/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    EXPORT_CSV: SERVER_URL + API_VERSION + '/watchParty/importCsv',
    WATCH_PARTY_LISTING: SERVER_URL + API_VERSION + '/watchParty/listing',
    UPDATE_WATCH_PARTY: SERVER_URL + API_VERSION + '/watchParty/edit',
    GET_LEAGUES: SERVER_URL + API_VERSION + '/league/getAllLeagues',
    GET_PLATFORMS: SERVER_URL + API_VERSION + '/platform/getAllPlatforms',
  }
};