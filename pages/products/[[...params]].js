import React from 'react';
import NavbarTwo from '../../components/Layout/NavbarTwo';
import PageHeader from '../../components/Products/PageHeader';
import Products from '../../components/Products/Products';
import Footer from '../../components/Layout/Footer';
import { useRouter } from 'next/router';

export default function ProductCategoryPage() {
    const router = useRouter();
    const { params = [] } = router.query;
    const currentCategoryKey = params[params.length - 1];
    return (
        <>
            <NavbarTwo />

            <PageHeader path={router.asPath} categoryKey={currentCategoryKey} />

            <Products queryParams={params} />

            <Footer />
        </>
    );
}

