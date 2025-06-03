import { useState, useEffect, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/authContext";

export type Post = {
  id: number;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
};

export function useUsers() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch Posts
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create or Update Post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (editId) {
      // Update Post
      await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", editId)
        .eq("user_id", user.id);
      setEditId(null);
    } else {
      // Create New Post
      await supabase
        .from("posts")
        .insert([{ title, content, user_id: user.id }]);
    }
    setTitle("");
    setContent("");
    fetchPosts();
  };

  // Edit Post
  const handleEdit = (post: Post) => {
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  // Delete Post
  const handleDelete = async (id: number) => {
    if (!user) return;
    await supabase.from("posts").delete().eq("id", id).eq("user_id", user.id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return {
    users: posts,
    name: title,
    setName: setTitle,
    email: content,
    setEmail: setContent,
    dob: undefined,
    setDob: undefined,
    editId,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
}
