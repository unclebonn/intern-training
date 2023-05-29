import { useState } from "react";
import Header from "../../Header";
import CallApi from "../../Api/Api";
import axios from "axios";

export default function CreateProduct() {

    const [submit, setSubmit] = useState(false)
    const [formData, setFormData] = useState({
        productName: "",
        quantityPerUnit: "",
        unitPrice: 0,
        unitsInStock: 0,
        discontinued: false,
        orderDetails: []
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
        CallApi(`api/Products`, 'POST', formData)
            .then(item => {
                console.log(item.headers);
                setSubmit(true)
            })
    }

    const handleOkAlert = () => {
        alert('Create product successfully')
        setSubmit(false)
    }


   
    return (
        <>
            <Header />
            {submit && handleOkAlert()}
            <div className="table-order">

                <div className="table-order-form">

                    <div style={{ margin: '0px 35%' }} className="create-order">
                        <form style={styleForm} onSubmit={handleSubmit} className="create-orderInfo">
                            {/* <div className="formData">
                                <label>orderID</label>
                                <input name="orderId" defaultValue="" onChange={e => handleChange(e)} />
                            </div> */}
                            <div className="formData">
                                <label>productName</label>
                                <input type="text" name="productName" onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>quantityPerUnit</label>
                                <input type="text" name="quantityPerUnit" onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>unitPrice</label>
                                <input type="number" name="unitPrice" onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>unitsInStock</label>
                                <input type="number" name="unitsInStock" onChange={e => handleChange(e)} required />
                            </div>
                            <div className="formData">
                                <label>discontinued</label>
                                <input type="text" name="discontinued" defaultValue={'false'} onChange={e => handleChange(e)} readOnly />
                            </div>

                            <div className="formData">
                                <button type="submit">Create product</button>
                            </div>

                        </form>
                    </div>





                </div>


            </div>
        </>

    )
}