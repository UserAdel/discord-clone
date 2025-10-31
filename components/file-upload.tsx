"use Client";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
// import "@uploadthing/react/styles.css";
import Image from "next/image";
interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  onChange: (url: string) => void;
  value: string;
  disabled?: boolean;
}
export const FileUpload = ({
  endpoint,
  onChange,
  value,
  disabled,
}: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="Upload"
          fill
          className="rounded-full"
          sizes="80px"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      //   onUploadProgress={(progress) => {
      //     console.log(progress);
      //   }}
    />
  );
};
