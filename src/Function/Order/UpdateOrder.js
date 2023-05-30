import { useLocation } from "react-router-dom"
import queryString from "query-string";
import React, { useState } from "react";
import Header from "../../Header";
import CallApi from "../../Api/Api";


export default function UpdateOrder() {
    const location = useLocation();
    const [submit, setSubmit] = useState(false)

    const params = queryString.parse(location.search);

    const [formData, setFormData] = useState({
        "orderDate": params.orderDate,
        "requiredDate": params.requiredDate,
        "shippedDate": params.shippedDate,
        "freight": params.freight,
        "shipName": params.shipName,
        "shipAddress": params.shipAddress,
        "shipCity": params.shipCity,
        "shipRegion": params.shipRegion,
        "shipPostalCode": params.shipPostalCode,
        "shipCountry": params.shipCountry
    })

    const styleForm = {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // goi api
    const handleSubmit = (e) => {
        e.preventDefault();
        CallApi(`api/Orders/${params.orderId}`, 'PUT', formData)
            .then(item => {
                if (item.status == 200) setSubmit(true)
            })
    }

    const handleOkInput = () => {
        alert('Update order successfully')
        setSubmit(false);
    }

    return (
        <React.Fragment>
            <Header />

            {submit && handleOkInput()}
            <div className="table-order">

                <div className="table-order-form">

                    <div style={{ margin: '0px 35%' }} className="create-order">
                        <form style={styleForm} onSubmit={handleSubmit} className="create-orderInfo">
                            <div className="formData">
                                <label>orderID</label>
                                <input name="orderId" defaultValue={params.orderId} readOnly/>
                            </div>
                            <div className="formData">
                                <label>orderDate</label>
                                <input type="datetime-local" name="orderDate" defaultValue={formData.orderDate} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>requiredDate</label>
                                <input type="datetime-local" name="requiredDate" defaultValue={formData.requiredDate} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shippedDate</label>
                                <input type="datetime-local" name="shippedDate" defaultValue={formData.shippedDate} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>freight</label>
                                <input type="number" name="freight" defaultValue={formData.freight} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipName</label>
                                <input type="text" name="shipName" defaultValue={formData.shipName} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipAddress</label>
                                <input type="text" name="shipAddress" defaultValue={formData.shipAddress} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipCity</label>
                                <input type="text" name="shipCity" defaultValue={formData.shipCity} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipRegion</label>
                                <input type="text" name="shipRegion" defaultValue={formData.shipRegion === 'null' ? '' : formData.shipRegion} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipPostalCode</label>
                                <input type="text" name="shipPostalCode" placeholder="option" defaultValue={formData.shipPostalCode} onChange={e => handleChange(e)} />
                            </div>
                            <div className="formData">
                                <label>shipCountry</label>
                                <input type="text" name="shipCountry" defaultValue={formData.shipCountry} onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <button type="submit">Update order</button>
                            </div>

                        </form>
                    </div>





                </div>


            </div>
        </React.Fragment>
    )
}