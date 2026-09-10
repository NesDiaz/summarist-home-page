"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const router = useRouter();

return (
<main className="payment">
  <div className="payment__card">
    <h1>Complete your subscription</h1>

    <div className="payment__plan">
      <h2>{plan === "yearly" ? "Yearly Plan" : "Monthly Plan"}</h2>

      <p className="payment__price">
        {plan === "yearly" ? "$79.99 / year" : "$9.99 / month"}
      </p>

      {plan === "yearly" && (
        <p className="payment__trial">
          7-day free trial
        </p>
      )}
    </div>

    <button className="payment__button"
    onClick={() => router.push("/for-you")}
    >
      Subscribe
    </button>
  </div>
</main>
);
}