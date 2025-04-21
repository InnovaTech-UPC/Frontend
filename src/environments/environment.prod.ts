export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: process.env['FIREBASE_API_KEY'],
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'],
    projectId: process.env['FIREBASE_PROJECT_ID'],
    storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'],
    appId: process.env['FIREBASE_APP_ID']
  },
  baseURL: process.env['BASE_URL_PROD'],

  // URLs for the different endpoints
  userURL: process.env['USER_URL'],
  authenticationURL: process.env['AUTHENTICATION_URL'],
  advisorURL: process.env['ADVISOR_URL'],
  farmerURL: process.env['FARMER_URL'],
  profileURL: process.env['PROFILE_URL'],
  resourceURL: process.env['RESOURCE_URL'],
  appointmentURL: process.env['APPOINTMENT_URL'],
  expenseURL: process.env['EXPENSE_URL'],
  notificationURL: process.env['NOTIFICATION_URL'],
  postURL: process.env['POST_URL'],
  animalURL: process.env['ANIMAL_URL'],
  enclosureURL: process.env['ENCLOSURE_URL'],
  reviewURL: process.env['REVIEW_URL'],
  availableDateURL: process.env['AVAILABLE_DATE_URL']
};
