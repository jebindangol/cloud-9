import React from 'react';
import Footer from '../../components/Shared/Footer';
import NavbarTwo from '../../components/Layout/NavbarTwo';
import SearchLoyalty from '../../components/Loyalty/SearchLoyalty';

const Loyalty = () => {
    return (
        <>
        <NavbarTwo />

        <SearchLoyalty/>

        <Footer/>
        </>
    );
   
}

export default Loyalty;