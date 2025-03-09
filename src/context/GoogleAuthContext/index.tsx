"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import type {
  GoogleAuthContextType,
  GoogleLoginCallbackParamType,
  GoogleLoginCredentialJWTDecodedType,
} from "./types";

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(
  undefined
);

export function GoogleAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.google) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string;

      const callback = (response: GoogleLoginCallbackParamType) => {
        const decoded = jwtDecode(
          response.credential
        ) as GoogleLoginCredentialJWTDecodedType;
        setIsAdmin(decoded.email === "s2995510@gmail.com");
      };

      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: callback,
          auto_select: true,
        });

        window.google.accounts.id.prompt();

        setIsScriptLoaded(true);
      } else {
        setIsScriptLoaded(false);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <GoogleAuthContext.Provider value={{ isAdmin, isScriptLoaded }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);

  if (!context) {
    throw new Error("useGoogleAuth 必須在 GoogleAuthProvider 內使用");
  }

  return context;
}
