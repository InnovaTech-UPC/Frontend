export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: import.meta.env["NG_APP_FIREBASE_API_KEY"],
    authDomain: import.meta.env["NG_APP_FIREBASE_AUTH_DOMAIN"],
    projectId: import.meta.env["NG_APP_FIREBASE_PROJECT_ID"],
    storageBucket: import.meta.env["NG_APP_FIREBASE_STORAGE_BUCKET"],
    messagingSenderId: import.meta.env["NG_APP_FIREBASE_MESSAGING_SENDER_ID"],
    appId: import.meta.env["NG_APP_FIREBASE_APP_ID"]
  },
  baseURL: import.meta.env["NG_APP_BASE_URL"],
  userURL: import.meta.env["NG_APP_USER_URL"],
  authenticationURL: import.meta.env["NG_APP_AUTHENTICATION_URL"],
  advisorURL: import.meta.env["NG_APP_ADVISOR_URL"],
  farmerURL: import.meta.env["NG_APP_FARMER_URL"],
  profileURL: import.meta.env["NG_APP_PROFILE_URL"],
  resourceURL: import.meta.env["NG_APP_RESOURCE_URL"],
  appointmentURL: import.meta.env["NG_APP_APPOINTMENT_URL"],
  expenseURL: import.meta.env["NG_APP_EXPENSE_URL"],
  notificationURL: import.meta.env["NG_APP_NOTIFICATION_URL"],
  postURL: import.meta.env["NG_APP_POST_URL"],
  animalURL: import.meta.env["NG_APP_ANIMAL_URL"],
  enclosureURL: import.meta.env["NG_APP_ENCLOSURE_URL"],
  reviewURL: import.meta.env["NG_APP_REVIEW_URL"],
  availableDateURL: import.meta.env["NG_APP_AVAILABLE_DATE_URL"],
  forumPostURL: import.meta.env["NG_APP_FORUM_POST_URL"],
  forumReplyURL: import.meta.env["NG_APP_FORUM_REPLY_URL"],
  forumFavoriteURL: import.meta.env["NG_APP_FORUM_FAVORITE_URL"]
};
