import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/UseAxios";
import { AuthContext } from "../../../Provider/AuthProvider";
import { map } from "framer-motion/client";

const ManageProduct = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
  if (!user?.email) return;

  axiosInstance
    .get(`/manager/products/${user.email}`)
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [axiosInstance, user?.email]);


  console.log(products);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
           {
            products.map(product => 
                 <tr>
                   <td>
                     <div className="flex items-center gap-3">
                       <div className="avatar">
                         <div className="mask mask-squircle h-12 w-12">
                           <img
                             src={product?.productImage}
                             alt="Avatar Tailwind CSS Component"
                           />
                         </div>
                       </div>
                       <div>
                         <div className="font-bold">{product?.productName}</div>
                         
                       </div>
                     </div>
                   </td>
                   <td>
                    {product?.price}
                   </td>
                   <td>{product?.paymentOption}</td>
                   <th>
                     <button className="btn btn-ghost btn-xs">Edit</button>
                     <button className="btn btn-ghost btn-xs">Delete</button>
                   </th>
                 </tr>
            )
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
