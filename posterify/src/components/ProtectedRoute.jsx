import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (isChecking) {
    return (
      <main className="page">
        <p>로그인 상태를 확인하고 있어요...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;