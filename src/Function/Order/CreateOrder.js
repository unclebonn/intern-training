import React, { useEffect, useState } from "react";
import Header from "../../Header";
import CallApi from "../../Api/Api";


export default function CreateOrder() {

    const [flag, setFlag] = useState(false)
    const [inFo, setInfo] = useState(
        {
            "orderDate": "",
            "requiredDate": "",
            "shippedDate": "",
            "freight": "",
            "shipName": "",
            "shipAddress": "",
            "shipCity": "",
            "shipRegion": "",
            "shipPostalCode": "",
            "shipCountry": ""
        }
    )


    // Update information 
    const handleInfo = (e) => {
        const { name, value } = e.target
        setInfo({ ...inFo, [name]: value })
    }

    const styleForm = {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        CallApi('api/Orders', 'POST', inFo)
            .then(item => {
                if (item.status === 201) {
                    setFlag(true)
                }
            })
    }

    const handleFlag = () => {
        alert("Created sucessfully")
        setFlag(false)
    }

    console.log(inFo);

    return (
        <React.Fragment>
            <Header />
            {flag && handleFlag()}
            <div className="table-order">

                <div className="table-order-form">

                    <div style={{ margin: '0px 35%' }} className="create-order">
                        <form style={styleForm} onSubmit={handleSubmit} className="create-orderInfo">
                            {/* <div className="formData">
                                <label>orderID</label>
                                <input name="orderId" defaultValue="" onChange={e => handleInfo(e)} />
                            </div> */}
                            <div className="formData">
                                <label>orderDate</label>
                                <input type="datetime-local" name="orderDate" defaultValue={inFo.orderDate} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>requiredDate</label>
                                <input type="datetime-local" name="requiredDate" defaultValue={inFo.requiredDate} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shippedDate</label>
                                <input type="datetime-local" name="shippedDate" defaultValue={inFo.shippedDate} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>freight</label>
                                <input type="number" name="freight" defaultValue={inFo.freight} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipName</label>
                                <input type="text" name="shipName" defaultValue={inFo.shipName} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipAddress</label>
                                <input type="text" name="shipAddress" defaultValue={inFo.shipAddress} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipCity</label>
                                <input type="text" name="shipCity" defaultValue={inFo.shipCity} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipRegion</label>
                                <input type="text" name="shipRegion" defaultValue={inFo.shipRegion} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <label>shipPostalCode</label>
                                <input type="text" name="shipPostalCode" placeholder="option" defaultValue={inFo.shipPostalCode} onChange={e => handleInfo(e)} />
                            </div>
                            <div className="formData">
                                <label>shipCountry</label>
                                <input type="text" name="shipCountry" defaultValue={inFo.shipCountry} onChange={e => handleInfo(e)} required />
                            </div>
                            <div className="formData">
                                <button type="submit">Create order</button>
                            </div>

                        </form>
                    </div>





                </div>


            </div>
        </React.Fragment>
    )
}