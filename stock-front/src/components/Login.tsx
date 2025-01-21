import React from 'react';

const Login: React.FC = () => {
  const googleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const microsoftLogin = () => {
    window.location.href = 'http://localhost:5000/auth/microsoft';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <button
        onClick={googleLogin}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4 w-64 hover:bg-red-600"
      >
        Login with Google
      </button>
      <button
        onClick={microsoftLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded w-64 hover:bg-blue-600"
      >
        Login with Microsoft
      </button>
    </div>
  );
};

export default Login;
