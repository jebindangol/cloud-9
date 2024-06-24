import React, { Component } from 'react';
import NavbarTwo from '../components/Layout/NavbarTwo';
import PageHeader from '../components/Contact/PageHeader';
import ContactContent from '../components/Contact/ContactContent';
import Footer from '../components/Layout/Footer';

class Contact extends Component {
    render() {
        return (
            <>
                <NavbarTwo />

                <PageHeader />

                <ContactContent />
                
                <Footer />
            </>
        );
    }
}

export default Contact;