"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="settings-page">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Account</h2>

        <div className="settings-item">
          <span>Email</span>
          <span>{user?.email || "Not signed in"}</span>
        </div>
      </section>

      <section className="settings-section">
        <h2>Subscription</h2>

        <div className="settings-item">
          <span>Plan</span>
          <span>Free</span>
        </div>
      </section>
    </main>
  );
}