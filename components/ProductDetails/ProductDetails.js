import React from 'react';
import ProductReviews from './ProductReviews';

export default function ProductDetails({ product }) {
    const imageUrl = !!product.image ? product.image : '/images/products/product-default.webp';
    return (
        <>
            <div className="blog-details-desc">
                <div className="article-image">
                    <img src={imageUrl} alt={product.name} />
                </div>
                <div className="article-desc">
                    {
                        !!product?.description && (
                            `${product.description}`
                        )
                    }
                </div>
                {!!product.review && <ProductReviews review={product.review} />}
            </div>
        </>
    );
}