import React, { Component } from 'react';
import Link from 'next/link';

class ComingSoon extends Component {
    render() {
        return (
            <>
                <section>
                    <div className="container">
                        <div className="error-content">
                            <h3>Coming Soon ...</h3>
                            <img src="/images/200.webp" alt="image">
                            </img>
                            <p>The page you are looking is currently under construction and temporarily unavailable.</p>

                            <Link legacyBehavior href="/home">
                                <a className="default-btn">
                                    Go to Home <span></span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default ComingSoon;