"use client";
import { AuthProvider, useAuth } from "@/lib/authContext";
import { useUsers } from "@/lib/useUsers";
import { useEffect } from "react";

function Home() {
  const { user, loading, logout } = useAuth();
  const {
    users,
    name,
    setName,
    email,
    setEmail,
    dob,
    setDob,
    editId,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useUsers();

  if (loading) {
    return <div className="p-8 max-w-2xl mx-auto">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">Welcome to User Management</h1>
        <p className="mb-6 text-lg text-gray-600">
          Please login or register to continue.
        </p>
        <div className="flex space-x-4">
          <a
            href="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
          >
            Register
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Logout
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editId ? "Update" : "Create"} User
        </button>
      </form>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>DOB: {user.dob}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
