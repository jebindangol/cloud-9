import React, { Component } from 'react';
import Link from 'next/link';

class Error extends Component {
    render() {
        return (
            <>
                <div className="error-area">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="error-content">
                                    <img src="/images/404.webp" alt="error" />
                                    
                                    <h3>Page Not Found</h3>
                                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>

                                    <Link legacyBehavior href="/home">
                                        <a className="default-btn">
                                            Go to Home <span></span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Error;