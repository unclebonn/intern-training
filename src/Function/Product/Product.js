import React, { useEffect, useState } from "react";
import Header from "../../Header";
import CallApi from "../../Api/Api";
import { Link } from "react-router-dom";

export default function Product() {

    const [element, setElement] = useState('td')
    const [products, setProducts] = useState([])
    const [storeChangeValue, setStoreChangeValue] = useState()

    //Finding one product
    const handleFindProduct = () => {
        //check the input empty
        if (storeChangeValue === '') {
            setProducts('This item is not existed')
        } else {
            CallApi(`api/Products/${storeChangeValue}`, 'GET', null)
                .then(item => {
                    // check the item is existed or not 
                    setProducts(typeof item === 'undefined' ? 'This item is not existed' : [item.data])
                })
        }



    }


    //Get all products
    useEffect(() => {
        CallApi('api/Products', 'GET', null)
            .then(item => {
                setProducts(item.data)
            })
    }, [])


    //Delete product
    const handleDeleteProduct = (id) => {
        CallApi(`api/Products/${id}`, 'DELETE', null)
            .then(item => {
                if (item.status === 204) {
                    setProducts(prev => {
                        let arrlist = prev.filter(product => product.productId !== id)
                        return arrlist
                    })
                }

            })
    }


    function List({ product, element }) {
        let Component = element;
        const data = {
            productId: product.productId,
            productName: product.productName,
            quantityPerUnit: product.quantityPerUnit,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock,
            unitsOnOrder: product.unitsOnOrder,
            reorderLevel: product.reorderLevel,
            discontinued: product.discontinued,
            orderDetails: product.orderDetails

        }
        // create queryString in URL
        const queryString = new URLSearchParams(data).toString();
        return (
            <tr className="listProducts">
                <Component >{product.productId}</Component>
                <Component >{product.productName}</Component>
                <Component >{product.quantityPerUnit}</Component>
                <Component >{product.unitPrice}</Component>
                <Component >{product.unitsInStock}</Component>
                <Component >{product.unitsOnOrder}</Component>
                <Component >{product.reorderLevel}</Component>
                <Component >{(product.discontinued) ? 'Out of stock' : 'Available'}</Component>
                <Component >{product.orderDetails}</Component>
                <Component>
                    <button onClick={() => handleDeleteProduct(product.productId)}>X</button>
                </Component>
                <Component>
                    <Link to={`edit?${queryString}`}>
                        <button>Update</button>
                    </Link>
                </Component>
            </tr>
        )



    }

    return (
        <React.Fragment>

            <Header />

            <div className="content">

                <div className="btn-product">
                    <div className="btn-create-product">
                        <Link to={{ pathname: "/products/createProduct" }}>
                            <button >Create product</button>
                        </Link>
                    </div>
                    <div>
                        <input
                            type="number"
                            required="required"
                            onChange={e => setStoreChangeValue(e.target.value)}
                        />
                        <button onClick={handleFindProduct}>Find product</button>
                    </div>

                </div>

                {/* if the item return a string which means it not existed */}
                {typeof products === 'string' ? <h2 style={{ textAlign: 'center' }}>{products}</h2> :
                    <table border={1} >
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
                                <th>orderDetails</th>
                                <th>Remove</th>
                                <th>Update</th>

                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                return (
                                    <List key={product.productId} product={product} element={element} />
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </React.Fragment>

    )
}