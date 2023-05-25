import { Link } from "react-router-dom";

export default function Header(props) {


    return (

        <div className="header">
            <div className="hover">
                <div className="symbolize">
                    <h1>Admin</h1>
                </div>
                <div className="function">
                    <Link to={'/products'}>Product</Link>
                    <Link to={'/orders'}>Order</Link>
                    {/* <Link to={'/orderdetails'}>Order Details</Link> */}
                </div>
            </div>
        </div>
    )
}