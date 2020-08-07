const SERVER_URL = 'http://2b5048e43cd9.ngrok.io'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/admin/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    EXPORT_CSV: SERVER_URL + API_VERSION + '/watchParty/importCsv',
    WATCH_PARTY_LISTING: SERVER_URL + API_VERSION + '/watchParty/listing',
    UPDATE_WATCH_PARTY: SERVER_URL + API_VERSION + '/watchParty/edit',
  }
};