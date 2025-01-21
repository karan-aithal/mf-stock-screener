import React, { useState } from 'react';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
