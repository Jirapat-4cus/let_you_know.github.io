import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import StoryModePage from "./pages/StoryModePage";
import BossFightPage from "./pages/BossFightPage";
import ProfilePage from "./pages/ProfilePage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        const initialData = {
          displayName: user?.displayName || "นักเรียน",
          email: user?.email || "",
          rank: 1,
          dailyStreak: 0,
          totalPoints: 0,
          selectedCourses: [],
          progress: {},
          achievements: [],
          createdAt: new Date(),
          lastActive: new Date(),
        };
        await setDoc(doc(db, "users", uid), initialData);
        setUserData(initialData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateUserData = async (updates) => {
    if (!user) return;

    try {
      const updatedData = { ...userData, ...updates, lastActive: new Date() };
      await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
      setUserData(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage("home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    const pageProps = {
      user,
      userData,
      updateUserData,
      setCurrentPage,
    };

    switch (currentPage) {
      case "home":
        return <HomePage {...pageProps} />;
      case "courses":
        return <CoursesPage {...pageProps} />;
      case "story":
        return <StoryModePage {...pageProps} />;
      case "boss":
        return <BossFightPage {...pageProps} />;
      case "profile":
        return <ProfilePage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          userData={userData}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
