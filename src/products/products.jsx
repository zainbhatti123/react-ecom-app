import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, setCartItem , getFilteredArray } from "./product"
import Filters from '../filters/filters'
import { useEffect, useState } from 'react';

function Products() {

    const dispatch = useDispatch();
    const storeProducts = useSelector((state) => state.allProducts.rec);
    const storeFilteredArray = useSelector((state) => state.allProducts.filteredArray);
    const [filteredArray, setFilteredArray] = useState(storeProducts);



    useEffect(() => {
        setFilteredArray(storeFilteredArray);
    }, [storeFilteredArray])

    const itemInCart = (product, action) => {
        let product2 = { ...product };
        if (action == 'decrement') {
            product2.init_quantity--;
            dispatch(removeItem(product2));
        } else {
            product2.init_quantity++;
            dispatch(addItem(product2));
        }

        dispatch(setCartItem(product2));
    }

    const disabled = (product) => product.init_quantity === product.quantity ? true : false;

    const getFilters = (filters) => {
        dispatch(getFilteredArray(filters));
    }

    return (
        <div className="container pt-4">
            <Filters filter={(value) => getFilters(value)} />
            {filteredArray.length > 0 ? (
                <div className="row">
                    {filteredArray.map((product) => {
                        return (
                            <div key={product.id} className="col-3 pb-4">
                                <div className="card text-start shadow">
                                    <img src={product.img} className="card-img-top" alt={product.title} style={{ height: '300px', objectFit: 'contain', width: '100%' }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="card-text">{product.description}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item fw-bold">
                                            Price: <span className="text-danger small text-decoration-line-through mx-1" style={{ opacity: '.9' }}>{product.less_price}</span>
                                            {product.fixed_price} {product.currency}
                                        </li>
                                        <li className="list-group-item">Discount: <span className="fw-bold text-danger">{product.discount}</span></li>
                                        <li className="list-group-item">Items in stock :
                                            <span className={(product.quantity - product.init_quantity >= 10 ? 'text-success' : 'text-danger') + ' fw-bold'}> {product.quantity - product.init_quantity}</span></li>
                                    </ul>
                                    <div className="card-body">
                                        {
                                            product.init_quantity == 0 ? (
                                                <button className="btn btn-secondary w-100 text-capitalize" onClick={() => itemInCart(product)}>Add to cart</button>
                                            )
                                                :
                                                (
                                                    <div className="d-flex">
                                                        <button
                                                            onClick={() => product.init_quantity > 0 ? itemInCart(product, 'decrement') : removeItemfromCart(product)}
                                                            className="btn btn-secondary btn-sm">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="25"
                                                                height="25"
                                                                fill="currentColor"
                                                                className="bi bi-dash"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <div
                                                            className="
                                                     bg-secondary
                                                     text-white text-center
                                                     flex-fill
                                                     py-2
                                                     mx-1
                                                     rounded
                                                 "
                                                        >
                                                            {product.init_quantity}
                                                        </div>
                                                        <button
                                                            onClick={() => itemInCart(product)}
                                                            disabled={disabled(product)}
                                                            className="btn btn-secondary btn-sm">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="25"
                                                                height="25"
                                                                fill="currentColor"
                                                                className="bi bi-plus"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path
                                                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <h3 className='text-danger fw-bold mt-5 text-uppercase pt-5'>NO match found !</h3>
            )}
        </div>
    )
}

export default Products;