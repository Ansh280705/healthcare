// app/(main)/blog/[slug]/BlogContent.jsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { HeartIcon } from "lucide-react";
import { likeBlog } from "@/actions/blog"; // ✅ import JS server action

export default function BlogContent({ blog }) {
  const router = useRouter();
  const [likes, setLikes] = useState(blog.likes || 0);

  const handleLike = async () => {
    try {
      await likeBlog(blog.id); // call server action
      setLikes((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to like blog:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => router.push("/blog")}
        className="mb-4 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
      >
        ← Back to Blogs
      </button>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
    
{blog.imageUrl && (
  <div className="w-full overflow-hidden rounded-xl">
    <Image
      src={blog.imageUrl}
      alt={blog.title}
      width={1200}
      height={630}
      className="w-full h-auto object-contain rounded-xl"
      priority
    />
  </div>
)}

        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-400 text-sm mb-6">
            Published on {new Date(blog.createdAt).toLocaleDateString()}{" "}
            {new Date(blog.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div
            className="prose max-w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <button
            onClick={handleLike}
            className="mt-6 px-5 py-2 bg-client/40 text-white rounded-full hover:bg-client transition flex items-center gap-2"
          >
            <HeartIcon className="w-5 h-5" /> {likes}
          </button>
        </div>
      </div>
    </div>
  );
}