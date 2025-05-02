import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

function ProductImageupload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  // const imageFile=true
  const inputRef = useRef();
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }
  function handleImageFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  }
  function handleRemoveFile() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
     "http://localhost:5000/api/admin/products/upload-image",
      data);
      console.log(response)
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Label className="mb-2 font-semibold text-lg ">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } rounded-md cursor-pointer border-2 border-dashed `}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden "
          disabled={isEditMode}
          onChange={handleImageFileChange}
          ref={inputRef}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex justify-center items-center
          p-10  gap-2  flex-col`}
          >
            <UploadCloudIcon className="h-10 w-12" />
            <span className=""> Drag and Drop or choose file</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-14 w-72 flex items-center justify-center">
            <div className="border-t-2 border-b-2 animate-spin h-4 w-4 border-gray-700 rounded-full"></div>
          </Skeleton>
        ) : (
          <div
            className="flex gap-2 justify-center items-center
          w-full"
          >
            <div className="flex items-center">
              <FileIcon className="h-7 w-8" />
            </div>
            <p className="font-semibold">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center text-muted-foreground hover:text-foreground "
              onChange={handleRemoveFile}
            >
              <XIcon className="font-medium cursor-pointer" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
          // <div className="flex items-center justify-between">
          //     <div className="flex items-center">
          //       <FileIcon className="w-8 text-primary mr-2 h-8" />
          //     </div>
          //     <p className="text-sm font-medium">{imageFile.name} file name</p>
          //     <Button
          //       variant="ghost"
          //       size="icon"
          //       className="text-muted-foreground hover:text-foreground"
          //       // onClick={handleRemoveImage}
          //     >
          //       <XIcon className="w-4 h-4" />
          //       <span className="sr-only">Remove File</span>
          //     </Button>
          //   </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageupload;
