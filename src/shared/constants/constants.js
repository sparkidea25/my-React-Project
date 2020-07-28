import { ROUTES } from "./routes";
export const SUB_ADMIN_PLATFORM = 7;

export const EMAIL_REGX = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGX = /^[A-Z.a-z ]+$/;
export const LABELS = {
  // login: STRINGS.LOGIN,
};

export const PAGE_TITLES = {
  // dashboard: STRINGS.DASHBOARD_PAGE_TITLE,

}

export const KEY_CODES = {
  enterKey: 13,
  nine: 57,
  zero: 48,
  backSpace: 8
};

export const VALIDATION_MESSAGES = {
  // EMAIL_REQUIRED: STRINGS.EMAIL_REQUIRED,
 
};

export const MESSAGES = {
  // noRecordsFound: STRINGS.NO_RECORDS_FOUND,
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

export const LIMITS = {
  userTable: 5,
  paginationPageCount: 1
};


export const TEST_PAGE_TAB_VALUES = {
  questionsTab: 0,
  createTestTab: 1
};


