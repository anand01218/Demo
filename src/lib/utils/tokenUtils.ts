import Cookies from "js-cookie";

export const setToken = (token: string): void => {
  // Set both for compatibility
  Cookies.set("token", token, { expires: 1, sameSite: "strict" });
  Cookies.set("access_token", token, { expires: 1, sameSite: "strict" });
};

export const getToken = (): string | null => {
  // Try multiple approaches
  const jsToken = Cookies.get("access_token") || Cookies.get("token");

  if (jsToken) {
    return jsToken;
  }

  // Manual parsing for HTTP-only cookies
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("access_token=")
    );
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
  }

  return null;
};

export const removeToken = (): void => {
  Cookies.remove("access_token");
  Cookies.remove("token");
};
