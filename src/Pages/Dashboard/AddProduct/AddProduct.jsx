import React from 'react';

const AddProduct = () => {
    return (
      <div className='flex justify-center items-center'>
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" className="input w-full" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    );
};

export default AddProduct;