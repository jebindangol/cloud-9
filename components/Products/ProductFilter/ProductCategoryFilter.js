import React from 'react';
import { getCategoryId } from '../../../helper/categoryHelper';
import { DataContext } from '../../../pages/_app';

const openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    evt.currentTarget.className += "current";
}

function renderProductCaterogyHeader(categoryId, categories) {
    return (
        <ul className="tabs">
            <li
                className={!!categoryId ? '' : 'current'}
                onClick={(e) => openTabSection(e, 'product-container')}
            >
                Top Seller
            </li>
            {categories.map(
                (category, index) => (
                    <li
                        key={index}
                        className={category._id === categoryId ? 'current' : ''}
                        onClick={(e) => openTabSection(e, 'product-container')}
                    >
                        {category.label}
                    </li>
                )
            )}
        </ul>
    );
}

export default function ProductCategoryFilter({ currentCategoryKey }) {
    const { categories } = useContext(DataContext);
    const parentPategoryId = getCategoryId(currentCategoryKey);
    return (
        <>
            {renderProductCaterogyHeader(parentPategoryId, categories)}
        </>
    );
}