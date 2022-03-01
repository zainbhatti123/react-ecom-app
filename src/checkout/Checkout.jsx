import { useSelector } from "react-redux"

export default function Checkout() {

    const cartedProducts = useSelector((state) => state.products);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 text-center py-4">
                    <h3>Checkout</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-9 mx-auto">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th width="50px">Sr #</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Actual Price</th>
                                <th>Discount</th>
                                <th>Unit Price</th>
                                
                            </tr>
                        </thead>
                        {cartedProducts.length > 0 ? (
                            <tbody>
                                {cartedProducts.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.init_quantity}</td>
                                            <td>{item.less_price * item.init_quantity}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.fixed_price * item.init_quantity}</td>
                                            
                                        </tr>
                                    )
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="7" className="text-danger fw-bold">Items not Found</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}