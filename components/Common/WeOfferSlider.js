import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
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


class WeOfferSlider extends Component {

    _isMounted = false;
    state = {
        display: false
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ display: true })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <section className="services-area ptb-100 bg-f8f8f8">
                    <div className="container">
                        <div className="section-title">
                            <h2>Our Beloved Products</h2>
                            <p>Try it right now.</p>
                        </div>

                        {this.state.display ? <OwlCarousel
                            className="partner-slides owl-carousel owl-theme"
                            {...options}
                        >
                            <div className="services-box">
                                <a>
                                    <img src="/images/products/bong.webp" alt="image" />
                                </a>

                                <div className="services-content">
                                    <h3>
                                        <a>Bong</a>
                                    </h3>
                                    <p>Wide range of bongs & waterpipes</p>
                                </div>
                            </div>

                            <div className="services-box">
                                <a href="/products/vape/elf-bar/">
                                    <img src="/images/products/elf-bar.webp" alt="image" />
                                </a>

                                <div className="services-content">
                                    <h3>
                                        <Link legacyBehavior href="/products/vape/elf-bar/">
                                            <a>Elf Bar</a>
                                        </Link>
                                    </h3>
                                    <p>Available in different flavors</p>
                                </div>
                            </div>

                            <div className="services-box">
                                <a href="products/vape/esco-bar/">
                                    <img src="/images/products/esco-bar.webp" alt="image" />
                                </a>

                                <div className="services-content">
                                    <h3>
                                        <Link legacyBehavior href="/products/vape/esco-bar/">
                                            <a>Esco Bar</a>
                                        </Link>
                                    </h3>
                                    <p>Available in different flavors</p>
                                </div>
                            </div>

                            <div className="services-box">
                                <a href="products/vape/foger/"><img src="/images/products/fogers.webp" alt="image" /></a>

                                <div className="services-content">
                                    <h3>
                                        <Link legacyBehavior href="products/vape/foger/">
                                            <a>Foger</a>
                                        </Link>
                                    </h3>
                                    <p>Available in different flavors</p>
                                </div>
                            </div>
                        </OwlCarousel> : ''}
                    </div>

                    <div className="join-content">
                        <Link legacyBehavior href="/products" >
                            <a className="default-btn">
                                Load More <span></span>
                            </a>
                        </Link>
                    </div>

                </section>
            </>
        );
    }
}

export default WeOfferSlider;