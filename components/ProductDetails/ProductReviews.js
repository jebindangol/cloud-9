import React from 'react';
import Link from 'next/link';
import ProductRating from '../Products/ProductRating';
import ProductReviewForm from './ProductReviewForm';

function renderReviewComment(userReview, key) {
    return(
        <li className="comment" key={key}>
            <article className="comment-body">
                <footer className="comment-meta">
                    <div className="comment-author vcard">
                        <img src="https://picsum.photos/id/909/100/100" className="avatar" alt="image" />
                        <b className="fn">John Jones</b>
                        <ProductRating
                            value={userReview.rating}
                            text={''}
                        />
                    </div>

                    <div className="comment-metadata">
                        <Link legacyBehavior href="#">
                            <a>
                                <time>April 24, 2019 at 10:59 am</time>
                            </a>
                        </Link>
                    </div>
                </footer>

                <div className="comment-content">
                    <p>{userReview.comment}</p>
                </div>
            </article>
        </li>
    );
}

function getCommentCountText(length) {
    return (length > 1 ? `${length} Reviews` : `${length} Review`)
}

export default function ProductReviews({ review }) {
    return (
        <>
            <div className="comments-area">
                <h3 className="comments-title">{getCommentCountText(review.user_review.length)}</h3>

                <ol className="comment-list">
                    {
                        review.user_review.map((userReview, index) => renderReviewComment(userReview, index))
                    }
                </ol>
                <ProductReviewForm/>
            </div>
        </>
    );
}