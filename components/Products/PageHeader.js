import React from 'react';
import ProductPath from './ProductPath';

export default function PageHeader({ path, categoryKey }) {
    return (
        <>
            <div className="page-title-area item-bg1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Products</h2>
                                <ProductPath isProductDetails={false} path={path} categoryKey={categoryKey} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}