import React, { Component } from 'react';
import NavbarTwo from '../components/Layout/NavbarTwo';
import PageHeader from '../components/Sales/PageHeader';
import ComingSoon from '../components/Common/ComingSoon';
import Footer from '../components/Layout/Footer';
import SalesPromotions from '../components/Sales/SalesPromotions';

class SaleAndPromotion extends Component {
    render() {
        return (
            <>
                <NavbarTwo />
                
                <PageHeader />

                {/* <ComingSoon/> */}
                <SalesPromotions/>

                <Footer />
            </>
        );
    }
}

export default SaleAndPromotion;