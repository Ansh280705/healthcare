"use client";

import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/blog/blog-form";
import { updateBlog } from "@/actions/blog";
import { toast } from "sonner";

export default function EditBlogClient({ blog }) {
  const router = useRouter();

  const handleUpdate = async (formData) => {
    try {
      // 🔹 Attach blog id to formData (server expects it)
      formData.append("id", blog.id);

      await updateBlog(null, formData);

      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <BlogForm
        action={handleUpdate}
        defaultValues={blog}
      />
    </div>
  );
}
