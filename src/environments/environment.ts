
export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDkROrKEzexzriGwyg94vvj76NjPqewV9E",
    authDomain: "agroconnect-demo.firebaseapp.com",
    projectId: "agroconnect-demo",
    storageBucket: "agroconnect-demo.appspot.com",
    messagingSenderId: "981172916098",
    appId: "1:981172916098:web:1b8a0e8e722615fe7a499b"
  },
    baseURL: 'http://localhost:8080/api/v1', //local base url for the backend

    //urls for the different endpoints
    userURL: '/users',
    authenticationURL: '/authentication',
    advisorURL: '/advisors',
    farmerURL: '/farmers',
    profileURL: '/profiles',
    resourceURL: '/resources',
    appointmentURL: '/appointments',
    expenseURL: '/expenses',
    notificationURL: '/notifications',
    postURL: '/posts',
    animalURL: '/animals',
    cageURL: '/cages',
    reviewURL: '/reviews',
    availableDateURL: '/available_dates'
}
