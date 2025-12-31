"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useCredits } from "@/context/CreditsContext";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const plans = [
  { id: "BASIC", price: 300, credits: 1 },
  { id: "STANDARD", price: 600, credits: 2, popular: true },
  { id: "PREMIUM", price: 900, credits: 3 },
];

export default function Pricing() {
  const [loading, setLoading] = useState(null);
  const { setCredits } = useCredits();
  const { isSignedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // Prevent cancel toast after success
  const paymentCompletedRef = useRef(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleBuy = async (plan) => {
    // Extra safety (UI already handles login)
    if (!isSignedIn) {
      toast.error("Please sign in first", {
        description: "Login is required to purchase credits",
      });
      return;
    }

    setLoading(plan.id);
    paymentCompletedRef.current = false;

    try {
      /* ---------------- CREATE ORDER ---------------- */
      const res = await fetch("/api/razorpay/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: plan.price,
          planId: plan.id,
          credits: plan.credits,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const order = await res.json();

      /* ---------------- RAZORPAY OPTIONS ---------------- */
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "DoctorDesk",
        description: "Platform Usage Fee – DoctorDesk SaaS Subscription",

        /* ✅ PAYMENT SUCCESS */
        handler: async (response) => {
          paymentCompletedRef.current = true;

          const verifyRes = await fetch("/api/razorpay/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) {
            toast.error("Payment verification failed");
            setLoading(null);
            return;
          }

          const data = await verifyRes.json();

          if (data?.creditsAdded) {
            setCredits((prev) => prev + data.creditsAdded);
          }

          toast.success("Payment Successful 🎉", {
            description: `${data.creditsAdded} credits added to your account`,
          });

          setLoading(null);
        },

        /* ❌ USER CLOSES PAYMENT WINDOW */
        modal: {
          ondismiss: () => {
            if (!paymentCompletedRef.current) {
              toast.error("Payment cancelled", {
                description: "You closed the payment window",
              });
              setLoading(null);
            }
          },
        },

        theme: { color: "#6ba49f" },
      };

      const rzp = new window.Razorpay(options);

      /* ❌ PAYMENT FAILED */
      rzp.on("payment.failed", () => {
        if (!paymentCompletedRef.current) {
          toast.error("Payment failed", {
            description: "Please try again",
          });
          setLoading(null);
        }
      });

      rzp.open();
    } catch (err) {
      toast.error("Something went wrong", {
        description: "Unable to start payment",
      });
      setLoading(null);
    }
  };

  return (
    <div className="mt-14">
      {isMobile ? (
        // 🔹 Mobile: Swiper
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.1}
          className="pb-10"
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.id}>
              <PricingCard
                plan={plan}
                isSignedIn={isSignedIn}
                handleBuy={handleBuy}
                loading={loading}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // 🔹 Desktop: Grid
        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              plan={plan}
              key={plan.id}
              isSignedIn={isSignedIn}
              handleBuy={handleBuy}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function PricingCard({ plan, isSignedIn, handleBuy, loading }) {
  return (
    <Card
      className={`relative border-2 transition-all duration-300
        hover:-translate-y-2 hover:shadow-xl
        ${
          plan.popular
            ? "border-[#6ba49f] shadow-[#6ba49f]/30"
            : "border-[#6ba49f]/30 hover:border-[#6ba49f]"
        }`}
    >
      {plan.popular && (
        <span className="absolute top-4 right-4 flex items-center gap-1 bg-[#6ba49f] text-white text-xs px-3 py-1 rounded-full">
          <Sparkles className="h-3 w-3" /> Most Popular
        </span>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-xl">{plan.id}</CardTitle>
        <p className="text-4xl font-extrabold mt-2">₹{plan.price}</p>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <Check className="h-4 w-4 text-[#6ba49f]" />
          {plan.credits} Credits
        </div>

        {isSignedIn ? (
          <Button
            onClick={() => handleBuy(plan)}
            disabled={loading === plan.id}
            className={`w-full btn-shine text-white ${
              plan.popular
                ? "bg-[#6ba49f] hover:bg-[#6ba49f]/90"
                : "bg-[#6ba49f]/90 hover:bg-[#6ba49f]"
            }`}
          >
            {loading === plan.id ? "Processing..." : "Buy Now"}
          </Button>
        ) : (
          <SignInButton
            mode="modal"
            forceRedirectUrl="/#pricing"
            fallbackRedirectUrl="/#pricing"
          >
            <Button
              className="w-full border-2 border-[#6ba49f] text-[#6ba49f]
                         hover:bg-[#6ba49f] hover:text-white transition"
            >
              Sign in to Buy
            </Button>
          </SignInButton>
        )}
      </CardContent>
    </Card>
  );
}
