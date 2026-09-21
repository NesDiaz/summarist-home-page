"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { getCurrentUserSubscriptions, Subscription } from "@invertase/firestore-stripe-payments";
import { payments } from "@/lib/stripePayments";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      try {
        const subscriptions = await getCurrentUserSubscriptions(
          payments,
          {
            status: "active",
          }
        );

        setSubscription(subscriptions[0] || null);
      } catch (error) {
        console.error("Error loading subscription:", error);
        setSubscription(null);
      }
    } else {
      setSubscription(null);
    }
  });

  return () => unsubscribe();
}, []);

  if (!user) {
    return (
      <div className="container">
        <main className="settings-page">
          <h1 className="settings__title">Settings</h1>

          <div className="settings-item">
            <span>You are not logged in.</span>

            <button type="button" onClick={() => router.push("/")}>
              Log in
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="settings-page">
        <h1 className="settings__title">Settings</h1>

        <section className="settings__plan">
          <h1 className="subscription__title">Your Subscription plan</h1>

<div className="subscription__text">
  {subscription ? (
    <span>Premium / Monthly</span>
  ) : (
    <>
      <span>Basic</span>

      <button
        type="button"
        onClick={() => router.push("/choose-plan")}
      >
        Upgrade
      </button>
    </>
  )}
</div>
        </section>

        <section className="settings__account">
          <h2 className="account__title">Account</h2>

          <div className="account__text">
            <span>Email: </span>
            <span>{user.email || "Not signed in"}</span>
          </div>
        </section>
      </main>
    </div>
  );
}