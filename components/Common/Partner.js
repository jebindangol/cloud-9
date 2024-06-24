import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 30,
    navText: [
        "<i class='flaticon-left-chevron'></i>",
        "<i class='flaticon-right-chevron'></i>"
    ],
    responsive: {
        0: {
            items: 3,
            margin: 10,
        },
        576: {
            items: 4,
        },
        768: {
            items: 5,
        },
        1200: {
            items: 7,
        }
    }
}

class Partner extends Component {

    _isMounted = false;
    state = {
        display:false,
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
                <section className="partner-area ptb-100 bg-f8f8f8">
                    <div className="container">
                        <div className="partner-title">
                            <h2>We Sale World Wide Trusted Top Brands</h2>
                        </div>

                        {this.state.display ? <OwlCarousel 
                            className="partner-slides owl-carousel owl-theme"
                            {...options}
                        >
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/elf-bars.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/esco-bars.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/gilli-glass.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/lookah.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/rick-and-morty.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/smok.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>

                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/tyson.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/uno.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/voodoo.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/raw.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/lookah.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/king-palm.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/camo.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/foger.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                            <div className="single-partner-item">
                                <Link legacyBehavior href="#">
                                    <a>
                                        <img src="/images/partner/uwell.webp" alt="image" />
                                    </a>
                                </Link>
                            </div>
                        </OwlCarousel> : ''}
                    </div>
                </section>
            </>
        );
    }
}

export default Partner;