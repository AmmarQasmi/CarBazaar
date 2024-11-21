import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, EyeOff, Eye, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import axios from 'axios';

const Feeds = () => {
    const [cbPosts, setCbPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [filteredCbPosts, setFilteredCbPosts] = useState([]);
    const [filteredUserPosts, setFilteredUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const cbScrollRef = useRef(null);
    const userScrollRef = useRef(null);

    const [makeFilter, setMakeFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/post');
                const fetchedPosts = response.data.data.map((post) => ({
                    id: post.post_id,
                    description: post.post_description,
                    price: post.vehicle_price,
                    sellerName: post.seller_name,
                    sellerPhone: post.seller_phone_no,
                    sellerEmail: post.seller_email,
                    Location: post.location,
                    vehicleMake: post.vehicle_make,
                    vehicleModel: post.vehicle_model,
                    vehicleYear: post.vehicle_year,
                    fuelType: post.vehicle_fuel_type,
                    vehicleImage: post.vehicle_image,
                    offeredby: post.vehicle_by,
                    isHidden: false,
                }));
                const cbPosts = fetchedPosts.filter(post => post.offeredby === 'CB');
                const userPosts = fetchedPosts.filter(post => post.offeredby !== 'CB');
                setCbPosts(cbPosts);
                setUserPosts(userPosts);
                setFilteredCbPosts(cbPosts);
                setFilteredUserPosts(userPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleBuy = (postId) => {
        console.log(`Buying post with id: ${postId}`);
        // Implement buy logic here
    };

    const handleHide = (postId, isCbPost) => {
        const updatePosts = (posts) => posts.map(post =>
            post.id === postId ? { ...post, isHidden: true } : post
        );
        if (isCbPost) {
            setCbPosts(updatePosts);
            setFilteredCbPosts(updatePosts);
        } else {
            setUserPosts(updatePosts);
            setFilteredUserPosts(updatePosts);
        }
    };

    const handleUnhide = (postId, isCbPost) => {
        const updatePosts = (posts) => posts.map(post =>
            post.id === postId ? { ...post, isHidden: false } : post
        );
        if (isCbPost) {
            setCbPosts(updatePosts);
            setFilteredCbPosts(updatePosts);
        } else {
            setUserPosts(updatePosts);
            setFilteredUserPosts(updatePosts);
        }
    };

    const scroll = (direction, ref) => {
        const { current } = ref;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleFilterChange = () => {
        const applyFilter = (posts) => posts.filter((post) => {
            const isMakeMatch = makeFilter ? post.vehicleMake.toLowerCase().includes(makeFilter.toLowerCase()) : true;
            const isYearMatch = yearFilter ? post.vehicleYear.toString() === yearFilter : true;
            const isPriceMatch =
                (minPrice ? post.price >= parseFloat(minPrice) : true) &&
                (maxPrice ? post.price <= parseFloat(maxPrice) : true);
            return isMakeMatch && isYearMatch && isPriceMatch;
        });
    
        setFilteredCbPosts(applyFilter(cbPosts));
        setFilteredUserPosts(applyFilter(userPosts));
    };
    
    const PostCard = ({ post, isCbPost }) => (
        <div className="bg-gray-900 border border-red-500 rounded-lg overflow-hidden w-72 flex-shrink-0 m-2 relative flex flex-col">
            <div className="p-4 flex-grow">
                <div className="flex flex-col mb-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-red-400 mb-2">{post.sellerName}</h3>
                        {!post.isHidden && (
                            <button
                                className="flex items-center px-2 py-1 text-xs border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                onClick={() => handleHide(post.id, isCbPost)}
                            >
                                <EyeOff className="w-3 h-3 mr-1" />
                                Hide
                            </button>
                        )}
                    </div>
                    {!post.isHidden && (
                        <p className="mb-2 text-sm text-gray-300">
                            {post.description.length > 100 ? `${post.description.substring(0, 100)}...` : post.description}
                            <br />
                            <span className="text-red-300 text-xs">{post.Location}</span>
                        </p>
                    )}
                </div>
    
                <div className="mb-4 aspect-w-16 aspect-h-9">
                    {post.isHidden ? (
                        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                            <button
                                className="flex items-center px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                onClick={() => handleUnhide(post.id, isCbPost)}
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                Unhide Post
                            </button>
                        </div>
                    ) : (
                        <img
                            src={post.vehicleImage}
                            alt={`${post.vehicleMake} ${post.vehicleModel}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    )}
                </div>
    
                {!post.isHidden && (
                    <>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                            <p><span className="font-semibold text-gray-100">Make:</span> {post.vehicleMake}</p>
                            <p><span className="font-semibold text-gray-100">Model:</span> {post.vehicleModel}</p>
                            <p><span className="font-semibold text-gray-100">Year:</span> {post.vehicleYear}</p>
                            <p><span className="font-semibold text-gray-100">Fuel:</span> {post.fuelType}</p>
                            <p><span className="font-semibold text-gray-100">Price:</span> ${post.price}</p>
                        </div>
    
                        <div className="mb-10">
                            <p><span className="font-semibold text-gray-100">Contact:</span> {post.sellerPhone}</p>
                        </div>
                    </>
                )}
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gray-900 flex justify-center p-2">
                <button
                    className="flex items-center px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleBuy(post.id)}
                >
                    <DollarSign className="w-4 h-4 mr-1" />
                    Buy Now
                </button>
            </div>
        </div>
    );      
    
    if (loading) {
        return <div className="text-white text-center">Loading posts...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-10 overflow-x-hidden mt-10 sm:mt-15">
            <div className="w-[70%] mx-auto mb-8">
                <h2 className="text-2xl font-bold mb-4 text-red-400">Filter Cars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Make"
                        value={makeFilter}
                        onChange={(e) => setMakeFilter(e.target.value)}
                        className="bg-gray-800 text-white rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Year"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="bg-gray-800 text-white rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="bg-gray-800 text-white rounded p-2"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="bg-gray-800 text-white rounded p-2"
                    />
                </div>
                <button
                    onClick={handleFilterChange}
                    className="mt-4 flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    <Search className="w-4 h-4 mr-2" />
                    Apply Filters
                </button>
            </div>

            <div className="relative w-[70%] mx-auto">
                <h2 className="text-2xl font-bold mt-4 mb-4 text-red-400">Managed by CarBazaar</h2>
                <div ref={cbScrollRef} className="flex overflow-x-auto space-x-4 pb-4 mb-8 scrollbar-hide">
                    {filteredCbPosts.length === 0 && <p className="text-gray-300">No CB offers to display.</p>}
                    {filteredCbPosts.map((post) => (
                        <PostCard key={post.id} post={post} isCbPost={true} />
                    ))}
                </div>
                <button onClick={() => scroll('left', cbScrollRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 rounded-full hover:bg-red-400">
                    <ChevronLeft className="text-white" />
                </button>
                <button onClick={() => scroll('right', cbScrollRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 rounded-full hover:bg-red-400">
                    <ChevronRight className="text-white" />
                </button>
            </div>
            <br />
            <div className="relative w-[70%] mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-red-400">Featured Used Cars for sale</h2>
                <div ref={userScrollRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                    {filteredUserPosts.length === 0 && <p className="text-gray-300">No user offers to display.</p>}
                    {filteredUserPosts.map((post) => (
                        <PostCard key={post.id} post={post} isCbPost={false} />
                    ))}
                </div>
                <button onClick={() => scroll('left', userScrollRef)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 rounded-full hover:bg-red-400">
                    <ChevronLeft className="text-white" />
                </button>
                <button onClick={() => scroll('right', userScrollRef)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent p-2 rounded-full hover:bg-red-400">
                    <ChevronRight className="text-white" />
                </button>
            </div>
        </div>
    );
};

export default Feeds;