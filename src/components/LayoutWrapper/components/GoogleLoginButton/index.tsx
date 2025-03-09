"use client";

import { useEffect, useRef } from "react";
import type { GoogleLoginButtonPropsTypes } from "./types";

export default function GoogleLoginButton(props: GoogleLoginButtonPropsTypes) {
  const buttonRef = useRef(null);

  function renderGoogleButton() {
    if (typeof window === "undefined") {
      return;
    }

    if (window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById(props.id) as HTMLElement,
        {
          theme: "outline",
          size: "large",
          type: "icon",
          shape: "circle",
        }
      );
    }
  }

  useEffect(() => {
    if (buttonRef.current) {
      renderGoogleButton();
    }
  });

  return (
    <div
      id={props.id}
      ref={buttonRef}
      style={{ width: "40px", height: "40px", ...props.customStyle }}
    />
  );
}

GoogleLoginButton.defaultProps = {
  customStyle: {},
};
