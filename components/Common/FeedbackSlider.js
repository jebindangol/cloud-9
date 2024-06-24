import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    items: 1,
    navText: [
        "<i class='flaticon-left-chevron'></i>",
        "<i class='flaticon-right-chevron'></i>"
    ]
}

class FeedbackSlider extends Component {

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
                <div className="feedback-area ptb-100">
                    <div className="container">
                    <div className="join-content">
                        <img className="join-content"src="/images/reviews/google-reviews.webp" alt="image" />
                    </div>
                    {this.state.display ? <OwlCarousel 
                            className="feedback-slides owl-carousel owl-theme"
                            {...options}
                        >
                            <div className="single-feedback-item">
                                <p>The best smoke shop in FTW! The managers and John are super helpful and very friendly. Also, they always have good prices for everything! I would highly recommend anyone to check the store out because you wouldn’t regret it!</p>

                                <div className="client">
                                    <p>sena h</p>
                                    <img src="/images/reviews/five-star.webp" alt="image" />
                                </div>
                            </div>

                            <div className="single-feedback-item">
                                <p>Cloud nine is a very clean smoke shop and the host are great about taking care customers. The games are clean and they have restrooms that are very well kept. You will enjoy the friendly atmosphere lots of parking for everyone. Fish games keno and others come join us there</p>

                                <div className="client">
                                    <p>Barbara Maner</p>
                                    <img src="/images/reviews/five-star.webp" alt="image" />
                                </div>
                            </div>

                            <div className="single-feedback-item">
                                <p>This smoke shop is awesome place with an awesome man named John he's good with making great deals and very nice they deserve the 5 stars! I suggest everyone to check this place out you won't be disappointed!</p>

                                <div className="client">
                                    <p>Alyssa Marie Rivera</p>
                                    <img src="/images/reviews/five-star.webp" alt="image" />
                                </div>
                            </div>
                            <div className="single-feedback-item">
                                <p>I shop here frequently and they always have excellent customer service they even greet you when u walk in and they have a huge variety of (current products) and if they do t have something u want or need they are happy to order it for you I recommend anyone that needs tobacco products or smoking supplies to definitely stop here it is the only place I shop for my products</p>

                                <div className="client">
                                    <p>William Mackey</p>
                                    <img src="/images/reviews/five-star.webp" alt="image" />
                                </div>
                            </div>
                            <div className="single-feedback-item">
                                <p>Best smoke shop in the area , john always has what i need with reasonable prices . Awesome customer service , clean store and stays open late which is great for my schedule . Keep it up john 💪🏽💯</p>

                                <div className="client">
                                    <p> Omar Natal </p>
                                    <img src="/images/reviews/five-star.webp" alt="image" />
                                </div>
                            </div>
                        </OwlCarousel> : ''}
                    </div>
                    <div id="google-reviews"></div>
                    {/* <script>
                        jQuery(document).ready(function( $ ) {
                        $("#google-reviews").googlePlaces({
                                placeId: 'EjMyOTMzIE4gQmVhY2ggU3QgdW5pdCAxMDksIEZvcnQgV29ydGgsIFRYIDc2MTExLCBVU0EiJBoiChYKFAoSCSl8rhU-d06GEfqfjcxUsom5Egh1bml0IDEwOQ'
                            , render: ['reviews']
                            , min_rating: 4
                            , max_rows:4
                        })
                        });
                    </script> */}
                    <div className="join-content">
                        <a href="https://www.google.com/search?q=cloud+9+smoke+shop+fort+worth+tx&rlz=1C1GCEA_en&oq=cloud+9+smoke+shop&aqs=chrome.1.69i57j35i39j46i175i199i512l3j0i512l2j46i175i199i512l2j0i512.5011j0j4&sourceid=chrome&ie=UTF-8&authuser=0#lrd=0x864e77e12b4ea66f:0x768c7bbda415bbc5,1,," className="default-btn" target="_blank">
                            View All Reviews <span></span>
                        </a>

                    </div>
                </div>
            </>
        );
    }
}

export default FeedbackSlider;