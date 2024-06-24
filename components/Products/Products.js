import React, { useContext, useState } from "react";
import ProductList from "./ProductList";
import ProductSideBar from "./ProductFilter/ProductSideBar";
import { getProductsFromLink } from "../../helper/productHelper";
import { DataContext } from "../../pages/_app";
import AddProductForm from "../../components/Products/AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import AddBrandForm from "./AddBrandForm";
import EditProductForm from "./EditProductForm";
import { useEffect } from "react";

export const FilteredProductListContext = React.createContext([]);

export default function Products({ queryParams }) {

 

  const currentCategoryKey = queryParams[queryParams.length - 1];
  const { brands, categories, products } = useContext(DataContext);
  let productList = getProductsFromLink(
    queryParams,
    brands,
    categories,
    products
  );

  const [filteredProducts, setFilteredProducts] = useState();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showAddBrandForm, setShowAddBrandForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);


  if (!!filteredProducts && filteredProducts.length > 0) {
    productList = filteredProducts;
  }

  const [brandKey, brandValue] = queryParams; // Destructure the array into brandKey and brandValue

  console.log("Brand Key:", brandKey); // Logs: "brand"
  console.log("Brand Value:", brandValue); 


  const AddProductModal = () => (

    <div className=" tw-fixed tw-z-[1000] tw-h-full tw-w-full tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-overflow-y-scroll tw-bg-[rgba(0,0,0,0.3)]">
      <AddProductForm brandValue={brandValue} brandKey={brandKey} showModal={handleShowProductModalView} />
    </div>
  );

  const EditProductModal = ({}) => (
    <div className=" tw-fixed tw-z-[1000] tw-h-full tw-w-full tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-overflow-y-scroll tw-bg-[rgba(0,0,0,0.3)]">
      <EditProductForm showModal={handleShowEditProductModalView}  selectedProductId={selectedProductId} selectedProductData={selectedProductData}/>
    </div>
  );

  const AddBrandModal = () => (
    <div className=" tw-fixed tw-z-[1000] tw-h-full tw-w-full tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-overflow-y-scroll tw-bg-[rgba(0,0,0,0.3)]">
      <AddBrandForm showModal={handleShowBrandModalView} />
    </div>
  );

  const AddCategoryModal = () => (
    <div className=" tw-fixed tw-z-[1000] tw-h-full tw-w-full tw-top-0 tw-left-0 tw-flex tw-justify-center tw-items-center tw-overflow-y-scroll tw-bg-[rgba(0,0,0,0.3)]">
      <AddCategoryForm showModal={handleShowCategoryModalView} />
    </div>
  );

  const handleShowProductModalView = (show) => setShowAddProductForm(show);
  const handleShowEditProductModalView = (show, productId, productData) => {
    setSelectedProductId(productId); // Set selectedProductId
    setSelectedProductData(productData); // Set selectedProductData
    setShowEditProductForm(show);
  };
  
  const handleShowBrandModalView = (show) => setShowAddBrandForm(show);
  const handleShowCategoryModalView = (show) => setShowAddCategoryForm(show);

  return (
    <>
      <FilteredProductListContext.Provider
        value={{
          filteredProducts: filteredProducts,
          setFilteredProducts: setFilteredProducts,
        }}
      >
        {showAddProductForm && <AddProductModal />}
        {showEditProductForm && (
          <EditProductModal
            showModal={handleShowEditProductModalView}
            selectedProductId={selectedProductId}
          />
        )}
        {showAddBrandForm && <AddBrandModal />}
        {showAddCategoryForm && <AddCategoryModal />}
        <section className="floor-plans-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <ProductSideBar
                  categoryKey={currentCategoryKey}
                  showAddBrandModal={handleShowBrandModalView}
                  showAddCategoryModal={handleShowCategoryModalView}
                />
              </div>
              <div className="col-lg-9 col-md-12">
                <div className="tab">
                  <ProductList
                    productList={productList}
                    showAddProductModal={handleShowProductModalView}
                    showEditProductModal={handleShowEditProductModalView}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <ProductPagination /> */}
        </section>
      </FilteredProductListContext.Provider>
    </>
  );
}
