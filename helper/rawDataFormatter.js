import uuid from 'react-uuid';

function formatKey(str) {
    // Replace all whitespace with hyphens
    str = str.replace(/\s+/g, '-');
    // Lowercase the string
    str = str.toLowerCase();
    // Return the formatted string
    return str;
}

export function formatBrands(element) {
    const key = formatKey(element.label);

    const payload = {
        _id: element._id,
        key: key,
        label: element.label,
        url: `/products/brand/${key}`
    }
    return payload;
}

export function formatCategory(element) {
    const key = formatKey(element.label);
    const primaryUrl = `/products/${key}`;
    const subCategories = [];
    if (!!element.sub_categories && element.sub_categories.length > 0) {
        element.sub_categories.forEach((subCat) => {
            const subCategoryKey = formatKey(subCat.label);
            const url = `${primaryUrl}/${subCategoryKey}`;
            subCategories.push({
                _id: subCat._id,
                key: subCategoryKey,
                label: subCat.label,
                url: url
            });
        });
    }

    const payload = {
        _id: element._id,
        key: key,
        label: element.label,
        url: primaryUrl,
        sub_categories: subCategories
    }
    return payload;
}

export function formatProduct(rawProduct) {
    const price = !!rawProduct.price ? rawProduct.price : {};
    const sale = !!rawProduct.sale ? rawProduct.sale : {};
    const image = !!rawProduct.image ? rawProduct.image : '';

    const product = {
        _id: uuid(),
        category_id: rawProduct.category_id,
        brand_id: rawProduct.brand_id,
        name: rawProduct.name,
        image: image,
        price: price,
        inventory: {
            store_quantity: 10
        },
        description: rawProduct.description,
        sale: sale,
        relatedProductIds: [],
        review: {}
    }
    return product;
}
