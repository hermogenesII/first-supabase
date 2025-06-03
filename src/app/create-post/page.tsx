"use client";
import { useRouter } from "next/navigation";
import { useUsers } from "@/lib/useUsers";
import { useState } from "react";

export default function CreatePostPage() {
  const router = useRouter();
  const {
    name: title,
    setName: setTitle,
    email: content,
    setEmail: setContent,
    handleSubmit,
    editId,
  } = useUsers();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    setSubmitting(true);
    await handleSubmit(e);
    setSubmitting(false);
    router.push("/");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded min-h-[120px]"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={submitting}
        >
          {submitting ? "Posting..." : editId ? "Update" : "Create"} Post
        </button>
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
