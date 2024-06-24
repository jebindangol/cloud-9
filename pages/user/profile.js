import React from 'react';
import Footer from '../../components/Shared/Footer';
import NavbarTwo from '../../components/Layout/NavbarTwo';
import PageHeader from '../../components/About/PageHeader';
import UserProfile from '../../components/User/UserProfile';

const Profile = () => {
    return (
        <>
        <NavbarTwo />

        <UserProfile/>

        <Footer/>
        </>
    );
   
}

export default Profile;