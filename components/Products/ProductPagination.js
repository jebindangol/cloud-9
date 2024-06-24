import React from 'react';
import Link from 'next/link';

export default function ProductPagination() {
    return (
        <>
            <div className="col-lg-12 col-md-12">
                <div className="pagination-area">
                    <Link legacyBehavior href="#">
                        <a className="prev page-numbers">
                            <i className="fas fa-angle-double-left"></i>
                        </a>
                    </Link>
                    <Link legacyBehavior href="#">
                        <a className="page-numbers">1</a>
                    </Link>
                    <span className="page-numbers current" aria-current="page">2</span>
                    <Link legacyBehavior href="#">
                        <a className="page-numbers">3</a>
                    </Link>
                    <Link legacyBehavior href="#">
                        <a className="page-numbers">4</a>
                    </Link>
                    <Link legacyBehavior href="#">
                        <a className="next page-numbers">
                            <i className="fas fa-angle-double-right"></i>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}
