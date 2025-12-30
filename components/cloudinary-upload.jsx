"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

export function CloudinaryUpload({ onUpload }) {
  return (
    <CldUploadWidget
      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result) => {
        onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <Button type="button" variant="outline" onClick={() => open()}>
          Upload Image
        </Button>
      )}
    </CldUploadWidget>
  );
}
