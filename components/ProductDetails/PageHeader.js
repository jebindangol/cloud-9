import React from 'react';
import ProductPath from '../Products/ProductPath'

export default function PageHeader({ path, categoryType }) {
    return (
        <>
            <div className="page-title-area item-bg1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Product Details</h2>
                                <ProductPath isProductDetails={true} path={path} categoryType={categoryType} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
