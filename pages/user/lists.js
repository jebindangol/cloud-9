import React from 'react';
import Footer from '../../components/Shared/Footer';
import NavbarTwo from '../../components/Layout/NavbarTwo';
import UserList from '../../components/User/UserList';

const Lists = () => {
    return (
        <>
        <NavbarTwo />

        <UserList/>

        <Footer/>
        </>
    );
   
}

export default Lists;