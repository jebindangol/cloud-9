import React, { Component } from 'react';
import Link from 'next/link';

class JoinNow extends Component {
    render() {
        return (
            <>
                <section className="join-area ptb-100">
                    <div className="container">
                        <div className="join-content">
                            <h2>LOOKING FOR A GOOD DEAL ?</h2>
                            <p>Enjoy & score 25% upto 75% off when you shop our sales & promotion collectios</p>

                            <Link legacyBehavior href="/sale-and-promotion" >
                                <a className="default-btn">
                                    Sales & Promotion <i className="flaticon-right-chevron"></i> 
                                    <span></span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default JoinNow;