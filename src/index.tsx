import ReactDOM from "react-dom/client";
import "./index.css";
import Hero from "@landing/Hero";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobBoardPage from "Components/JobBoard/JobBoardPage";
import MyListingsPage from "Components/MyListings/MyListingsPage";

import Sidebar from "Components/Sidebar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyA4jyxuftXidnBGhPBQ-XWMWvpTJeMmsfY",
  authDomain: "swifternships.firebaseapp.com",
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

root.render(
  <>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero />
            </div>
          }
        ></Route>

        <Route element={<Sidebar userType={"student"} />}>
          <Route
            path="/jobs"
            element={
              <div>
                <JobBoardPage />
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
        </Route>
      </Routes>
    </Router>
  </>
);
