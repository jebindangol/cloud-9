import { getProductByCategoryId, getProductByBrandId } from "./productHelper"

export function getCategoryId(categoryKey, _categories = categories) {
    if (!!categoryKey) {
        const categoryList = getCategoryLinkFlatMap(_categories);
        let categoryId = "";
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].categoryKey === categoryKey) {
                categoryId = categoryList[i].categoryId;
            }
        }
        return categoryId;
    } else {
        return "all";
    }
}

export function getAllChildCategoryIds(categoryId, _categories) {
    const categoryIds = [categoryId];
    _categories.forEach((_category) => {
        if (_category._id === categoryId && !!_category.sub_categories) {
            _category.sub_categories.forEach((subCategory) => {
                categoryIds.push(subCategory._id);
                if (!!subCategory.sub_categories) {
                    subCategory.sub_categories.forEach((subCategory1) => {
                        categoryIds.push(subCategory1._id);
                    });
                }
            });
        }
    });
    return categoryIds;
}

export function getCategoryLinkFlatMap(_categories) {
    const categoryFlatList = [];
    _categories.forEach((category) => {
        categoryFlatList.push({
            categoryId: category._id,
            title: category.label,
            categoryKey: category.key,
            url: category.url,
        });
        // if we have sub categories then create second level nested menu
        if (!!category.sub_categories) {
            category.sub_categories.forEach((subCategory) => {
                categoryFlatList.push({
                    categoryId: subCategory._id,
                    title: subCategory.label,
                    categoryKey: subCategory.key,
                    url: subCategory.url,
                });
                if (!!subCategory.sub_categories) {
                    subCategory.sub_categories.forEach((subCategory1) => {
                        categoryFlatList.push({
                            categoryId: subCategory1._id,
                            title: subCategory1.label,
                            categoryKey: subCategory1.key,
                            url: subCategory1.url,
                        });
                    });
                }
            });
        }
    });
    return categoryFlatList;
}


  

export function getCategoryWithLinks(_categories, _brands, _products) {
    const productSubMenu = [];
    productSubMenu.push({
        categoryId: "01-sale",
        title: "Sale",
        url: "/products/sale",
    });

    // Iterate through the input array and replace sub_categories with _brand
    for (let i = 0; i < _categories.length; i++) {
        const category = _categories[i];
        category.sub_categories = [];

        // Iterate through the brands to create sub_categories
        for (let j = 0; j < _brands.length; j++) {
        const brand = _brands[j];
        const subCategory = {
            ...brand,
            url: brand.url + '/category/' + category._id,
        };
        const productByBrand = getProductByBrandId(brand._id, _products);
        let productList = getProductByCategoryId(category._id, _categories, false, productByBrand );
        if (productList.length>0)category.sub_categories.push(subCategory);
        }
    }



    _categories.forEach((category) => {
        // if we have sub categories then create second level nested menu
        if (!!category.sub_categories && category.sub_categories.length > 0) {
            const secondLevelSubMenu = [];
            category.sub_categories.forEach((subCategory) => {
                if (
                    !!subCategory.sub_categories &&
                    subCategory.sub_categories.length > 0
                ) {
                    const secondLevelSubMenu1 = [];
                    subCategory.sub_categories.forEach((subCategory1) => {
                        if (!!subCategory1.url) {
                            secondLevelSubMenu1.push({
                                categoryId: subCategory1._id,
                                title: subCategory1.label,
                                url: subCategory1.url,
                            });
                        }
                    });
                    if (!!subCategory.url) {
                        secondLevelSubMenu.push({
                            categoryId: subCategory._id,
                            title: subCategory.label,
                            url: subCategory.url,
                            subMenu: secondLevelSubMenu1,
                        });
                    }
                } else {
                    if (!!subCategory.url) {
                        secondLevelSubMenu.push({
                            categoryId: subCategory._id,
                            title: subCategory.label,
                            url: subCategory.url,
                        });
                    }
                }
            });
            if (!!category.url) {
                productSubMenu.push({
                    categoryId: category._id,
                    title: category.label,
                    url: category.url,
                    subMenu: secondLevelSubMenu,
                });
            }
        } else {
            if (!!category.url) {
                productSubMenu.push({
                    categoryId: category._id,
                    title: category.label,
                    url: category.url,
                });
            }
        }
    });

    return productSubMenu;
}

export function getParentCategoryName(categoryKey, _categories) {
    const category = _categories.find((category) => {
        if (category.key === categoryKey) {
            return category.label;
        }
        if (!!category.sub_categories) {
            return category.sub_categories.find((subCategory) => {
                if (subCategory.key === categoryKey) {
                    return category.label;
                }
                if (!!subCategory.sub_categories) {
                    return subCategory.sub_categories.find((subCategory1) => {
                        if (subCategory1.key === categoryKey) {
                            return category.label;
                        }
                    });
                }
            });
        }
    });

    return category ? category.label : "";
}
