import { useEffect, useRef } from "react";
import type { GoogleLoginButtonPropsTypes } from "./types";

export default function GoogleLoginButton(props: GoogleLoginButtonPropsTypes) {
  const buttonRef = useRef(null);

  function renderGoogleButton() {
    if (window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById(props.id),
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
  }, [buttonRef.current]);

  return <div id={props.id} ref={buttonRef} style={props.customStyle} />;
}

GoogleLoginButton.defaultProps = {
  customStyle: {},
};
