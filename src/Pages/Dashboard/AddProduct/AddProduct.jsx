import axios from "axios";
import { div } from "framer-motion/client";
import React, { useContext, useState } from "react";
import useAxios from "../../../hooks/UseAxios";
import { AuthContext } from "../../../Provider/AuthProvider";

const AddProduct = () => {
  const [showHome, setShowHome] = useState(false);
  const {user} = useContext(AuthContext);

  const axiosInstance = useAxios();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const moq = form.moq.value;
    const productImage = form.images;

    const file = productImage.files[0];

    const paymentOption = form.paymentOption.value;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=8e77ac3eea553e979eb569aacc9010ac`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      productName,
      description,
      category,
      price: parseInt(price),
      quantity: parseInt(quantity),
      moq: parseInt(moq),
      productImage: mainPhotoUrl,
      paymentOption,
      showHome,
      managerEmail: user?.email,
    };


    if (res.data.success == true) {

      axios
        axiosInstance.post("/products", formData)
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleAddProduct}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8 space-y-6 mt-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="font-medium block mb-1">Product Name / Title</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
            placeholder="e.g. Premium Cotton Shirt"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="font-medium block mb-1">Product Description</label>
          <textarea
            name="description"
            className="w-full p-3 border rounded-lg h-28 sm:h-32 focus:ring focus:ring-blue-200 text-sm sm:text-base"
            placeholder="Detailed product description..."
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium block mb-1">Category</label>
          <select
            name="category"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
          >
            <option value="">Select Category</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Jacket">Jacket</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="font-medium block mb-1">Price (৳)</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
            placeholder="e.g. 1290"
          />
        </div>

        {/* Quantity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="font-medium block mb-1">Available Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
              placeholder="e.g. 50"
            />
          </div>

          <div>
            <label className="font-medium block mb-1">
              Minimum Order Quantity (MOQ)
            </label>
            <input
              type="number"
              name="moq"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
              placeholder="e.g. 2"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-medium block mb-1">Product Images</label>
          <input
            type="file"
            name="images"
            multiple
            className="w-full p-2 border rounded-lg text-sm sm:text-base"
          />
        </div>

        {/* Demo Video Link */}
        <div>
          <label className="font-medium block mb-1">
            Demo Video Link (Optional)
          </label>
          <input
            type="url"
            name="video"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
            placeholder="https://youtube.com/demo"
          />
        </div>

        {/* Payment Option */}
        <div>
          <label className="font-medium block mb-1">Payment Option</label>
          <select
            name="paymentOption"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base"
          >
            <option value="">Select Payment Type</option>
            <option value="cod">Cash on Delivery</option>
            <option value="payfirst">Pay First</option>
          </select>
        </div>

        {/* Show on Home Page */}
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="checkbox"
            checked={showHome}
            onChange={() => setShowHome(!showHome)}
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          <span className="font-medium text-sm sm:text-base">
            Show on Home Page
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
