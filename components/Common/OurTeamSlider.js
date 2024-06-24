import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    center: true,
    margin: 30,
    navText: [
        "<i class='flaticon-left-chevron'></i>",
        "<i class='flaticon-right-chevron'></i>"
    ],
    responsive: {
        0: {
            items: 1,
        },
        576: {
            items: 2,
        },
        768: {
            items: 2,
        },
        1200: {
            items: 3,
        }
    }
}

class OurTeamSlider extends Component {

    _isMounted = false;
    state = {
        display:false
    }

    componentDidMount(){ 
        this._isMounted = true;
        this.setState({ display: true }) 
    }

    componentWillUnmount() {
        this._isMounted = false; 
    }

    render() {
        return (
            <>
                <section className="team-area ptb-100">
                    <div className="container">
                        <div className="section-title">
                            <span className="sub-title">Our Team</span>
                            <h2>Meet Our Team</h2>
                            <p>Our team members are experienced professionals who knows all the products in more detail and can help you to find the right product.</p>
                        </div>

                        {this.state.display ? <OwlCarousel 
                            className="team-slides owl-carousel owl-theme"
                            {...options}
                        >
                            <div className="single-team-box">
                                <div className="image">
                                    <img src="/images/team/cirish.webp" alt="image" />

                                    {/* <ul className="social">
                                        <li>
                                            <a href="https://www.facebook.com/" target="_blank">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>

                                <div className="content">
                                    <h3>Sam</h3>
                                    <span>Smart Sam</span>
                                </div>
                            </div>

                            <div className="single-team-box">
                                <div className="image">
                                    <img src="/images/team/john.webp" alt="image" />

                                    {/* <ul className="social">
                                        <li>
                                            <a href="https://www.facebook.com/" target="_blank">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>

                                <div className="content">
                                    <h3>John </h3>
                                    <span>Jolly John</span>
                                </div>
                            </div>

                            <div className="single-team-box">
                                <div className="image">
                                    <img src="/images/team/binod.webp" alt="image" />

                                    {/* <ul className="social">
                                        <li>
                                            <a href="https://www.facebook.com/" target="_blank">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/">
                                                <i className="fab fa-linkedin-in"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>

                                <div className="content">
                                    <h3>Binod</h3>
                                    <span>Flying Binod</span>
                                </div>
                            </div>
                        </OwlCarousel> : ''}
                    </div>
                </section>
            </>
        );
    }
}

export default OurTeamSlider;