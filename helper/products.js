import axios from "axios";
import baseUrl from '../utils/baseUrl';
import { allProducts, vapeBrands, vapeCategory } from "./scratchData";
import { formatBrands, formatCategory, formatProduct } from "./rawDataFormatter";

export async function getProductDataFromServer() {
    try {
        const responseData = { brands: [], categories: [], products: [] };
        const brands = await getBandsFromMongo();
        const categories = await getCategoriesFromMongo();
        const products = await getProductsFromMongo();
        responseData.brands = brands.data;
        responseData.categories = categories.data;
        responseData.products = products.data;
        return responseData;
    } catch (error) {
        return { "error": error }
    }
}

async function getBandsFromMongo() {
    try {
        const response = await axios.get(
            `/api/brand-api`
        );
        return response.data;
    } catch (error) {
        return { "error": error }
    }

}

async function getCategoriesFromMongo() {
    try {
        const response = await axios.get(
            `/api/category`
        );
        return response.data;
    } catch (error) {
        return { "error": error }
    }
}

async function getProductsFromMongo() {
    try {
        const response = await axios.get(
            `/api/product`
        );
        return response.data;
    } catch (error) {
        return { "error": error }
    }
}

async function postCollections() {
    postProductsInMongo(allProducts);
    postCategoriesInMongo(vapeCategory);
    postBrandsInMongo(vapeBrands);
}

async function postBrandsInMongo(_brands) {
    _brands.forEach(element => {
        const payload = formatBrands(element);
        axios.post(
            `/api/brand-api`,
            {
                _id: payload._id,
                key: payload.key,
                label: payload.label,
                url: payload.url
            }
        ).then(async (data) => {
            console.log("Brands added successfully in mongo", data)
        }).catch((error) => {
            console.error("Error while adding brands in mongo", error)
        });
    });
}

async function postCategoriesInMongo(_categories) {
    _categories.forEach(element => {
        const payload = formatCategory(element);
        axios.post(
            `/api/category`,
            {
                _id: payload._id,
                key: payload.key,
                label: payload.label,
                url: payload.url,
                sub_categories: payload.sub_categories
            }
        ).then(async (data) => {
            console.log("Categories added successfully in mongo", data)
        }).catch((error) => {
            console.error("Error while adding categories in mongo", error)
        });
    });
}

async function postProductsInMongo(_product) {
    _product.forEach(element => {
        const payload = formatProduct(element);
        axios.post(
            `/api/product`,
            payload
        ).then(async (data) => {
            console.log("Products added successfully in mongo", data)
        }).catch((error) => {
            console.error("Error while adding products in mongo", error)
        });
    });
}