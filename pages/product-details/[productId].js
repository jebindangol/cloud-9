import React, { useContext } from 'react';
import NavbarTwo from '../../components/Layout/NavbarTwo';
import PageHeader from '../../components/ProductDetails/PageHeader';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import Footer from '../../components/Layout/Footer';
import { useRouter } from 'next/router';
import { getProductDetails } from '../../helper/productHelper';
import ProductSideBar from '../../components/Products/ProductFilter/ProductSideBar';
import { DataContext } from '../../pages/_app';

export default function ProductDetailsPage() {
    const router = useRouter();
    const { params = [] } = router.query;
    const category = params[params.length - 1];
    const { products } = useContext(DataContext);
    const product = getProductDetails(router.query.productId, products);
    if (params.length > 1) {
        parentCategory = params[0]
    }
    return (
        <>
            <NavbarTwo />

            <PageHeader path={router.asPath} categoryType={category} />

            <div className="blog-details-area ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <ProductSideBar />
                        </div>

                        {!!product && (
                            <div className="col-lg-8 col-md-12">
                                <ProductDetails product={product} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
