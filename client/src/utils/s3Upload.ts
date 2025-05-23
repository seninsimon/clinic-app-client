// utils/s3Upload.ts
import axiosInstance from "../api/axiosInterceptor";


export const uploadToS3 = async (file: File, folder: string): Promise<string> => {
  const { data } = await axiosInstance.post("/s3/generate-presigned-url", {
    fileType: file.type,
    folder,
  });

  await fetch(data.url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${data.key}`;
  return s3Url;
};
