import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./navigation";
import firebase from "firebase/app";
import { toast } from "react-toastify";

toast.configure({
  position: "top-right"
});

const firebaseConfig = {
  apiKey: "AIzaSyAeDDR4XWb1jcArq9bhwbqJeTSwdwF_5l8",
  authDomain: "vaccination-center-finder.firebaseapp.com",
  projectId: "vaccination-center-finder",
  storageBucket: "vaccination-center-finder.appspot.com",
  messagingSenderId: "593770746431",
  appId: "1:593770746431:web:7b0d0f5ead7df9b007de8a",
  measurementId: "G-E5R1XWNM7J"
};

if (process.env.NODE_ENV !== "development") {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
