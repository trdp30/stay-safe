import "./App.less";
import store from "./store";
import { Provider } from "react-redux";
import Navigation from "./navigation";
// import firebase from "firebase/app";
import { toast } from "react-toastify";

toast.configure({
  position: "top-right"
});

// if (process.env.NODE_ENV !== "development") {
//   firebase.initializeApp(firebaseConfig);
// }

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
