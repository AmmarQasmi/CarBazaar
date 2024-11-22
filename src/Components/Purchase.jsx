import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Purchase = () => {
  const [cars, setCars] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [paymentType, setPaymentType] = useState('Credit Card');
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const fetchCarsAndPosts = useCallback(async () => {
    try {
      setLoading(true);
      const [carsResponse, postsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/vehicles'),
        axios.get('http://localhost:5000/api/post')
      ]);

      if (carsResponse.data && carsResponse.data.status === "success") {
        const availableCars = carsResponse.data.data.filter(car => car.v_status === "Available" && car.offeredby === "CB");
        setCars(availableCars);
        console.log('Available cars:', availableCars);
      } else {
        setError('No cars found.');
        console.error('No cars found in the response:', carsResponse.data);
      }

      if (postsResponse.data && postsResponse.data.status === "success") {
        setPosts(postsResponse.data.data);
        console.log('All posts:', postsResponse.data.data);
      } else {
        console.error('No posts found in the response:', postsResponse.data);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarsAndPosts();
  }, [fetchCarsAndPosts]);

  const getPostForCar = useCallback((carMake, carModel, carYear) => {
    return posts.find(post => 
      post.vehicle_make === carMake && 
      post.vehicle_model === carModel && 
      post.vehicle_year === carYear &&
      post.vehicle_by === "CB"
    );
  }, [posts]);

  const handleCarSelect = useCallback((car) => {
    const associatedPost = getPostForCar(car.make, car.model, car.year);
    setSelectedCar({ ...car, post: associatedPost });
    console.log('Selected car:', car, 'Associated post:', associatedPost);
  }, [getPostForCar]);

  const handlePurchase = useCallback(async () => {
    if (!selectedCar) {
      setError('No car selected. Please select a car before purchasing.');
      return;
    }

    if (!selectedCar.post) {
      setError('No valid post found for the selected car. Please try again later.');
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) {
      setError('User not logged in. Please log in to make a purchase.');
      return;
    }

    try {
      const purchaseData = {
        purchase_price: selectedCar.price,
        payment_type: paymentType,
        post_post_id: selectedCar.post.post_id,
        vehicle_v_id: selectedCar.v_id,
        email: email
      };

      console.log('Sending purchase data:', purchaseData);

      const response = await axios.post('http://localhost:5000/api/purchase', purchaseData);
      console.log('Purchase response:', response.data);

      setPurchaseStatus({
        success: true,
        message: response.data.message,
        purchaseId: response.data.purchaseId,
        userName: response.data.userName
      });
      setCars(prevCars => prevCars.filter(car => car.v_id !== selectedCar.v_id));
      setSelectedCar(null);
    } catch (error) {
      console.error('Purchase error:', error.response?.data || error.message);
      setPurchaseStatus({
        success: false,
        message: error.response?.data?.message || 'Purchase failed',
        error: error.response?.data?.error || 'An unexpected error occurred'
      });
    }
  }, [selectedCar, paymentType]);

  if (loading) {
    return <p className="text-red-500 text-center text-xl">Loading data...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-900 min-h-screen mt-10">
      {/* Car List */}
      <div className="p-6 lg:w-2/3">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Available Cars for Purchase</h1>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => {
              const associatedPost = getPostForCar(car.make, car.model, car.year);
              return (
                <div 
                  key={car.v_id} 
                  className={`car-card bg-gray-800 rounded-lg shadow-lg p-4 border ${selectedCar?.v_id === car.v_id ? 'border-red-500' : 'border-gray-700'} cursor-pointer`}
                  onClick={() => handleCarSelect(car)}
                >
                  <img src={car.vehicle_image} alt={`${car.make} ${car.model}`} className="rounded-md mb-2 w-full h-48 object-cover" />
                  <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                  <p className="text-sm text-gray-400">Year: {car.year}</p>
                  <p className="text-lg font-semibold text-red-500">Price: ${car.price}</p>
                  <p className="text-sm text-gray-400">Status: {car.v_status}</p>
                  <p className="text-sm text-gray-400">Offered by: {car.offeredby}</p>
                  {associatedPost ? (
                    <>
                      <p className="text-sm text-gray-400">Post ID: {associatedPost.post_id}</p>
                      <p className="text-sm text-gray-400">Seller: {associatedPost.seller_name}</p>
                      <p className="text-sm text-gray-400">Location: {associatedPost.location}</p>
                    </>
                  ) : (
                    <p className="text-sm text-red-400">No post available</p>
                  )}
                  <p className="text-sm text-gray-400">Vehicle ID: {car.v_id}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-400">No cars available for purchase.</p>
        )}
      </div>

      {/* Purchase Form */}
      <div className="p-6 lg:w-1/3 bg-gray-800">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Purchase Details</h2>
        {selectedCar ? (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{selectedCar.make} {selectedCar.model}</h3>
            <p className="text-gray-300 mb-2">Year: {selectedCar.year}</p>
            <p className="text-gray-300 mb-2">Price: ${selectedCar.price}</p>
            {selectedCar.post && (
              <>
                <p className="text-gray-300 mb-2">Seller: {selectedCar.post.seller_name}</p>
                <p className="text-gray-300 mb-2">Location: {selectedCar.post.location}</p>
              </>
            )}
            <div className="mb-4">
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-300 mb-2">
                Payment Type
              </label>
              <select
                id="paymentType"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
              disabled={!selectedCar.post}
            >
              {selectedCar.post ? 'Confirm ' : 'Post Unavailable'}
            </button>
          </div>
        ) : (
          <p className="text-gray-400">Select a car to purchase</p>
        )}
        {purchaseStatus && (
          <div className={`mt-4 p-4 rounded-md ${purchaseStatus.success ? 'bg-green-600' : 'bg-red-600'}`}>
            <p className="font-bold">{purchaseStatus.message}</p>
            {purchaseStatus.success && (
              <div className="mt-2">
                <p>Purchase ID: {purchaseStatus.purchaseId}</p>
                <p>Thank you, {purchaseStatus.userName}!</p>
                <p className="mt-2">An email confirmation has been sent to your registered email address.</p>
              </div>
            )}
            {!purchaseStatus.success && (
              <p className="mt-2">Error details: {purchaseStatus.error}</p>
            )}
          </div>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Purchase;

