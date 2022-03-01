import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, removeItem, setCartItem , removeWholeItem } from '../products/product';

function Cart(props) {

    const dispatch = useDispatch();
    const storeProducts = useSelector((state) => state.products);
    const totalPrice = storeProducts.reduce((total, item) => {
        return total + item.init_quantity * item.fixed_price
    }, 0);

    const formatted_price = (price) => {
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }

    const changeQty = (product, action) => {
        let product2 = { ...product };
        if (action == 'decrement') {
            product2.init_quantity--;
            dispatch(removeItem(product2))
        } else {
            product2.init_quantity++;
            dispatch(addItem(product2))
        }
        dispatch(setCartItem(product2));
    }

    const removeItemFromCart = (product) => {
        dispatch(setCartItem({product : product , removeItem : 'removeWholeItem'}));
        dispatch(removeWholeItem(product));
    }

    const disabled = (product) => product.init_quantity === product.quantity ? true : false;

    return (
        props.showModal && (
            <>
                <div className="fixed-cart">
                    <div className="text-center">
                        {storeProducts.length > 0 ? (
                            <div>
                                <h2 className="pt-5 pb-2 text-uppercase d-inline-block">Cart</h2>
                                <small className="text-capitalize fw-bold text-danger">(total item : {storeProducts.length})</small>
                                {storeProducts.map((product) => {
                                    return (
                                        <div key={product.id} className="mb-3 border-bottom py-4 px-3">
                                            <div className="row align-items-center">
                                                <div className="col-2">
                                                    <img src={product.img} alt={product.title} className="img-fluid" />
                                                </div>
                                                <div className="col-3 ps-3 d-flex align-items-center">
                                                    <div className="small fw-bold text-dark">
                                                        {product.title}
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="d-flex w-100">
                                                        <button className="btn btn-sm btn-secondary px-2 rounded-0 rounded" onClick={() => changeQty(product, 'decrement')}>-</button>
                                                        <div className="bg-secondary text-white text-center w-100 mx-1 px-2 d-flex align-items-center justify-content-center">
                                                            {product.init_quantity}
                                                        </div>
                                                        <button className="btn btn-sm btn-secondary py-0 rounded-0 px-2" disabled={disabled(product)} onClick={() => changeQty(product)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="col-4 text-right text-dark d-flex justify-content-between">
                                                    <span className='fw-bold'>{formatted_price(product.fixed_price * product.init_quantity)} {product.currency}</span>
                                                    <button className="btn ms-3 rounded-circle btn-danger btn-sm fw-bold" title="Remove" onClick={() => removeItemFromCart(product)}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-x-lg"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className='p-4 text-end'>
                                    <span className='mb-3 fw-bold d-inline-block fs-5'>Total price: <span className='text-danger'>{formatted_price(totalPrice)} ({storeProducts[0].currency})</span></span>
                                    <Link to='/checkout' className='btn w-100 rounded-pill btn-secondary py-3 text-uppercase' onClick={props.closeModal}>Checkout</Link>
                                </div>
                            </div>
                        ) : (
                            <div className='d-flex h-100 position-absolute w-100 justify-content-center align-items-center'>
                                <h1 className='text-danger fw-bold'>Cart is empty</h1>
                            </div>
                        )}
                    </div>
                </div>
                <div className='overlay' onClick={props.closeModal}></div>
            </>
        )

    )
}

export default Cart;