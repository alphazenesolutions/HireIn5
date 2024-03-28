// ErrorPage.js
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <p className="text-gray-600">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default ErrorPage;
