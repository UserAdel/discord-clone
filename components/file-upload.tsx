"use Client";
import { Divide, FileIcon, X } from "lucide-react";
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
  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 ">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noonpener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
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
