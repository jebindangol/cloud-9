import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryId } from "../../../helper/categoryHelper";
import { DataContext } from "../../../pages/_app";
import ProductPriceSelector from "./ProductPriceSelector";
import SearchBar from "./SearchBar";
import { isMobileView } from "../../../helper/windowHelper";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductSideBar({
  categoryKey,
  showAddBrandModal,
  showAddCategoryModal,
}) {
  const { brands, categories } = useContext(DataContext);
  const [showBrandList, setShowBrandList] = useState(!isMobileView());
  const [showCategoryList, setShowCategoryList] = useState(!isMobileView());
  const categoryId = !!categoryKey && getCategoryId(categoryKey, categories);
  const { data } = useSession();
  const router = useRouter();

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //  delete category API
        const res = await axios
        .delete(`/api/category?id=${id}`, {
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
      }
    });
  };
  const handleDeleteBrand = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete this brand?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //  delete Brand list API
        const res = await axios
        .delete(`/api/brand-api?id=${id}`, {
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
      }
    });
  };

  const alertDeleteSuccess = () => {
    Swal.fire({
      title: "Deleted",
      text: "Deleted successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.reload();
    });
  };

  const [activeCategoryDeleteIndex, setActiveCategoryDeleteIndex] =
    useState(null);
  const [activeBrandDeleteIndex, setActiveBrandDeleteIndex] = useState(null);

  return (
    <>
      <aside className="widget-area" id="secondary">
        <div className="widget widget_search product-search">
          <SearchBar />
        </div>
        {/* <div className="widget widget_categories">
                    <h3 className="widget-title">Price Range</h3>
                    <ProductPriceSelector />
                </div> */}
        <div className="widget widget_categories cateogry_sidebar">
          <h3
            className="widget-title"
            onClick={() => setShowCategoryList(!showCategoryList)}
          >
            Categories {showCategoryList ? `-` : `+`}
          </h3>
          {showCategoryList && (
            <ul>
              {(data?.user?.image === "SUPERADMIN") && (
                <li
                  onClick={() => showAddCategoryModal(true)}
                  className=" tw-cursor-pointer"
                >
                  ADD CATEGORY +
                </li>
              )}
              <li>
                <Link href={`/products/all`}>{`All`}</Link>
              </li>

              {categories.map((category, index) => (
                <li
                  key={index}
                  className="tw-flex gap-5 tw-items-center "
                  onMouseEnter={() => setActiveCategoryDeleteIndex(index)}
                  onMouseLeave={() => setActiveCategoryDeleteIndex(null)}
                >
                  <Link
                    activeClassName={
                      !!categoryId && category._id === categoryId
                        ? "active"
                        : ""
                    }
                    href={category.url}
                    className="tw-flex gap-5 tw-cursor-pointer"
                  >
                    {category.label}
                  </Link>
                  {(data?.user?.image === "SUPERADMIN") &&
                    activeCategoryDeleteIndex === index && (
                      <FaTrash
                        className=" tw-cursor-pointer hover:tw-text-red-500"
                        onClick={() => handleDeleteCategory(category._id)}
                      />
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="widget widget_categories cateogry_sidebar">
          <h3
            className="widget-title"
            onClick={() => setShowBrandList(!showBrandList)}
          >
            Brands {showBrandList ? `-` : `+`}
          </h3>
          {showBrandList && (
            <ul id="brands-list">
              {(data?.user?.image === "SUPERADMIN") && (
                <li
                  onClick={() => showAddBrandModal(true)}
                  className=" tw-cursor-pointer"
                >
                  ADD BRAND +
                </li>
              )}
              {brands.map((brand, index) => (
                <li
                  key={index}
                  className="tw-flex gap-5 tw-items-center "
                  onMouseEnter={() => setActiveBrandDeleteIndex(index)}
                  onMouseLeave={() => setActiveBrandDeleteIndex(null)}
                >
                  <Link
                    href={brand.url}
                    className="tw-flex gap-5 tw-cursor-pointer"
                  >
                    {brand.label}
                  </Link>
                  {(data?.user?.image === "SUPERADMIN") &&
                    activeBrandDeleteIndex === index && (
                      <FaTrash
                        className=" tw-cursor-pointer hover:tw-text-red-500"
                        onClick={() => handleDeleteBrand(brand._id)}
                      />
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
