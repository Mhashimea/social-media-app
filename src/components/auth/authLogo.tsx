import React from "react";
import appLogo from "../../assets/images/logo.png";

export default function AuthLogo(props: any) {
  return (
    <div className="auth-card-header w-full">
      <div className="auth-card-logo">
        <img src={appLogo} alt="app-logo" />
      </div>
    </div>
  );
}
