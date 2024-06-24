import React, { useContext } from 'react';
import Link from 'next/link';
import { getParentCategoryName } from '../../helper/categoryHelper';
import { DataContext } from '../../pages/_app';

export default function ProductPath({ isProductDetails, path, categoryKey }) {
    const { categories } = useContext(DataContext);
    const categoryName = getParentCategoryName(categoryKey, categories);

    return (
        <>
            <ul>
                <li>
                    <Link legacyBehavior href="/home">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    {isProductDetails ? (
                        <Link legacyBehavior href="/product-details">
                            <a>Product Details</a>
                        </Link>
                    ) : (
                        <Link legacyBehavior href="/products">
                            <a>Products</a>
                        </Link>
                    )}
                </li>

                {
                    !!categoryName &&
                    <li>
                        <Link legacyBehavior href={`${path}`}>
                            <a>{categoryName}</a>
                        </Link>
                    </li>
                }
            </ul>
        </>
    );
}