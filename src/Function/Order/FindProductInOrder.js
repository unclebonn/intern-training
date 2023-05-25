import { Link, useParams } from "react-router-dom"
import Header from "../../Header";
import React, { useEffect, useState } from "react";
import CallApi from "../../Api/Api";

export default function FindProductInOrder() {


    const [flagCreate, setFlagCreate] = useState(false)
    const [order, setOrder] = useState([])
    const [flag, setFlag] = useState(false)
    const [product, setProduct] = useState([])
    const { id } = useParams();
    const [formData, setFormData] = useState([
        {
            "path": "/quantity",
            "op": "replace",
            "value": 0
        }
    ])

    // show the order of the user
    useEffect(() => {
        CallApi(`api/Orders/${id}`, 'GET', null)
            .then(item => {
                setOrder(typeof item === 'undefined' ? 'This order is not existed' : item.data.orderDetails)
            })
    }, [id])


    // delele item from cart
    const handleDelete = (id, product) => {
        CallApi(`api/OrderDetails?orderId=${id}&productId=${product}`, 'DELETE', null)
            .then(item => {
                console.log(item);
                setOrder(prev => prev.filter(item => item.productId !== product))
            })
    }

    // update quantity
    const handleUpdate = (productID) => {
        CallApi(`api/OrderDetails?orderId=${id}&productId=${productID}`, 'PATCH', formData)
            .then(item => {
                if (item.status === 200) {
                    setFlag(true)
                }
            })

    }

    //show popup when update successfully
    const handleFlat = () => {
        alert("Update sucessfully")
        setFlag(false)
        CallApi(`api/Orders/${id}`, 'GET', null)
            .then(item => {
                setOrder(typeof item === 'undefined' ? 'This order is not existed' : item.data.orderDetails)
            })
    }

    //store value of quantity to update
    const handleChange = (e) => {
        setFormData([
            {
                "path": "/quantity",
                "op": "replace",
                "value": e.target.value
            }
        ])
    }


    //prevent user to type when update quantity 
    const handleKeyDown = (e) => {
        if (typeof e.key === 'string') {
            e.preventDefault()
        }
    }

    // get product for user to add item to cart
    function handleCreate() {
        if (flagCreate) {
            setFlagCreate(false)
        } else {
            setFlagCreate(true)
            CallApi("api/Products", 'GET', null)
                .then(item => {
                    setProduct(item.data)
                })
        }
    }


    // add item to cart
    const handleAdd = (item) => {
        const data = {
            "orderId": id,
            "productId": item.productId,
            "unitPrice": item.unitPrice,
            "quantity": 1,
            "discount": 0
        }

        CallApi(`api/OrderDetails?orderId=${id}&productId=${item.productID}`, 'POST', data)
            .then(item2 => {
                if (typeof item2 === 'undefined') {
                    const quantity = order.filter(product => product.product.productId === item.productId)
                    const storeQuantity = ++quantity[0].quantity
                    CallApi(`api/OrderDetails?orderId=${id}&productId=${item.productId}`, 'PATCH',
                        [{
                            "path": "/quantity",
                            "op": "replace",
                            "value": storeQuantity
                        }])
                        .then(item3 => {
                            if (item3.status === 200) {
                                CallApi(`api/Orders/${id}`, 'GET', null)
                                    .then(item => {
                                        setOrder(item.data.orderDetails)
                                    })
                            }
                        })

                } else if (item2.status === 201) {
                    CallApi(`api/Orders/${id}`, 'GET', null)
                        .then(item => {
                            setOrder(item.data.orderDetails)
                        })
                }
            })
    }









    return (
        <React.Fragment>
            <Header />



            <div className="content">

                {flag && handleFlat()}

                <div>
                    <h1 style={{ textAlign: 'center' }}>Cart of: {id}</h1>
                    {typeof order === 'string' ? <h2 style={{ textAlign: 'center' }}>{order}</h2> :

                        <table border={1} style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>productId</th>
                                    <th>productName</th>
                                    <th>quantityPerUnit</th>
                                    <th>unitPrice</th>
                                    <th>unitsInStock</th>
                                    <th>unitsOnOrder</th>
                                    <th>reorderLevel</th>
                                    <th>discontinued</th>
                                    <th>quantity</th>
                                    <th>Updatequantity</th>
                                    <th>orderDetails</th>
                                    
                                    <th>Remove</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map(product => {

                                    return (
                                        <tr key={product.product.productId}>
                                            <td>{product.product.productId}</td>
                                            <td>{product.product.productName}</td>
                                            <td>{product.product.quantityPerUnit}</td>
                                            <td>{product.product.unitPrice}</td>
                                            <td>{product.product.unitsInStock}</td>
                                            <td>{product.product.unitsOnOrder}</td>
                                            <td>{product.product.reorderLevel}</td>
                                            <td>{(product.product.discontinued) ? 'Out of stock' : product.product.unitsInStock === 0 ? 'Out of stock' : 'Available'}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <input
                                                    autoFocus
                                                    style={{ textAlign: 'center' }}
                                                    onKeyDown={handleKeyDown}
                                                    min={1}
                                                    max={product.product.unitsInStock + product.quantity}
                                                    type="number"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </td>
                                            <td>{product.product.orderDetails}</td>
                                            
                                            <td>
                                                <button onClick={() => handleDelete(id, product.product.productId)}>X</button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleUpdate(product.product.productId)}>Update</button>
                                            </td>
                                        </tr>

                                    )


                                })}
                            </tbody>
                        </table>
                    }
                </div>


                <div style={{ textAlign: 'center', margin: '10px' }}>
                    <button onClick={handleCreate} style={{ fontSize: '20px' }} >+</button>
                </div>

                {flagCreate &&

                    <div >
                        {/* <div style={{ textAlign: 'right', marginRight: '35px', marginBottom: '10px' }}>
                            <label style={{ marginRight: '10px' }}>
                                Find product name:
                            </label>
                            <input
                                defaultValue={''}
                                onChange={(e) => findProduct(e)}
                            />
                        </div> */}

                        <table border={1} style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>productId</th>
                                    <th>productName</th>
                                    <th>quantityPerUnit</th>
                                    <th>unitPrice</th>
                                    <th>Add item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map(item => {
                                    return (
                                        <tr key={item.productId}>
                                            <td>{item.productId}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.quantityPerUnit}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>

                                                <button onClick={() => handleAdd(item)}>Add</button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>


                    </div>

                }
            </div>


        </React.Fragment>

    )
}