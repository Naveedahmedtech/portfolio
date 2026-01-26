import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return <>{children}</>;
};

export default ErrorBoundary;
