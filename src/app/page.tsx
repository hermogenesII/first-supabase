"use client";
import { AuthProvider, useAuth } from "@/lib/authContext";
import { useUsers } from "@/lib/useUsers";
import { useEffect, useState } from "react";
import PostHeader from "@/components/PostHeader";

function Home() {
  const { user, loading, logout } = useAuth();
  const {
    users: posts,
    name: title,
    setName: setTitle,
    email: content,
    setEmail: setContent,
    dob,
    setDob,
    editId,
    handleSubmit: handlePostSubmit,
    handleEdit,
    handleDelete,
  } = useUsers();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  function getRelativeTime(dateString: string) {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin === 1) return "1 minute ago";
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour === 1) return "1 hour ago";
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay === 1) return "1 day ago";
    if (diffDay <= 7) return `${diffDay} days ago`;
    // More than 7 days: show date
    return date.toLocaleDateString();
  }

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
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => (window.location.href = "/create-post")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create New Post
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="relative p-4 bg-gray-100 rounded shadow">
            <div className="flex items-start justify-between">
              <PostHeader
                avatar="/file.svg"
                username={"Anonymous"}
                createdAt={
                  post.created_at ? getRelativeTime(post.created_at) : ""
                }
                title={post.title}
              />
              {/* Kebab menu icon */}
              <div className="ml-2 relative">
                <button
                  aria-label="Post options"
                  className="p-2 rounded hover:bg-gray-200 focus:outline-none"
                  tabIndex={0}
                  onClick={() =>
                    setOpenMenuId(openMenuId === post.id ? null : post.id)
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-600"
                  >
                    <circle cx="12" cy="6" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="18" r="1.5" />
                  </svg>
                </button>
                {openMenuId === post.id &&
                  (user && post.user_id === user.id ? (
                    <div className="absolute right-10 top-0 bg-white border rounded shadow p-2 z-10 flex flex-col min-w-[120px]">
                      <button
                        onClick={() => {
                          handleEdit(post);
                          setOpenMenuId(null);
                        }}
                        className="px-3 py-1 text-sm text-yellow-700 hover:bg-yellow-100 rounded text-left flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6v-6l9.293-9.293a1 1 0 00-1.414-1.414L9 13.586V21z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(post.id);
                          setOpenMenuId(null);
                        }}
                        className="px-3 py-1 text-sm text-red-700 hover:bg-red-100 rounded text-left flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="absolute right-10 top-0 bg-white border rounded shadow p-2 z-10 flex flex-col min-w-[120px]">
                      <button
                        onClick={() => {
                          // TODO: Implement report logic
                          alert("Reported!");
                          setOpenMenuId(null);
                        }}
                        className="px-3 py-1 text-sm text-red-700 hover:bg-red-100 rounded text-left flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 5.636l-1.414-1.414A2 2 0 0015.536 4H8.464a2 2 0 00-1.414.586L5.636 5.636A2 2 0 005 7.05v9.9a2 2 0 00.586 1.414l1.414 1.414A2 2 0 008.464 20h7.072a2 2 0 001.414-.586l1.414-1.414A2 2 0 0020 16.95v-9.9a2 2 0 00-.586-1.414zM12 8v4m0 4h.01"
                          />
                        </svg>
                        Report
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {/* Social actions */}
            <div className="flex items-center gap-4 mt-4 border-t pt-3">
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 focus:outline-none"
                aria-label="Like"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 9V5a3 3 0 00-6 0v4M5 15h14l-1.405-5.618A2 2 0 0015.664 8H8.336a2 2 0 00-1.931 1.382L5 15zm0 0v2a2 2 0 002 2h10a2 2 0 002-2v-2"
                  />
                </svg>
                <span className="text-sm">Like</span>
              </button>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-green-600 focus:outline-none"
                aria-label="Comment"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm">Comment</span>
              </button>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-purple-600 focus:outline-none"
                aria-label="Share"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8a3 3 0 10-6 0 3 3 0 006 0zm6 8a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
