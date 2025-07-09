// utils/s3Upload.ts
import axiosInstance from "../api/axiosInterceptor";


export const uploadToS3 = async (file: File, folder: string): Promise<string> => {
  if (!file || !folder) {
    throw new Error("File and folder are required.");
  }

  try {
    // Step 1: Get pre-signed URL from backend
    const { data } = await axiosInstance.post("api/s3/generate-presigned-url", {
      fileType: file.type,
      folder,
    });

    const { url, key }: { url: string; key: string } = data;

    // Step 2: Upload the file to S3 using the signed URL
    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    console.log("📦 S3 upload status:", uploadRes.status);

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error("❌ Upload failed:", errorText);
      throw new Error("Failed to upload to S3");
    }

    // Step 3: Return final S3 public URL
    const s3Url = `https://online-clinic-uploads.s3.ap-south-1.amazonaws.com/${key}`;
    console.log("✅ Uploaded S3 URL:", s3Url);

    return s3Url;
  } catch (error: any) {
    console.error("🔴 Error uploading to S3:", error.message || error);
    throw error;
  }
};