"use client";

import { useActionState, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { CloudinaryUpload } from "@/components/cloudinary-upload";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  error: null,
};

export function BlogForm({ action, defaultValues }) {
  const [state, formAction] = useActionState(action, initialState);
  const [imageUrl, setImageUrl] = useState(defaultValues?.imageUrl || "");
  const [uploaded, setUploaded] = useState(!!defaultValues?.imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Blog saved successfully");
      setIsSubmitting(false);
      router.push("/admin?tab=blogs");
    }

    if (state?.error) {
      toast.error(state.error);
      setIsSubmitting(false);
    }
  }, [state]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);       // ✅ NOW THIS RUNS
    await formAction(formData);
  };

  const handleUpload = (url) => {
    setImageUrl(url);
    setUploaded(true);
    toast.success("Image uploaded successfully!");
  };

  return (
    <form action={handleSubmit}>
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <input type="hidden" name="imageUrl" value={imageUrl} />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input
            name="title"
            placeholder="Blog title"
            defaultValue={defaultValues?.title}
            required
          />

          <Textarea
            name="excerpt"
            placeholder="Short excerpt"
            defaultValue={defaultValues?.excerpt}
          />

          <Textarea
            name="content"
            placeholder="Blog content"
            rows={12}
            defaultValue={defaultValues?.content}
          />

          <div className="flex items-center gap-2">
            <CloudinaryUpload onUpload={handleUpload} />
            {uploaded && <Check className="w-5 h-5 text-green-500" />}
          </div>

          <div className="flex items-center gap-2">
            <Switch
              name="isPublished"
              defaultChecked={defaultValues?.isPublished ?? true}
            />
            <span>Published</span>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Blog"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
