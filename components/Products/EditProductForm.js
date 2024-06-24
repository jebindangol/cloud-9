import React, { Component, useContext, useState } from "react";
import Link from "../../utils/ActiveLink";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import { DataContext } from "../../pages/_app";
import ImageUploadForm from "../Common/ImageUploadFormInput";
import { useRouter } from "next/router";
import { useEffect } from "react";
const MySwal = withReactContent(Swal);

const EditProductForm = ({
  showModal,
  selectedProductId,
  selectedProductData,
}) => {
  const router = useRouter();

  const { register, handleSubmit, watch, formState, setValue } = useForm();
  const { brands, categories } = useContext(DataContext);
  const [imageUrl, setImageUrl] = useState("");

  const successContent = () => {
    MySwal.fire({
      title: "Done!",
      text: "Product Added successfully!",
      icon: "success",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.reload();
      }
    });
  };

  const errorContent = () => {
    MySwal.fire({
      title: "Error!",
      text: "An error occurred while editing the product.",
      icon: "error",
      showConfirmButton: true,
    });
  };

  const completeImageUrl = !!selectedProductData?.image
    ? selectedProductData.image
    : "/images/products/product-default.webp";

  useEffect(() => {
    if (selectedProductData) {
      setImageUrl(completeImageUrl);
      setValue("name", selectedProductData.name);
      setValue("category_id", selectedProductData.category_id);
      setValue("brand_id", selectedProductData.brand_id);
      setValue("description", selectedProductData.description);
      setValue("price", selectedProductData.price?.amount);
      setValue("store_quantity", selectedProductData.inventory.store_quantity);
      setValue("saleType", selectedProductData.sale?.type);
      setValue(
        "saleValue",
        selectedProductData.sale?.type === "percentage"
          ? selectedProductData.sale?.discount_percent
          : selectedProductData.sale?.discount_amount
      );
    }
  }, [selectedProductData, setValue]);

  const onSubmit = async (formData) => {
    let saleInfo=null;
    const saleType = formData.saleType;
  

    if (saleType === "flat") {
      saleInfo = {
        type: "fixed",
        discount_amount: formData.saleValue,
      };
    } else if (saleType === "percentage") {
      saleInfo = {
        type: "percentage",
        discount_percent: formData.saleValue,
      };
    }

    const res = await axios
      .put(
        `/api/product?id=${selectedProductId}`,
        {
          _id: selectedProductId,
          category_id: formData.category_id,
          brand_id: formData.brand_id,
          name: formData.name,
          image: imageUrl,
          price: {
            label: "$" + formData.price,
            currnecy: "USD",
            amount: formData.price,
          },
          inventory: {
            store_quantity: formData.store_quantity,
          },
          description: formData.description,
          sale: saleInfo,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        showModal(false);
        successContent();
      })
      .catch((error) => {
        console.error(error);
        errorContent();
      });
  };

  const CloseButton = () => (
    <div className=" tw-flex justify-content-end">
      <button
        className=" tw-cursor-pointer tw-text-[20px] tw-hover:tw-scale-110"
        style={{ cursor: "pointer" }}
        onClick={() => showModal(false)}
      >
        ╳
      </button>
    </div>
  );

  return (
    <div className="register-form tw-w-full tw-mt-36">
      <CloseButton />
      <h2>Edit New Product</h2>
      <p>Enter product details to edit </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group  ">
          <label>Image</label>
          {imageUrl ? (
            <div className=" tw-relative ">
              <img
                src={imageUrl || completeImageUrl}
                alt={""}
                className="tw-h-[200px] tw-w-[250px]"
              />
              <button
                className=" tw-absolute twt-top-0 tw-right-0 tw-py-2 tw-text-red-500"
                onClick={() => setImageUrl("")}
              >
                Remove
              </button>
            </div>
          ) : (
            <ImageUploadForm
              className="tw-h-fit"
              uploadedImageUrl={(res) => {
                setImageUrl(res);
              }}
            />
          )}
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input type="text" className="form-control" {...register("name")} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            id="category_id"
            {...register("category_id")}
          >
            {categories.map((category, index) => (
              <option value={category._id} key={index}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select
            className="form-control"
            id="brand_id"
            {...register("brand_id")}
          >
            {brands.map((brand, index) => (
              <option value={brand._id} key={index}>
                {brand.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            {...register("price", {
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            })}
          />
        </div>

        <div className="form-group">
          <label>Store Quantity</label>
          <input
            type="number"
            className="form-control"
            {...register("store_quantity")}
          />
        </div>

        <div className="form-group">
          <label>Sale Type</label>
          <select className="form-control" {...register("saleType")}>
            <option value="flat">Flat</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Sale Value</label>
          <input
            type="number"
            className="form-control"
            {...register("saleValue")}
            min={0}
            max={watch("saleType") === "flat" ? watch("price") - 1 : 100}
            step={0.01}
          />
        </div>

        <input
          type="submit"
          className=" tw-border-2 tw-px-4 tw-py-2 tw-rounded-lg"
        />
      </form>
    </div>
  );
};

export default EditProductForm;
