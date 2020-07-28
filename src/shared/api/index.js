const SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; //Live URL
const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {
  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/admin/login',
    USER_STAT: SERVER_URL + API_VERSION + '/admin/user-stats',
    USER_INFO: SERVER_URL + API_VERSION + '/admin/user-infos',
  }
};