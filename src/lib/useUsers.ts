import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

export type User = {
  id: number;
  name: string;
  email: string;
  dob: string;
};

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editId) {
      await supabase
        .from("first-supabase")
        .update({ name, email, dob })
        .eq("id", editId);
      setEditId(null);
    } else {
      await supabase.from("first-supabase").insert([{ name, email, dob }]);
    }
    setName("");
    setEmail("");
    setDob("");
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditId(user.id);
    setName(user.name);
    setEmail(user.email);
    setDob(user.dob);
  };

  const handleDelete = async (id: number) => {
    await supabase.from("first-supabase").delete().eq("id", id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return {
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
  };
}
