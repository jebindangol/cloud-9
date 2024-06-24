import { getAllChildCategoryIds, getCategoryId } from "./categoryHelper"
import {
    getBrandIdFromKey,
    getBrandKeyFromParams,
    isBrandLink,
    isSaleLink,
    isAllProductLink,
    hasBrandAndCategory
} from './brandHelper';

export function getProductDetails(productId, _products) {
    for (let i = 0; i < _products.length; i++) {
        if (_products[i]._id === productId) {
            return _products[i];
        }
    }
}

export function getProductByCategoryId(categoryId, _categories, isParentCategory = false, _products) {
    let selectedProducts = [];
    if (categoryId === "all") {
        selectedProducts = _products;
    } else {
        let categoryIds = [categoryId];
        if (isParentCategory) {
            categoryIds = getAllChildCategoryIds(categoryId, _categories);
        }
        _products.forEach((product) => {
            categoryIds.forEach((_categoryId) => {
                if (product.category_id === _categoryId) {
                    selectedProducts.push(product);
                }
            })
        });
    }
    return selectedProducts;
}

export function getProductByBrandId(brandId, _products) {
    let selectedProducts = [];
    if (brandId === "all") {
        selectedProducts = _products;
    } else {
        _products.forEach((product) => {
            if (product.brand_id === brandId) {
                selectedProducts.push(product);
            }
        });
    }
    return selectedProducts;
}

export function getSaleProducts(_products) {
    let selectedProducts = [];
    _products.forEach((product) => {
        if (!!product.sale) {
            selectedProducts.push(product);
        }
    });
    return selectedProducts;
}

export function getProductsFromLink(_queryParams, _brands, _categories, _products) {
    const currentCategoryKey = _queryParams[_queryParams.length - 1];
    let productList;
    if (hasBrandAndCategory(_queryParams)) {
        const brandId = getBrandIdFromKey(getBrandKeyFromParams(_queryParams), _brands);
        const categoryId = _queryParams[3];
        const productByBrand = getProductByBrandId(brandId, _products);
        productList = getProductByCategoryId(categoryId, _categories, false, productByBrand );
    } else if (isBrandLink(_queryParams)) {
        const brandId = getBrandIdFromKey(getBrandKeyFromParams(_queryParams), _brands);
        productList = getProductByBrandId(brandId, _products);
    } else if (isSaleLink(_queryParams)) {
        productList = getSaleProducts(_products);
    } else if (isAllProductLink(_queryParams)) {
        productList = _products;
    } else {
        const caterogyId = getCategoryId(currentCategoryKey, _categories);
        const isParentCategory = _queryParams.length <= 1;
        productList = getProductByCategoryId(caterogyId, _categories, isParentCategory, _products);
    }

    return productList;
}