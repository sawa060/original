import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC4pst5olqUfvYXRHmb--Kk_4UdjCL_CQI",
    authDomain: "original-1561112293734.firebaseapp.com",
    databaseURL: "https://original-1561112293734.firebaseio.com",
    projectId: "original-1561112293734",
    storageBucket: "original-1561112293734.appspot.com",
    messagingSenderId: "805003956906",
    appId: "1:805003956906:web:03f304dd3f719494"
  })
}

export default firebase

