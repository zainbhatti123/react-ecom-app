import logo from '../logo.svg';
import { useSelector } from 'react-redux';
import Cart from '../checkout/cart';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {

    const storeProducts = useSelector((state) => state.products);
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    const route = useLocation();

    return (
        <>
            <header className="fixed-top bg-light border-bottom py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-1">
                            <img src={logo} alt="" className="img-fluid" />
                        </div>
                        <div className='col-11'>
                            <nav className='navbar'>
                                <ul className='d-flex align-items-center list-unstyled mb-0 w-100'>
                                    <li className='nav-item'>
                                        <Link to='/' className='nav-link text-dark'>Home</Link>
                                    </li>
                                    {route.pathname !== '/checkout' && (
                                        <li className='ms-auto'>
                                            <button className='btn btn-light btn-lg shadow rounded-circle position-relative' onClick={() => setShowModal(true)}>
                                                <i className='fa fa-shopping-bag'></i>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                                    {storeProducts.length}
                                                </span>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <Cart showModal={showModal} closeModal={closeModal} />
        </>
    )
}

export default Header;