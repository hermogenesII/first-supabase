"use client";
import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

type User = {
  id: number;
  name: string;
  email: string;
  dob: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch Users
  const fetchUsers = async () => {
    const { data } = await supabase
      .from("first-supabase")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers(data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create or Update User
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editId) {
      // Update User
      await supabase
        .from("first-supabase")
        .update({ name, email, dob })
        .eq("id", editId);
      setEditId(null);
    } else {
      // Create New User
      await supabase.from("first-supabase").insert([{ name, email, dob }]);
    }

    setName("");
    setEmail("");
    setDob("");
    fetchUsers();
  };

  // Edit User
  const handleEdit = (user: User) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setDob(user.dob);
  };

  // Delete User
  const handleDelete = async (id: number) => {
    await supabase.from("first-supabase").delete().eq("id", id);
    console.log(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
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
                className="px-2 py-1 bg-yellow-400 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
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
