"use client";

import Link from "next/link";
import { Trash, Edit, Plus, Eye, FilePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBlog } from "@/actions/blog";

export function AdminBlogs({ blogs }) {
  const [blogList, setBlogList] = useState(blogs || []);
  const hasBlogs = blogList.length > 0;

  const handleDelete = async (blogId) => {
    toast.warning("Delete this blog?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteBlog(blogId);
            setBlogList((prev) => prev.filter((b) => b.id !== blogId));
            toast.success("Blog deleted successfully!");
          } catch {
            toast.error("Failed to delete blog");
          }
        },
      },
      cancel: { label: "Cancel" },
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blogs</h2>

        {/* Show top Add Blog ONLY if blogs exist */}
        {hasBlogs && (
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            <Plus size={16} /> Add Blog
          </Link>
        )}
      </div>

      {/* Empty State */}
      {!hasBlogs ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50">
          <FilePlus className="h-10 w-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">
            No blogs yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start by creating your first blog post.
          </p>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            <Plus size={16} /> Add your first blog
          </Link>
        </div>
      ) : (
        /* Blog List */
        <div className="flex flex-col gap-4">
          {blogList.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye size={16} /> View
                </Link>

                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
                >
                  <Edit size={16} /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
