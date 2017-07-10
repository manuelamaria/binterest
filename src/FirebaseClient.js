import firebase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_firebaseApiKey,
    authDomain: process.env.REACT_APP_firebaseAuthDomain,
    databaseURL: process.env.REACT_APP_firebaseDatabaseURL,
    projectId: process.env.REACT_APP_firebaseProjectId,
    storageBucket: process.env.REACT_APP_firebaseStorageBucket,
    messagingSenderId: process.env.REACT_APP_firebaseMessagingSenderId
}

export default firebase.initializeApp(config);
