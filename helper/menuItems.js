import { getCategoryWithLinks } from './categoryHelper'

export function getMenuItems(_categories, _brands, _products) {

    const finalMenuItems = [
        {
            title: 'Home',
            url: '/home',
        },
        {
            title: 'About',
            url: '/about',
        }
    ]

    const productSubMenu = getCategoryWithLinks(_categories, _brands, _products);

    finalMenuItems.push({
        title: 'Products',
        url: '/products',
        subMenu: productSubMenu
    })
    finalMenuItems.push({
        title: 'Sale & Promotion',
        url: '/sale-and-promotion',
    })
    finalMenuItems.push({
        title: 'Contact',
        url: '/contact',
    })
    return finalMenuItems;
}