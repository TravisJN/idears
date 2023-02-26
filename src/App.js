import { useEffect, useState } from "react";
import "./App.css";
import { IdeasList } from "./components/IdeasList";
import { AddIdea } from "./components/AddIdea";
import { SiteHeader } from "./components/SiteHeader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, "screen_view", {
      firebase_screen: "Home",
    });

    const authListener = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // ...
      } else {
        // User is signed out
        // redirect to /login
        setUser(null);
      }
    });

    return authListener;
  }, []);

  return (
    <div className="content">
      <SiteHeader user={user} />
      {!!user && <AddIdea userId={user?.uid} />}
      <IdeasList userId={user?.uid} />
    </div>
  );
}

export default App;
