import React, { Component } from 'react';
import ContactForm from './ContactForm';

class ContactContent extends Component {
    render() {
        return (
            <>
                <section className="contact-area ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="section-title">
                                    <span className="sub-title">Contact Us</span>
                                    <h2>Say Hello</h2>
                                    <p>Your email address will not be published. We promise not to spam!</p>
                                </div>

                                <div className="contact-info">
                                    <ul className="contact-list">
                                        <li>
                                            <div className="icon">
                                                <i className="flaticon-location"></i>
                                            </div>
                                            <span>Address</span>
                                            2933 N Beach St Unit 109, Fort Worth, TX 76111
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <i className="flaticon-email"></i>
                                            </div>
                                            <span>Email</span>
                                            2933cloudixsmokeshop@gmail.com <br />
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <i className="fas fa-phone-volume"></i>
                                            </div>
                                            <span>Phone</span>
                                            (817) 420-6102 <br />
                                        </li>
                                    </ul>

                                    <ul className="social">
                                        <li>
                                            <a href="https://www.facebook.com/profile.php?id=100072849857937" target="_blank">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/cloud_ix_smoke_shop/">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="section-title">
                                    <span className="sub-title">Have a Question?</span>
                                    <h2>Send a Message</h2>
                                    <p>Your email address will not be published. We promise not to spam!</p>
                                </div>

                                <ContactForm />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-map">
                        <img src="/images/bg-map.webp" alt="image" />
                    </div>
                </section>
            </>
        );
    }
}

export default ContactContent;