import React from "react";
import { File } from "lucide-react";
import Dropzone from "react-dropzone";

const UpdateImageDropzone = ({
  imageUrl,
  setImageUploadFormData,
}: {
  imageUrl?: string | null;
  setImageUploadFormData: React.Dispatch<any>;
}) => {
  const handleFileUpload = async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImageUploadFormData(file);
  };

  return (
    <Dropzone multiple={false} onDrop={handleFileUpload}>
      {({ getRootProps, acceptedFiles }) => (
        <section>
          <div
            {...getRootProps()}
            className="relative border h-64 w-64 sm:w-auto m-4 border-dashed border-gray-500 rounded-lg overflow-hidden"
          >
            {imageUrl && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            )}
            <div className="flex items-center justify-center h-full w-full bg-zinc-200 hover:bg-zinc-300">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center pt-5 pb-6 text-black"
              >
                <p className="mb-2 text-sm">
                  <span className="font-bold">
                    Drag and drop or click to upload
                  </span>
                </p>
                <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>

                {acceptedFiles && acceptedFiles[0] && (
                  <div className="flex items-center bg-white bg-opacity-25 hover:bg-opacity-50 border border-zinc-100 px-2 mx-2 max-w-xs rounded">
                    <File className="h-4 w-4 text-[#ef4444]" />
                    <div className="p-2 text-sm truncate text-white">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UpdateImageDropzone;
