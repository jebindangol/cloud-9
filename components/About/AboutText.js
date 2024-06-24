import React, { Component } from 'react';

class AboutText extends Component {
    render() {
        return (
            <>
                <section className="about-area ptb-100">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="about-title">
                                    <span>About Us</span>
                                    <h2>We offer wide collection of premium quality products </h2>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="about-text">
                                    <p>Cloud 9 Smoke Shop is located on 2933 beach street, Forth Worth, TX, 76111. Cloud 9 Smoke Shop is a
                                       small business where we thrive to provide our customers the best deal and price for any smoke and
                                       vape products with verity of selection available in FTW area.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default AboutText;