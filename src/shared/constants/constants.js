import { ROUTES } from "./routes";
import { STRINGS } from "./us/strings";
export const SUB_ADMIN_PLATFORM = 7;

export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z ]+$/;
export const LABELS = {
  // login: STRINGS.LOGIN,
  LIVE_UPCOMING: 'Live & Upcoming',
  PAST: 'Past'
};

export const PAGE_TITLES = {
  // dashboard: STRINGS.DASHBOARD_PAGE_TITLE,
  ADD_WATCH_PARTY: 'Add Watch Party',
  RESET_PASSWORD: 'Reset Password',
  USER_MANAGEMENT: 'User Management',
  ADD_NEW_WATCH_PARTY: 'Add New Watch Party',
  CONTENT_MANGEMENT: 'Content Management'
}

export const KEY_CODES = {
  enterKey: 13,
  nine: 57,
  zero: 48,
  backSpace: 8
};

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: STRINGS.EMAIL_REQUIRED,
  EMAIL_INVALID: STRINGS.EMAIL_INVALID,
  PASSWORD_REQUIRED: STRINGS.PASSWORD_REQUIRED,
  SHOW_NAME_REQUIRED: STRINGS.SHOW_NAME_REQUIRED,
  HOST_REQUIRED: STRINGS.HOST_REQUIRED,
  SPORTS_REQUIRED: STRINGS.SPORTS_REQUIRED,
  LEAGUE_REQUIRED: STRINGS.LEAGUE_REQUIRED,
  PLATFORM_REQUIRED: STRINGS.PLATFORM_REQUIRED,
  DATE_REQUIRED: STRINGS.DATE_REQUIRED,
  START_TIME_REQUIRED: STRINGS.START_TIME_REQUIRED,
  END_TIME_REQUIRED: STRINGS.END_TIME_REQUIRED,
  CONTENT_REQUIRED: STRINGS.CONTENT_REQUIRED,
  NAME_VALIDATION: STRINGS.NAME_VALIDATION,
  SAME_TIME_VALIDATION: STRINGS.SAME_TIME_VALIDATION,
  SELECT_START_TIME_FIRST: STRINGS.SELECT_START_TIME_FIRST,
  START_TIME_SHOULD_BE_AHEAD: STRINGS.START_TIME_SHOULD_BE_AHEAD,
  TIME_SHOUDLD_NOT_BE_IN_PAST: STRINGS.TIME_SHOUDLD_NOT_BE_IN_PAST,
  END_TIME_SHOUDLD_NOT_BE_IN_PAST: STRINGS.END_TIME_SHOUDLD_NOT_BE_IN_PAST,
  PASSWORD_MINLENGTH: STRINGS.PASSWORD_MINLENGTH,
  PCITURE_REQUIRED: STRINGS.PCITURE_REQUIRED,
  FIRST_NAME_REQUIRED: STRINGS.FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED: STRINGS.LAST_NAME_REQUIRED,
  USER_NAME_REQUIRED: STRINGS.USER_NAME_REQUIRED,
  PHONE_REQUIRED: STRINGS.PHONE_REQUIRED,
  ADDRESS_REQUIRED: STRINGS.ADDRESS_REQUIRED,
  TIMEZONE_REQUIRED: STRINGS.TIMEZONE_REQUIRED,
  AGE_REQUIRED: STRINGS.AGE_REQUIRED,
  AGE_VALIDATION: STRINGS.AGE_VALIDATION,
  PHONE_VALIDATION: STRINGS.PHONE_VALIDATION,
  MAX_AGE_VALIDATION: STRINGS.MAX_AGE_VALIDATION
};

export const PASSWORD_LENGTH = 6;

export const MESSAGES = {
  noAdminsFound: STRINGS.NO_ADMINS_FOUND,
  noUsersFound: STRINGS.NO_USERS_FOUND,
};

export const ALT_TEXTS = {
  companyLogo: "company-logo-image",
  topShapeImage: "top-shape-image",
  bottomShapeImage: "bottom-shape-image",
  badgeImage: "badge image",
  backArrow: "back-arrow",
  calender: "calender",
  loader: "loader"
};

export const ELEMENT_ID = {
  welcomeText: 'welcome-text',
  loginPage: 'login-page',
  loginButton: 'login-button',
  submitButton: 'submit-button',
  challengePage: 'challenge-page',
  challengesDiv: 'challenges-div',
  challengeButton: 'challenge-button',
  redirectingLink: 'redirecting-link',
  profilePage: 'profile-page',
  leaderboardPage: 'leaderboard-page',
  inputWebUrl: 'input-website-url',
  emailInput: 'email-input',
  passwordInput: 'password-input',
  challengeDetailPage: 'challenge-detail-page',
  challengeDetailDiv: 'challenge-detail-div',
  dropInput: 'drop-input',
  customInput: 'custom-input',
  default: 'default',
  name: 'name',
  email: 'email',
  date: 'date',
  role: 'role',
  action: 'action',
  status: 'status',
  active: 'active',
  createTestAction: 'createTestAction',
  endDate: 'endDate',
  startDate: 'startDate',
  championship: 'championship',
  attempt: 'totalAttempts',
  percentage: 'latestScore',
  time: 'time',
  dateTime: 'dateTime',
  questionTitle: 'question',
  questionType: 'questionType',
  testType: 'testType',
  noOfQuestions: 'noOfQuestion',
  access: 'access',
  championshipName: 'championship-name',
  ambassadorAccess: "ambassadorAccess",
  userTypeName: 'user-type-name'
};

export const STATUS_CODE = {
  successful: 200,
  unAuthorized: 401
};


export const HEADER_MENU_ITEMS = [
  {
    label: "Profile",
    routeUrl: ROUTES.PROFILE,
    onClick: changedUrl => { }
  },
  {
    label: "About Us",
    routeUrl: ROUTES.ABOUT_US,
    onClick: changedUrl => { }
  },
  {
    label: "Contact Us",
    routeUrl: ROUTES.CONTACT_US,
    onClick: changedUrl => { }
  },
  {
    label: "Privacy Policy",
    routeUrl: ROUTES.PRIVACY_POLICY,
    onClick: changedUrl => { }
  }
];


export const ROLE_KEYS = {
  driver: 2,
  pitCrew: 3,
  marshal: 4,
  media: 5,
  security: 6
};


export const ACTIVE_PAGE_STYLE = {
  backgroundColor: "white",
  color: "#18191f",
  borderColor: "#18191f",
  fontWeight: "500"
};

export const SPORTS_OPTIONS = [
  { value: 'Yes' },
  { value: 'No' }
]

export const TIME_OPTIONS = [
  { value: 'AM' },
  { value: 'PM' }
]

export const MONTH_OPTIONS = [
  { value: 'JAN' },
  { value: 'FEB' },
  { value: 'MAR' },
  { value: 'APR' },
  { value: 'MAY' },
  { value: 'JUN' },
  { value: 'JUL' },
  { value: 'AUG' },
  { value: 'SEP' },
  { value: 'OCT' },
  { value: 'NOV' },
  { value: 'DEC' },
]

export const DAY_OPTIONS = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 13 },
  { value: 14 },
  { value: 15 },
  { value: 16 },
  { value: 17 },
  { value: 18 },
  { value: 19 },
  { value: 20 },
  { value: 21 },
  { value: 22 },
  { value: 23 },
  { value: 24 },
  { value: 26 },
  { value: 27 },
  { value: 28 },
  { value: 29 },
  { value: 30 },
  { value: 31 }
]

export const pastPartyTable = [{ name: 'Show' },
{ name: 'Host' },
{ name: 'Sports' },
{ name: 'League' },
{ name: 'Platform' },
{ name: 'Month' },
{ name: 'Date' },
{ name: 'Time (EST)' },
{ name: 'End Time' },
{ name: 'Content length' },
{ name: 'Joined' },
{ name: 'Interested' }
]

export const upcomingPartyTable = [{ name: 'Show' },
{ name: 'Host' },
{ name: 'Sports' },
{ name: 'League' },
{ name: 'Platform' },
{ name: 'Date' },
{ name: 'Time (EST)' },
{ name: 'End Time' },
{ name: 'Content length' },
{ name: 'Joined' },
{ name: 'Interested' },
{ name: '' }
]

export const ADMIN_TABLE_HEADINGS = [
  { name: 'First Name' },
  { name: 'Last Name' },
  { name: 'Username' },
  { name: 'Email' },
  { name: 'Phone Number' },
  { name: 'Home Town' },
  { name: 'Time Zone' },
  { name: 'Age' },
  { name: 'Date Added' },
  { name: 'Last Active' }
]
