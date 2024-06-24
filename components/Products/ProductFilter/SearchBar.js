import React, { useState, useContext } from 'react';
import { DataContext } from '../../../pages/_app';
import { FilteredProductListContext } from '../Products';

export default function SearchBar() {
    const { filteredProducts, setFilteredProducts } = useContext(FilteredProductListContext);
    const { products } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const searchTermFiltered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(searchTermFiltered);
    };

    return (
        <>
            <form className="search-form">
                <label>
                    <span className="screen-reader-text">Search for:</span>
                    <input
                        type="search"
                        className="search-field"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </label>
            </form>
        </>
    );
}
