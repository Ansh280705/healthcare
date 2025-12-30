"use client";
import { useState, useEffect } from "react";

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for data
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-16 h-16 border-4 border-client border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return children;
}
