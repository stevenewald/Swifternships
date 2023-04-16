import ReactDOM from "react-dom/client";
import "./index.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ref, child, get} from "firebase/database";

import Hero from "@landing/Hero";
import Features from "@landing/Features";
import Team from "@landing/Team";
import FAQs from "@landing/FAQs";
import { FirebaseContext } from "@auth/FirebaseContext";
import CheckLogin from "@auth/CheckLogin";
import Login from "@auth/Login";
import StudentSignup from "@student/StudentSignup";
import Stats from "@landing/Stats";

import MyListingsPage from "Components/MyListings/MyListingsPage";
import Sidebar from "Components/Sidebar";
import JobBoardPage from "Components/JobBoard/JobBoardPage";
import EmployerSignup from "@employer/EmployerSignup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyA4jyxuftXidnBGhPBQ-XWMWvpTJeMmsfY",
  authDomain: "auth.swifternships.tech",
  databaseURL: "https://swifternships-default-rtdb.firebaseio.com",
  projectId: "swifternships",
  storageBucket: "swifternships.appspot.com",
  messagingSenderId: "838809665268",
  appId: "1:838809665268:web:21028a992190d8d319a8a1",
};

const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
var database: any;
var storage: any;

if (window.location.hostname === "localhost") {
  database = getDatabase();
  storage = getStorage();
  connectDatabaseEmulator(database, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);
  firebase.functions().useEmulator("localhost", 5001);
  firebase.auth().useEmulator("http://localhost:9099");
  if (!sessionStorage.getItem("givenWarning")) {
    alert(
      "Initializing in emulator mode. If you aren't a developer, contact support@swifternships.tech immediately."
    );
    sessionStorage.setItem("givenWarning", "true");
  }
} else {
  storage = getStorage(app);
  database = getDatabase(app);
}


function Full() {
  const [user, setUser] = useState(null);
  const [studentUser, setStudentUser] = useState(null);
  const [currTab, setCurrTab] = useState(0);
  useEffect(() => {
    if (user) {
      get(child(ref(database), "students/" + user.uid)).then((snapshot) => {
        if (snapshot.exists()) {
          setStudentUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
    }
  }, [user])
  return (
    <FirebaseContext.Provider value={{ firebase, database, storage, provider }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
                <Features />
                <Stats />
                <FAQs />
                <Team />
              </div>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/student_signup"
            element={
              <>
                <CheckLogin setUser={setUser} student={true}></CheckLogin>
                <StudentSignup user={user} newSignup={true} />
              </>
            }
          ></Route>
          <Route
            path="/employer_signup"
            element={
              <>
                <CheckLogin setUser={setUser} student={false}></CheckLogin>
                <EmployerSignup user={user} />
              </>
            }
          ></Route>
          <Route element={<Sidebar userType={"student"} studentUser={studentUser} setCurrTab={setCurrTab} currTab={currTab}/>}>
            <Route
              path="/student"
              element={
                <div>
                  <CheckLogin setUser={setUser} student={true}></CheckLogin>
                  <JobBoardPage currTab={currTab} user={user}/>
                </div>
              }
            ></Route>
            <Route
              path="/mylistings"
              element={
                <div>
                  <MyListingsPage />
                </div>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </Router>
    </FirebaseContext.Provider>
  );
}
root.render(<Full />);
