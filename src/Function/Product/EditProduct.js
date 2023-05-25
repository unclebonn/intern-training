import { useLocation } from "react-router-dom";
import Header from "../../Header";
import queryString from "query-string";
import { useState } from "react";
import CallApi from "../../Api/Api";

export default function EditProduct() {
    const [submit, setSubmit] = useState(false)
    const location = useLocation();
    const params = queryString.parse(location.search);
    const [formData, setFormData] = useState({
        productName: params.productName,
        quantityPerUnit: params.quantityPerUnit,
        unitPrice: params.unitPrice,
        unitsInStock: params.unitsInStock,
        unitsOnOrder: params.unitsOnOrder,
        reorderLevel: params.reorderLevel,
        // discontinued: params.discontinued,
        // orderDetails: []
    })

    const styleInput = {
        width: '210px',
        padding: '8px',
        margin: '10px',
        marginLeft: '0px'
    }

    const handleChange = (e) => {
        const { name, value } = e
        console.log(name, value);
        setFormData({ ...formData, [name]: value })
    }
    // goi api
    const handleSubmit = (e) => {
        e.preventDefault();
        CallApi(`api/Products/${params.productId}`, 'PUT', formData)
            .then(item => setSubmit(true))
    }

    const handleOkInput = () => {
        alert('Update product successfully')
        setSubmit(false);
    }

    const styleForm = {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }

    return (
        <>
            {submit && handleOkInput()}
            <Header />


            <div className="table-order">

                <div className="table-order-form">

                    <div style={{ margin: '0px 35%' }} className="create-order">
                        <form style={styleForm} onSubmit={handleSubmit} className="create-orderInfo">
                            {/* <div className="formData">
                                <label>orderID</label>
                                <input name="orderId" defaultValue="" onChange={e => handleInfo(e)} />
                            </div> */}
                            <div className="formData">
                                <label>ProductId</label>
                                <input type="text" defaultValue={params.productId} readOnly />
                            </div>
                            <div className="formData">
                                <label>Product name</label>
                                <input type="text" name="productName" defaultValue={params.productName} onChange={e => handleChange(e.target)} />
                            </div>
                            <div className="formData">
                                <label>Quantity per unit</label>
                                <input type="text" name="quantityPerUnit" defaultValue={params.quantityPerUnit} onChange={e => handleChange(e.target)} />
                            </div>
                            <div className="formData">
                                <label>Unit price</label>

                                <input type="number" name="unitPrice" defaultValue={params.unitPrice} onChange={e => handleChange(e.target)} />
                            </div>
                            <div className="formData">
                                <label>Units in stock</label>
                                <input type="number" name="unitsInStock" defaultValue={params.unitsInStock} onChange={e => handleChange(e.target)} />
                            </div>
                            {/* <div className="formData">
                                <label>Units in order</label>
                                <input type="number" name="unitsOnOrder" defaultValue={params.unitsOnOrder} onChange={e => handleChange(e.target)} />
                            </div> */}
                            <div className="formData">
                                <label>Reorder level</label>
                                <input type="number" name="reorderLevel" defaultValue={params.reorderLevel} onChange={e => handleChange(e.target)} />
                            </div>
                            <div className="formData">
                                <label>Status</label>
                                <input type="text" name="discontinued" defaultValue={params.discontinued === 'false' ? 'Available' : 'Out of stock'} readOnly />
                            </div>

                            <div className="formData">
                                <button type="submit">Update product</button>
                            </div>

                        </form>
                    </div>





                </div>


            </div>

        </>

    )
}