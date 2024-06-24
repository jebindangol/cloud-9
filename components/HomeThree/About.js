import React, { Component } from 'react';
import Link from 'next/link';

class About extends Component {
    render() {
        return (
            <>
                <section className="services-area ptb-100 bg-f8f8f8">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="about-title">
                                    <span>We are open till midnight, 7 days a week.</span>
                                    <h2>Our Opening Hours</h2>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="about-text">
                                    <h5>MONDAY - FRIDAY       8AM - 12 AM</h5>
                                    <h5>SATURDAY - SUNDAY     8AM - 1 AM </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default About;