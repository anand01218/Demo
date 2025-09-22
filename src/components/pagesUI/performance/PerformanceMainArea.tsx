"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PerformanceMainArea: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to performance dashboard as default
    router.push("/performance/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">
          Redirecting to Performance Dashboard...
        </p>
      </div>
    </div>
  );
};

export default PerformanceMainArea;
