import React, { useEffect, useState } from "react";
import Header from "../../Header";
import CallApi from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";


export default function Order() {

    const [order, setOrder] = useState([])
    const [storeChangeValue, setStoreChangeValue] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        CallApi('api/Orders', 'GET', null)
            .then(item => {
                setOrder(item.data)
            })

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/orders/find/${storeChangeValue}`)
    }


    const handleUpdate = (order) => {
        const data = {
            "orderId": order.orderId,
            "orderDate": order.orderDate,
            "requiredDate": order.requiredDate,
            "shippedDate": order.shippedDate,
            "freight": order.freight,
            "shipName": order.shipName,
            "shipAddress": order.shipAddress,
            "shipCity": order.shipCity,
            "shipRegion": order.shipRegion,
            "shipPostalCode": order.shipPostalCode,
            "shipCountry": order.shipCountry
        }
        const queryString = new URLSearchParams(data).toString();

        navigate(`/orders/updateOrder?${queryString}`)
    }

    const handleDelete = (orderId) => {
        CallApi(`api/Orders/${orderId}`, 'DELETE', null)
            .then(item => {
                setOrder(prev => prev.filter(item => item.orderId !== orderId))
            })
    }

    return (
        <React.Fragment>
            <Header />

            <div className="content">
                <div className="btn-product">
                    <div className="btn-create-product">
                        <Link to={{ pathname: "/orders/createOrder" }}>
                            <button >Create order</button>
                        </Link>
                    </div>
                    <div>
                        <form onSubmit={e => handleSubmit(e)}>
                            <input
                                style={{ width: '250px' }}
                                type="number"
                                required
                                placeholder="Type the number of orderID"
                                onChange={e => setStoreChangeValue(e.target.value)}
                            />
                            <button type="submit">Find order</button>


                        </form>

                    </div>

                </div>



                <table border={1} style={{ textAlign: 'center' }} >
                    <thead>
                        <tr>
                            <th>orderId</th>
                            <th>orderDate</th>
                            <th>requiredDate</th>
                            <th>shippedDate</th>
                            <th>freight</th>
                            <th>shipName</th>
                            <th>shipAddress</th>
                            <th>shipCity</th>
                            <th>shipRegion</th>
                            <th>shipPostalCode</th>
                            <th>shipCountry</th>
                            <th>orderDetails</th>
                            <th>Views Details</th>
                            <th>Remove</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>


                        {order.map(item =>
                            <tr>
                                <td>{item.orderId}</td>
                                <td>{item.orderDate}</td>
                                <td>{item.requiredDate}</td>
                                <td>{item.shippedDate}</td>
                                <td>{item.freight}</td>
                                <td>{item.shipName}</td>
                                <td>{item.shipAddress}</td>
                                <td>{item.shipCity}</td>
                                <td>{item.shipRegion}</td>
                                <td>{item.shipPostalCode}</td>
                                <td>{item.shipCountry}</td>
                                <td>{item.orderDetails}</td>
                                <td>
                                    <Link to={`http://localhost:3000/orders/find/${item.orderId}`}>
                                        <button>Details</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item.orderId)}>X</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(item)}>Update</button>
                                </td>
                            </tr>

                        )}
                    </tbody>
                </table>


            </div>


        </React.Fragment>
    )
}