import app from 'firebase/app'
import 'firebase/firestore'

// The followings are the public information for web.
const firebaseConfig = {
  apiKey: "AIzaSyDeBnecC6HKxfhk7I3gpZhj06DFvPft44o",
  authDomain: "ec-elasticsearch-1-h0fknzje.firebaseapp.com",
  projectId: "ec-elasticsearch-1-h0fknzje",
  storageBucket: "ec-elasticsearch-1-h0fknzje.appspot.com",
  messagingSenderId: "463736126752",
  appId: "1:463736126752:web:bf599e25a4f58de9582b45"
}

// It's not the best approach because Firebase should only be initialized one.
// Please see the 'PROVIDE FIREBASE IN REACT' section.
// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.db = app.firestore()
  }

  printInformationOfAllSampleItems = () => {
    this.db.collection("sampleItems").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`)
      })
    })
  }
}

export default Firebase
