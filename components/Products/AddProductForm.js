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
const MySwal = withReactContent(Swal);

const AddProductForm = ({ showModal,brandValue,brandKey }) => {
  const router = useRouter();


  const { register, handleSubmit, watch, formState } = useForm();
  const { brands, categories } = useContext(DataContext);
  const [imageUrl, setImageUrl] = useState("");
 
  

  const successContent = () => {
    MySwal.fire({
      title: "Done!",
      text: "Update successfully!",
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
      text: "An error occurred while adding the product.",
      icon: "error",
      showConfirmButton: true,
    });
  };

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
      .post(
        "/api/product",
        {
          category_id: formData.category_id,
          brand_id: formData.brand_id,
          name: formData.name,
          image: imageUrl,
          price: {
            label: formData.price ? "$" + formData.price : "",
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
      <h2>Add New Product</h2>
      <p>Enter product details to add new product</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Image</label>
          <ImageUploadForm
            className="tw-h-fit"
            uploadedImageUrl={(res) => {
              setImageUrl(res);
            }}
          />
        </div>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
          />
          {formState.errors.name && (
            <span className="tw-text-red-500 tw-text-sm">
              Product Name is required
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            id="category_id"
            {...register("category_id", { required: true })}
            defaultValue={brandKey||null}
          >
               <option value={null}></option> 
            {categories.map((category, index) => (
              <option value={category._id} key={index}>
                {category.label}
              </option>
            ))}
          </select>
          {formState.errors.category_id && (
            <span className="tw-text-red-500 tw-text-sm">
              Category is required
            </span>
          )}
        </div>

        <div className="form-group">
  <label>Brand</label>
  <select
    className="form-control"
    id="brand_id"
    {...register("brand_id")}
    defaultValue={brandValue || null}
  >
    <option value={null}></option> {/* Empty option */}
    {brands.map((brand) => (
      <option key={brand._id} value={brand._id}>
        {brand.label}
      </option>
    ))}
  </select>
  {formState.errors.brand_id && (
    <span className="tw-text-red-500 tw-text-sm">Brand is required</span>
  )}
</div>


        {/* <div className="form-group">
          <label>Brand</label>
          <select
            className="form-control"
            id="brand_id"
            {...register("brand_id", { required: true })}
          >
            {brands.map((brand, index) => (
              <option value={brand._id} key={index}>
                {brand.label}
              </option>
            ))}
          </select>
          {formState.errors.brand_id && (
            <span className="tw-text-red-500 tw-text-sm">
              Brand is required
            </span>
          )}
        </div> */}

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
          {formState.errors.price && (
            <span className="tw-text-red-500 tw-text-sm">Price is required</span>
          )}
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
          <select className="form-control" {...register("saleType")} defaultValue={null}>
            <option value={null}></option>
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

export default AddProductForm;
