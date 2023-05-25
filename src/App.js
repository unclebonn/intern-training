import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Product from './Function/Product/Product';
import Order from './Function/Order/Order';
import OrderDetails from './Function/OrderDetails';
import EditProduct from './Function/Product/EditProduct';
import CreateProduct from './Function/Product/CreateProduct';
import FindProductInOrder from './Function/Order/FindProductInOrder';
import CreateOrder from './Function/Order/CreateOrder';
import UpdateOrder from './Function/Order/UpdateOrder';






function App() {

  return (
    <React.Fragment>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/products' element={<Product />}></Route>
          <Route path='/orders' element={<Order />}></Route>
          <Route path='/orderdetails' element={<OrderDetails />}></Route>
          <Route path='/products/edit' element={<EditProduct />}></Route>
          <Route path='/products/createProduct' element={<CreateProduct />}></Route>
          <Route path='/orders/find/:id' element={<FindProductInOrder />}></Route>
          <Route path='/orders/createOrder' element={<CreateOrder />}></Route>
          <Route path='/orders/updateOrder' element={<UpdateOrder />}></Route>
        </Routes>
      </BrowserRouter>

    </React.Fragment>
  )















  // const [product, setProduct] = useState([])


  // const fetchUsers = () => {

  //   // Where we're fetching data from
  //   return fetch(" http://localhost:5170/api/Orders/10248")
  //     // We get the API response and receive data in JSON format
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProduct(data.orderDetails)
  //       console.log(data.orderDetails);
  //     })
  //     .catch((error) => console.error(error));

  // }

  // useEffect(() => {
  //   fetchUsers();
  // }, [])

  // return (
  //   <React.Fragment>
  //     <table border={1}>
  //       <tr>
  //         <th>OrderId</th>
  //         <th>ProductId</th>
  //         <th>productName</th>
  //         <th>quantityPerUnit</th>
  //         <th>unitPrice</th>
  //         <th>unitsInStock</th>
  //         <th>unitsOnOrder</th>
  //       </tr>
  //       {product.map(item => {
  //         console.log(item);
  //         return (
  //           <tr>
  //             <td>{item.orderId}</td>
  //             <td>{item.product.productId}</td>
  //             <td>{item.product.productName}</td>
  //             <td>{item.product.quantityPerUnit}</td>
  //             <td>{item.product.unitPrice}</td>
  //             <td>{item.product.unitsInStock}</td>
  //             <td>{item.product.unitsOnOrder}</td>
  //           </tr>
  //         )
  //       })}
  //     </table>
  //     {/* <button onClick={handlePopup}>Click</button> */}
  //   </React.Fragment>
  // )


}

export default App;
