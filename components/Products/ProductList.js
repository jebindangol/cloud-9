import React from "react";
import ProductCard from "../Products/ProductCard";
import { useSession } from "next-auth/react";
import { useState ,useContext } from "react";
import { DataContext } from "../../pages/_app";

const Svg_addButton = () => (
  <svg
    width="120px"
    height="120px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      fill="#1C274C"
    />
    <path
      d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
      fill="#1C274C"
    />
  </svg>
);

const ProductList = ({
  productList,
  showAddProductModal,
  showEditProductModal,
}) => {
  const { data } = useSession();
  const { brands,categories } = useContext(DataContext);

  const AddButton = () => (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
      onClick={() => showAddProductModal(true)}
    >
      <div className=" tw-group  tw-w-full single-blog-post tw-flex tw-flex-col tw-justify-center tw-items-center tw-cursor-pointer">
        <Svg_addButton />
        Add Product
      </div>
    </div>
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleProductClick = (product) => {
    const matchingBrand = brands.find((brand) => brand._id === product.brand_id);
    const matchingCategory = categories.find((category) => category._id === product.category_id);

    let updatedProduct = { ...product }; 

    if (matchingBrand) {
      updatedProduct.brand_id = matchingBrand.label;
    } else {
      updatedProduct.brand_id = ''; 
    }

    if (matchingCategory) {
      updatedProduct.category_id = matchingCategory.label;
    } else {
      updatedProduct.category_id = ''; 
    }

    setSelectedProduct(updatedProduct);
    setIsPopupVisible(true);
};

  
  


  const handleClosePopup = () => {
    setSelectedProduct(null);
    setIsPopupVisible(false);
  };
  

  const calculateDiscountedPrice = () => {
    if (selectedProduct.sale?.type === "percentage") {
      const discountAmount =
        (selectedProduct.price.amount *
          selectedProduct.sale?.discount_percent) /
        100;
      return selectedProduct.price.amount - discountAmount;
    } else if (selectedProduct.sale?.type === "fixed") {
      return (
        selectedProduct.price.amount - selectedProduct.sale?.discount_amount
      );
    }
    return selectedProduct.price?.amount;
  };

  return (
    <div id="product-container" className="tabs_item ">
      <div className="row align-items-center">
        <div className="col-lg-12 content">
          <div className="tabs_item_content">
            <div className="row">
              {(data?.user?.image === "SUPERADMIN") && <AddButton />}
              {productList &&
                productList.map((product, i) => (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={i}>
                    <ProductCard
                      product={product}
                      showEditProductModal={showEditProductModal}
                      onClick={() => handleProductClick(product)}
                    />
                  </div>
                ))}
            </div>

            {isPopupVisible && selectedProduct && (
             <div className=" tw-fixed tw-z-[1000] tw-h-full tw-w-full tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-overflow-y-scroll tw-bg-[rgba(0,0,0,0.3)]">
              <div
                style={{
                  left:
                    window.innerWidth >= 820 && window.innerWidth <= 1180
                      ? "4%"
                      : window.innerWidth >= 768 && window.innerWidth <= 1024
                      ? "1%"
                      : "",
                }}
                className="tw-fixed  tw-bg-white   md:tw-top-[25%] tw-top-[15%]  md:tw-left-[25%]  tw-right-[11px] tw-p-3 tw-z-50   md:tw-w-[750px] tw-w-[350px]   md:tw-p-5 tw-flex tw-flex-col tw-gap-5 md:tw-gap-7 tw-rounded-md tw-shadow-lg "
              
              >
                <div className=" tw-flex tw-justify-between md:tw-px-0 tw-px-2 ">
                  <div className="tw-flex tw-justify-center tw-items-center tw-text-center tw-gap-2 md:tw-gap-4 ">
                    <div className="md:tw-h-[35px] tw-h-[20px] tw-w-[2px] tw-bg-gray-500"></div>
                    <h1 className=" md:tw-h-[20px] tw-h-[14px] tw-text-[18px] md:tw-text-[20px] tw-text-black tw-font-bold">
                      {selectedProduct.name}
                    </h1>
                  </div>

                  <button
                    onClick={handleClosePopup}
                    className=" tw-cursor-pointer md:tw-text-[20px] tw-hover:tw-scale-110"
                  >
                    {" "}
                    ╳
                  </button>
                </div>

                <div className="md:tw-flex md:tw-flex-row  md:tw-gap-5 tw-flex tw-flex-col tw-gap-7">
                  <div className="tw-h-[280px] md:tw-w[250px] tw-rounded-md tw-bg-gray-300  tw-relative">
                    <a>
                      <img
                        src={
                          selectedProduct.image
                            ? selectedProduct.image
                            : "/images/products/product-default.webp"
                        }
                        alt={selectedProduct.name}
                        className="tw-h-[280px] md:tw-w[250px] tw-rounded-md"
                      />
                    </a>

                    {!!selectedProduct.sale && (
                      <div className="date">
                        <span className="tw-absolute  tw-rounded-bl-md tw-rounded-tr-md  tw-text-[14px] tw-font-light tw-h-7 tw-w-[60px] tw-bg-red-600 tw-bottom-0 tw-text-white  tw-flex tw-justify-center tw-items-center">
                          <strong>On Sale</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="md:tw-flex md:tw-flex-col tw-flex tw-flex-col-reverse tw-gap-5 ">
                    <p className="md:tw-w-[440px] tw-overflow-hidden ">
                      {selectedProduct.description}
                    </p>

                    {/* Mobile view  */}
                    <div className="md:tw-hidden tw-border tw-border-t-4 tw-border-black tw-flex tw-flex-col tw-gap-2">
                      {selectedProduct.price?.amount && (
                        <div className="tw-flex tw-gap-10">
                          <h1 className="tw-text-[15px] tw-font-bold   tw-text-left">
                            Price
                          </h1>
                          {selectedProduct.sale && (
                            <div>
                              <h1 className="tw-text-[16px] tw-font-bold">
                                ${calculateDiscountedPrice()?.toFixed(2)}
                              </h1>

                              {selectedProduct.sale?.type === "fixed" ? (
                                <h1 className="tw-text-[16px] tw-text-red-500">
                                  ${selectedProduct.sale?.discount_amount} off
                                </h1>
                              ) : (
                                <h1 className="tw-text-[16px] tw-text-red-500 ">
                                  {selectedProduct.sale?.discount_percent}% off
                                </h1>
                              )}
                              <h1 className="tw-text-[16px] tw-line-through">
                                {selectedProduct.price?.label}
                              </h1>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="tw-flex tw-gap">
                        {selectedProduct.category_id && (
                          <div className="tw-flex   tw-gap-2 ">
                            <h1 className="tw-text-[15px]  tw-text-left tw-font-bold ">
                              Category
                            </h1>
                            <span className="tw-text-[15px] tw-overflow-hidden ">
                              {selectedProduct.category_id}
                            </span>
                          </div>
                        )}
                        {selectedProduct.brand && (
                          <div className="tw-flex     tw-gap-2">
                            <h1 className="tw-text-[15px]     tw-text-left tw-font-bold ">
                              Brand
                            </h1>
                            <span className="tw-text-[15px]  tw-overflow-hidden ">
                              {selectedProduct.brand.label}
                            </span>
                          </div>
                        )}
                      </div>

                      {selectedProduct.inventory &&
                        selectedProduct.inventory.store_quantity > 0 && (
                          <div className="tw-flex    tw-gap-3">
                            <h1 className="tw-text-[15px] tw-font-bold tw-w-[80px]  tw-text-left tw-text-green-500">
                              In Stock
                            </h1>
                            <span className="tw-text-[15px] tw-overflow-hidden tw-text-green-500 ">
                              {selectedProduct.inventory.store_quantity || 0}{" "}
                            </span>
                          </div>
                        )}
                    </div>

                    {/* web view */}
                    <div className="md:tw-flex  tw-hidden tw-flex-col tw-gap-2">
                      {selectedProduct.category_id && (
                        <div className="tw-flex    md:tw-gap-7 tw-gap-3">
                          <h1 className="tw-text-[16px] tw-w-[80px]  tw-text-left tw-font-bold ">
                            Category
                          </h1>
                          <span className="tw-text-[16px] tw-overflow-hidden ">
                            {selectedProduct?.category_id}
                          </span>
                        </div>
                      )}
                      {selectedProduct.brand_id && (
                        <div className="tw-flex    md:tw-gap-7 tw-gap-3">
                          <h1 className="tw-text-[16px]  tw-w-[80px]   tw-text-left tw-font-bold ">
                            Brand
                          </h1>
                          <span className="tw-text-[16px] tw-overflow-hidden ">
                            {selectedProduct.brand_id}
                          </span>
                        </div>
                      )}

                      {selectedProduct.price?.amount && (
                        <div className="tw-flex tw-gap-7">
                          <h1 className="tw-text-[16px] tw-font-bold tw-w-[80px]  tw-text-left">
                            Price
                          </h1>
                          <div className="tw-flex tw-flex-col">
                            <h1 className="tw-text-[16px] tw-font-bold">
                              {calculateDiscountedPrice()}
                            </h1>

                            {selectedProduct.sale && (
                              <div className="tw-flex tw-gap-10">
                                {selectedProduct.sale?.type === "fixed" ? (
                                  <h1 className="tw-text-[16px] tw-text-red-500">
                                    {selectedProduct.sale.discount_amount} off
                                  </h1>
                                ) : (
                                  <h1 className="tw-text-[16px] tw-text-red-500 ">
                                    {selectedProduct.sale.discount_percent}% off
                                  </h1>
                                )}
                                <h1 className="tw-text-[16px] tw-line-through">
                                  {selectedProduct.price.label}
                                </h1>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {selectedProduct.inventory &&
                        selectedProduct.inventory.store_quantity > 0 && (
                          <div className="tw-flex    tw-gap-7">
                            <h1 className="tw-text-[16px] tw-font-bold tw-w-[80px]  tw-text-left tw-text-green-500">
                              In Stock
                            </h1>
                            <span className="tw-text-[16px] tw-overflow-hidden tw-text-green-500 ">
                              {selectedProduct.inventory.store_quantity || 0}{" "}
                              left
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
