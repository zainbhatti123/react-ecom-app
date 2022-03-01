import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Filters(props) {

    const products = useSelector((state) => state.allProducts.rec);
    const [brand , setBrand] = useState('');

    let priceArray = products.map((item) => {
        return item.fixed_price;
    });

    const [maxPrice, setMaxPrice] = useState(() => {
        return Math.max(...priceArray);
    });
    const [minPrice, setMinPrice] = useState(() => {
        return Math.min(...priceArray);
    });

    const handlePrice = (val, type) => {
        if (type == 'min') {
            if (val < 0 || val == '') {
                setMinPrice(0)
            } else if (val > maxPrice) {
                setMinPrice(maxPrice)
            } else {
                setMinPrice(parseInt(val));
            }
        } else {
            if(val == ''){
                setMaxPrice(0);
            }else if(val < minPrice){
                setMaxPrice(minPrice)
            }else {
                setMaxPrice(parseInt(val));
            }
            
        }
    }

    const myFilters = {
        'brand' : brand,
        'min_price' : minPrice,
        'max_price' : maxPrice, 
    }

    useEffect(() => {
        props.filter(myFilters);
    }, [brand]);

    const priceFilters = () => {
        props.filter(myFilters);
    }

    let filterdBrand = products.map((item) => item.brand);
    const BrandedArray = [...new Set(filterdBrand)];


    return (
        <div className="filters row mb-4 align-items-end">
            <div className='col-12 text-start mb-2'>
                <h3>Filters :</h3>
            </div>
            <div className="col-3 text-start">
                <label htmlFor="brand">Brand:</label>
                <select name="brands" id="brands" className='form-select' value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Select Brand</option>
                    {BrandedArray.map((item) => {
                        return (
                            <option key={item} value={item}>{item.at(0).toUpperCase()}{item.slice(1)}</option>
                        )
                    })}
                </select>
            </div>
            <div className='col-3 text-start'>
                <div className='row justify-content-between align-items-end'>
                    <div className='col-5'>
                        <label htmlFor="minPrice">Min price:</label>
                        <input type="number" className='form-control' value={minPrice} onChange={(e) => handlePrice(e.target.value, 'min')} />
                    </div>
                    <div className='col-5'>
                        <label htmlFor="maxPrice">Max price:</label>
                        <input type="number" className='form-control' value={maxPrice} onChange={(e) => handlePrice(e.target.value, 'max')} />
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary' onClick={() => priceFilters()}>
                            <i className='fa fa-check'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters;