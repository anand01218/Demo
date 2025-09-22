"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken } from "@/lib/utils/tokenUtils";

const AuthDebug = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const cookieToken = typeof window !== "undefined" ? getToken() : null;

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg z-50 max-w-sm text-xs">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <div>
          <strong>Is Authenticated:</strong>{" "}
          {authState.isAuthenticated ? "✅" : "❌"}
        </div>
        <div>
          <strong>Is Loading:</strong> {authState.isLoading ? "🔄" : "✅"}
        </div>
        <div>
          <strong>Redux Token:</strong>{" "}
          {authState.token
            ? "✅ " + authState.token.substring(0, 20) + "..."
            : "❌ null"}
        </div>
        <div>
          <strong>Cookie Token:</strong>{" "}
          {cookieToken
            ? "✅ " + cookieToken.substring(0, 20) + "..."
            : "❌ null"}
        </div>
        <div>
          <strong>User:</strong>{" "}
          {authState.user
            ? "✅ " + (authState.user.email || authState.user.name)
            : "❌ null"}
        </div>
        <div>
          <strong>Role:</strong> {authState.role || "null"}
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
