import React, { Component } from 'react';
import Footer from '../components/Shared/Footer';
import NavbarTwo from '../components/Layout/NavbarTwo';
import RegistrationForm from '../components/Auth/RegisterForm';
import LoginPageHeader from '../components/Shared/LoginPageHeader';

class Registration extends Component {
    render() {
        return (
            <>
            <NavbarTwo/>

            <LoginPageHeader/>

            <RegistrationForm/>

            <Footer/>
            </>
        );
    }
}

export default Registration;