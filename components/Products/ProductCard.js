import React from "react";
import ProductRating from "./ProductRating";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductCard = ({ product, showEditProductModal, onClick }) => {
  const router = useRouter();
  const { data } = useSession();
  const deleteContent = (e) => {
    e.stopPropagation();
    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAPI();
      }
    });
  };

  const deleteAPI = async () => {
    const res = await axios
      .delete(`/api/product?id=${product._id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          alertDeleteSuccess();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Server error! Not deleted");
      });
  };

  const alertDeleteSuccess = () => {
    Swal.fire({
      title: "Deleted",
      text: "Product Deleted successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.reload();
    });
  };

  const imageUrl = !!product.image
    ? product.image
    : "/images/products/product-default.webp";

  const calculateDiscountedPrice = () => {
    if (product.sale.type === "percentage") {
      const discountAmount =
        (product.price.amount * product.sale.discount_percent) / 100;
      return product.price.amount - discountAmount;
    } else if (product.sale.type === "fixed") {
      return product.price.amount - product.sale.discount_amount;
    }
    return product.price.amount;
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    showEditProductModal(true, product._id, product);
  };

  return (
    <>
      <div
        className="single-blog-post tw-relative tw-cursor-pointer "
        onClick={onClick}
      >
        <div className="post-image product-image">
          {/* <Link href={`/product-details/${product._id}`}> */}
          <div className="relative tw-w-[178px] tw-h-[178px] tw-bg-contain">
            <Image src={imageUrl} alt={product.name} fill/>
          </div>
          {/* </Link> */}
          {!!product.sale &&
            (product.sale.type === "percentage" ||
              product.sale.type === "fixed") && (
              <div className="date">
                <span className="sale-text">
                  <strong>On Sale</strong>
                </span>
              </div>
            )}
        </div>

        <div className="post-content">
          {/* <Link href={`/product-details/${product._id}`}> */}
          <a>
            <p className="tw-line-clamp-1"> {product.name}</p>
          </a>
          {/* </Link> */}
          {!!product.price && (
            <div className="price">
              <strong>
                {product.sale
                  ? `$${calculateDiscountedPrice().toFixed(2)}`
                  : product.price.label}
              </strong>
              {!!product.sale && (
                <div>
                  <del className="sale-price">{product.price.label}</del>
                  {product.sale.type === "percentage" && (
                    <span className="sale-note">
                      {product.sale.discount_percent}% off
                    </span>
                  )}
                  {product.sale.type === "fixed" && (
                    <span className="sale-note">
                      ${product.sale.discount_amount} off
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
          {!!product.review && (
            <ProductRating
              value={product.review.average_rating}
              text={product.review.review_count}
            />
          )}
        </div>
        {data?.user?.image === "SUPERADMIN" && ( // <-- Conditional rendering of delete button
          <div className="tw-flex  gap-2 tw-bottom-2 tw-right-4 tw-absolute">
            <button
              onClick={handleEditClick}
              className=" hover:tw-text-red-500 hover:tw-animate-pulse"
            >
              <AiTwotoneEdit />
            </button>
            <button
              onClick={deleteContent}
              className=" hover:tw-text-red-500 hover:tw-animate-pulse"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
