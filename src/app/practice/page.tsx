"use client";

import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  dob: string;
};

export default function Practice() {
  const [users, setUsers] = useState<User[]>([]);

  //Fetch Users from the database
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

  //Create or Update User
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return users.length > 0 ? users : "No users found";
}
