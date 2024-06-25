import { Cloud, File } from "lucide-react";
import Dropzone from "react-dropzone";

const UploadDropzone = ({ setImageUploadFormData }: any) => {
  const handleFileUpload = async (acceptedFiles: any) => {
    // const formData = new FormData();
    // formData.append("imageFileData", acceptedFiles[0]);
    setImageUploadFormData(acceptedFiles[0]);
  };

  return (
    <Dropzone multiple={false} onDrop={handleFileUpload}>
      {({ getRootProps, acceptedFiles }) => (
        <section>
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-500 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full bg-zinc-200 hover:bg-zinc-3  00">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center pt-5 pb-6 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-bold">
                      Drag and drop or click to upload
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500">PDF (upto 4MB)</p>
                </div>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="flex items-center bg-white border border-zinc-100 px-2 mx-2 max-w-xs">
                    <div>
                      <File className="h-4 w-4 text-[#ef4444]" />
                    </div>
                    <div className="p-2 text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
              </label>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadDropzone;
