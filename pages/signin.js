import React, { Component } from 'react';
import Footer from '../components/Layout/Footer';
import NavbarTwo from '../components/Layout/NavbarTwo';
import LoginForm from '../components/Auth/LoginForm';
import LoginPageHeader from '../components/Shared/LoginPageHeader';

class SignIn extends Component {
    render() {
        return (
            <>
            <NavbarTwo/>

            <LoginPageHeader/>

            <LoginForm/>

            <Footer/>
            </>
        );
    }
}

export default SignIn;