import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { IdeasList } from "./components/IdeasList";
import { AddIdea } from "./components/AddIdea";
import { SiteHeader } from "./components/SiteHeader";
import { Filters } from "./components/Filters";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "./firestore";

const auth = getAuth();
const COLLECTION = "ideas";

function App() {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);
  const [ideas, setIdeas] = useState([]);

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

  useEffect(() => {
    const fetchDocs = async (q) => {
      const snapshot = await getDocs(q);
      const ideasArray = [];
      snapshot.forEach((doc) => {
        ideasArray.push({ ...doc.data(), id: doc.id });
      });

      setIdeas(ideasArray);
    };

    let q = query(collection(db, COLLECTION), orderBy("date", "desc"));

    if (tags?.length) {
      const whereArgs = tags.map((tag) => {
        return where(`tags.${tag}`, "==", true);
      });

      q = query(q, ...whereArgs);
    }

    fetchDocs(q);
  }, [tags, setIdeas]);

  const onSelectTag = useCallback((tag) => {
    const newTags = [...tags];
    const tagIndex = newTags.indexOf(tag);

    if (tagIndex > -1) {
      newTags.splice(tagIndex, 1);
    } else {
      newTags.push(tag);
    }

    setTags(newTags);
  });

  const onIdeaAdded = useCallback(() => {
    // force update so new idea shows up in list
    setTags([...tags]);
  });

  return (
    <div className="content">
      <SiteHeader user={user} />
      {!!user && <AddIdea userId={user?.uid} onIdeaAdded={onIdeaAdded} />}
      <Filters tags={tags} onSelectTag={onSelectTag} />
      <IdeasList
        userId={user?.uid}
        ideas={ideas}
        tags={tags}
        onSelectTag={onSelectTag}
      />
    </div>
  );
}

export default App;
