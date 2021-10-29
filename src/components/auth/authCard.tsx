import React from "react";

interface AuthCardProps {
  className?: string;
  children: any;
}

export default function AuthCard({ className, children }: AuthCardProps) {
  return (
    <div className={"auth-card " + className}>
      <div className="auth-card-body">{children}</div>
    </div>
  );
}
