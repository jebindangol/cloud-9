import React, { useState, useContext } from 'react';
import { DataContext } from '../../../pages/_app';
import { FilteredProductListContext } from '../Products';
import Slider from '@mui/material/Slider';

export default function ProductPriceSelector() {
    const { products } = useContext(DataContext);
    const { filteredProducts, setFilteredProducts } = useContext(FilteredProductListContext);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const minPriceRange = 20;

    function valueLabelFormat(value) {
        return `$${value}`;
    }

    const handlePriceRangeSearch = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPriceRange([Math.min(newValue[0], priceRange[1] - minPriceRange), priceRange[1]]);
        } else {
            const val = [
                priceRange[0],
                Math.max(
                    newValue[1],
                    priceRange[0] + minPriceRange
                )
            ]
            setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minPriceRange)]);
        }
        const priceRangeFiltered = products.filter(
            (product) => {
                if ((Number(product.price.amount) >= priceRange[0] && Number(product.price.amount) <= priceRange[1])) {
                    return true;
                }
            });
        setFilteredProducts(priceRangeFiltered);
    };

    return (
        <>

            <Slider
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                value={priceRange}
                step={5}
                min={0}
                max={1001}
                onChange={handlePriceRangeSearch}
                valueLabelFormat={valueLabelFormat}
                valueLabelDisplay="auto"
                getAriaValueText={valueLabelFormat}
                track={'inverted'}
                disableSwap
            />
        </>
    );
}
