import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from './Axios/Axios';


const Order = () => {
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(1);
  const [summary, setSummary] = useState({});
  const [single, setSingle] = useState({});
  const { id } = useParams();

  const inc = () => {
    setCount((prev) => prev + 1);
  };

  const dec = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const getsingleproduct = async () => {
    try {
      setloading(true);
      const { data } = await axios(`/products/${id}`);
      setSingle(data);
      setloading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    getsingleproduct();
  }, [id]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSummary({
      productname: single.title,
      productqty: count,
      producttotalamount: single.price * 91 / 100 * count,
    });

    toast.success('Order Submitted!', {
      theme: "dark",
      position: "top-right",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (summary.productname) {
      console.log(summary.productname);
      console.log('Summary after submit:', summary);
    }
  }, [summary]);

  return (
    <form onSubmit={handleSubmit} id='form' className="w-[85%] h-[100vh] overflow-x-hidden p-12">
      <ToastContainer className={`${toast}   absolute`} />
      {!loading ? (
        <div>
          <h3 id='order-summary' className="mx-auto text-center mb-5 text-blue-500 rounded-2xl p-2 border-blue-500 border-2">
            Order Summary
          </h3>
          <div id='first-sec' className="flex w-full h-fit">
            <img src={single.image} className="w-[30vw] h-[30vw]" alt="" />
            <div className="pl-9 pr-9">
              <h2 className="font-bold text-[20px]">{single.title}</h2>
              <h3 className="text-[15px] w-full">
                {single.description && single.description.split(' ').slice(0, 15).join(' ') + '...'}
              </h3>
              <p>Rating⭐⭐⭐⭐(4.3)</p>
              <p className="line-through text-red-600">${single.price}</p>
              <p className="text-green-600">⬇️10% Discount</p>
              <div id='qty-div' className="flex  justify-between">
                <p>${single.price * (90 / 100)}</p>
                <div className="flex gap-1">
                  <p>Qty:</p>
                  <button type="button" onClick={inc}>
                    ⬆️
                  </button>
                  <p>{count}</p>
                  <button type="button" onClick={dec}>
                    ⬇️
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-4" id='first-hr' />
          <div id='second-sec' className="flex flex-col gap-3 p-9 pt-3">
            <div id='price-details'>
              <h1 className="text-2xl font-medium">Price Details</h1>
            </div>
            <hr />
            <div className="price-mid flex items-center justify-between">
              <h3>Price({count} item)</h3>
              <p>${(single.price * (90 / 100) * count).toFixed(2)}</p>
            </div>
            <div className="price-mid flex items-center justify-between">
              <h3>Platform Fee</h3>
              <p>${(single.price * (2 / 100) * count).toFixed(2)}</p>
            </div>
            <div id='price-mid-4' className="price-mid flex items-center justify-between">
              <h3>Delivery Charges</h3>
              <p className="text-green-600">
                <span className="text-gray-800 line-through mr-3">$4</span>
                FREE DELIVERY
              </p>
            </div>
            <hr />
            <div id='total-amount' className="flex items-center justify-between">
              <h1 className="text-2xl font-medium">Total Amount</h1>
              <p>${((single.price * (90 / 100)) + (single.price * (1 / 100))) * count}</p>
            </div>
          </div>
          <hr />
          <div className="w-full flex p-2 justify-center">
            <input
              id='order-button'
              type="submit"
              value="Place order"
              className="bg-orange-600 active:bg-orange-700 text-white py-4 px-20 text-2xl rounded-2xl cursor-pointer"
            />
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </form>
  );
};

export default Order;
