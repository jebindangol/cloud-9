import React, { Component } from 'react';
import NavbarTwo from '../components/Layout/NavbarTwo';
import PageHeader from '../components/About/PageHeader';
import AboutText from '../components/About/AboutText';
import WhyChooseUs from '../components/About/WhyChooseUs';
import OurTeamSlider from '../components/Common/OurTeamSlider';
import JoinNow from '../components/Common/JoinNow';
import Partner from '../components/Common/Partner';
import Footer from '../components/Layout/Footer';

class About extends Component {
    render() {
        return (
            <>
                <NavbarTwo />

                <PageHeader />

                <AboutText />

                <WhyChooseUs />

                <OurTeamSlider />

                <JoinNow />

                <Partner />
                
                <Footer />
            </>
        );
    }
}

export default About;