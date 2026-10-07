import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Firebase web config is a public identifier, not a secret — safe to ship in client code.
const firebaseConfig = {
  apiKey: 'AIzaSyDtw0X3KeD5RY7n3JLfYMvnOQUtB0nt-Vw',
  authDomain: 'a-hyang.firebaseapp.com',
  projectId: 'a-hyang',
  storageBucket: 'a-hyang.firebasestorage.app',
  messagingSenderId: '1071452810122',
  appId: '1:1071452810122:web:5f7fc5d2de48363c1db673',
  measurementId: 'G-SMNNLNWGXJ',
}

export async function initAnalytics() {
  if (!['a-hyang.web.app', 'a-hyang.firebaseapp.com'].includes(window.location.hostname)) return
  const app = initializeApp(firebaseConfig)
  if (await isSupported()) getAnalytics(app)
}
