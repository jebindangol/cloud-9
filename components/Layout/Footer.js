import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';

class Footer extends Component {
    render() {
        return (
            <>
                <footer className="footer-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <div className="logo">
                                        <Link legacyBehavior href="/home">
                                            <a>
                                                <Image src="/images/white-logo.webp" alt="image" width="102" height="92"/>
                                            </a>
                                        </Link>
                                        <p> Cloud 9 Smoke Shop - Best Vape & Smoke Shop in FTW area.</p>
                                    </div>

                                    <ul className="social">
                                        <li>
                                            <a href="https://www.facebook.com/profile.php?id=100072849857937" target="_blank">
                                                <i className="flaticon-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/cloud_ix_smoke_shop/" target="_blank">
                                                <i className="flaticon-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <h3>Quick Links</h3>

                                    <ul className="footer-quick-links">
                                        <li>
                                            <Link legacyBehavior href="/home">
                                                <a>Home</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/about">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/products">
                                                <a>Products</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/sale-and-promotion">
                                                <a>Sale & Promotion</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="/contact">
                                                <a>Contact Us</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <h3>Contact Info</h3>

                                    <ul className="footer-contact-info">
                                        <li><span>Location:</span> 2933 N Beach St Unit 109, Fort Worth, TX 76111, USA</li>
                                        <li><span>Email:</span> <a href="mailto:2933cloudixsmokeshop@gmail.com">2933cloudixsmokeshop@gmail.com</a></li>
                                        <li><span>Phone:</span> <a href="tel:+1 (817) 4206102">+1 (817) 420 6102</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="single-footer-widget">
                                    <ul className="footer-contact-info">
                                        <li>
                                            <a href="https://www.google.com/maps/place/Cloud+9+Smoke+Shop/@32.7980154,-97.2932306,17z/data=!4m13!1m7!3m6!1s0x864e773e15baaaab:0x5333cd7c390a1bb8!2s2933+N+Beach+St+Unit+109,+Fort+Worth,+TX+76111!3b1!8m2!3d32.7980154!4d-97.2910419!3m4!1s0x864e77e12b4ea66f:0x768c7bbda415bbc5!8m2!3d32.7980384!4d-97.2908477" target="_blank">View Location on GoogleMap
                                            </a>
                                            <p></p>
                                            <a href="https://www.google.com/maps/place/Cloud+9+Smoke+Shop/@32.7980154,-97.2932306,17z/data=!4m13!1m7!3m6!1s0x864e773e15baaaab:0x5333cd7c390a1bb8!2s2933+N+Beach+St+Unit+109,+Fort+Worth,+TX+76111!3b1!8m2!3d32.7980154!4d-97.2910419!3m4!1s0x864e77e12b4ea66f:0x768c7bbda415bbc5!8m2!3d32.7980384!4d-97.2908477" target="_blank">
                                                <Image src="/images/map.webp" alt="image" width="199" height="149"/>  
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="copyright-area">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <p> Copyright <i className="far fa-copyright"></i> {new Date().getFullYear()} Cloud 9 Smoke Shop. Powered By <a href="https://yalait.com/"> Yala IT Solutions </a> </p>
                                </div>

                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <ul>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>Privacy Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link legacyBehavior href="#">
                                                <a>Terms & Conditions</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default Footer;