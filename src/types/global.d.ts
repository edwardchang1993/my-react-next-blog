import type { GoogleLoginCallbackParamType } from "@/context/GoogleAuthContext/types";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            auto_select: boolean;
            callback: (response: GoogleLoginCallbackParamType) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: string;
              size: string;
              type: string;
              shape: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export {};
