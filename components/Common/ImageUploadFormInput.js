import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Image from "next/image";
import Swal from "sweetalert2";

const ImageUploadForm = ({ className, uploadedImageUrl, imgUrlOutside }) => {
  const errorContent = () => {
    Swal.fire({
      title: "Error!",
      text: "Image size exceeds 2MB limit.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const {
    register: _register,
    watch,
    handleSubmit: _handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const watchImage = watch("image", null);
  const [_uploadedImageUrl, _setUploadedImageUrl] = useState(null);
  const sendImageUrl = (urlPath) => {
    uploadedImageUrl(urlPath);
  };

  useEffect(() => {
  }, [_uploadedImageUrl, imgUrlOutside]);

  const onUploadImage = async (data) => {
    try {
      const file = data.image[0];
      if (file.size > 2 * 1024 * 1024) {
        setError("image", {
          type: "manual",
          message: "Image size exceeds 2MB limit",
        });
        reset({ image: null });
        errorContent();

        return;
      }
      const imgbb_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgbb_url = process.env.NEXT_PUBLIC_IMGBB_API_URL
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", imgbb_key );

      const response = await axios({
        method: "POST",
        url: imgbb_url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      _setUploadedImageUrl(response.data.data.url);
      // setTimeout(() => {
      sendImageUrl(response.data.data.url);
      // }, 10000);

      setError("image", null);
      reset({ image: null });
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("image", {
        type: "manual",
        message: "Error uploading file",
      });
    }
  };

  const UploadImageInputUI = () => (
    <>
      {!watchImage && (
        <input
          type="file"
          {..._register("image", {
            required: "Please select an image",
          })}
        />
      )}
      {errors.image && <p>{errors.image.message}</p>}
      {watchImage && (
        <div
          className=" tw-w-full tw-flex tw-justify-center tw-cursor-pointer tw-border-2 tw-rounded-lg tw-py-4"
          onClick={() => _handleSubmit(onUploadImage)()}
        >
          Upload ⬆
        </div>
      )}
    </>
  );

  const ShowImageAfterUploadUI = () => (
    <div className=" tw-relative tw-w-full tw-h-[250px]">
      <Image src={_uploadedImageUrl} layout="fill" objectFit="contain" alt={""}/>
      
    </div>
  );

  return (
    <div className={classNames(className, " tw-flex tw-justify-between")}>
      {_uploadedImageUrl && <ShowImageAfterUploadUI />}
      {!_uploadedImageUrl && <UploadImageInputUI />}
    </div>
  );
};

export default ImageUploadForm;
