import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGB0BvYjzgQHPIBdCCMqbkE7P5zXlicrY",
    authDomain: "amber-movie-project.firebaseapp.com",
    projectId: "amber-movie-project",
    storageBucket: "amber-movie-project.appspot.com",
    messagingSenderId: "164824728677",
    appId: "1:164824728677:web:60ed40b85537106facf28c"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { auth }
export default db