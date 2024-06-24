import React from 'react'

function renderAStar(color, value, index) {

    return (
        <span className="rating-star">
            <i
                style={{ color }}
                className={
                    value >= index
                        ? "fas fa-star"
                        : value >= (index - 0.5)
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }
            ></i>
        </span>
    );
}
const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            {renderAStar(color, value, 1)}
            {renderAStar(color, value, 2)}
            {renderAStar(color, value, 3)}
            {renderAStar(color, value, 4)}
            {renderAStar(color, value, 5)}
            {!!text && <span> `(${text})`</span>}
        </div>
    )
}

Rating.defaultProps = {
    color: '#ffa200'
}

export default Rating
