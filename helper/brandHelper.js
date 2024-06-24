export function isBrandLink(queryParams) {
    if (queryParams[0] === 'brand') {
        return true;
    }
}

export function isSaleLink(queryParams) {
    if (queryParams[0] === 'sale') {
        return true;
    }
}

export function isAllProductLink(queryParams) {
    if (queryParams[0] === 'all') {
        return true;
    }
}

export function getBrandKeyFromParams(queryParams) {
    if (!!queryParams[1]) {
        return queryParams[1];
    } else {
        return 'all';
    }
}

export function getBrandIdFromKey(brandKey, _brands) {
    if (!!brandKey) {
        const selectedBrand = _brands.filter(brand => {
            return brand.key === brandKey;
        });
        if (selectedBrand.length >= 0 && !!selectedBrand[0]?._id) {
            return selectedBrand[0]._id;
        }
    }
    return 'all';
}

export function hasBrandAndCategory(queryParams) {
    if (queryParams[0]==="brand" && queryParams[2]==="category") {
        return true
    }
}