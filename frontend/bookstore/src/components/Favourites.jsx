import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [favourite, setFavourite] = useState([]); // Initialize as an empty array.

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fav/get-book-fav", { headers });
        setFavourite(response.data.favouriteBook); // Fetch favorite books and set state
      } catch (err) {
        console.error("Error fetching cart data:", err);
      }
    };
    fetchCart();
  }, []); 

  const handleRemoveBook = async (bookid) => {
    try {
      const response = await axios.put("http://localhost:5000/api/fav/delete-book-fav", { bookid }, { headers });
      alert(response.data.message);

      setFavourite(favourite.filter((book) => book._id !== bookid));
    } catch (err) {
      console.error("Error removing book:", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Your Favourite Books</h1>
      <div className="grid grid-cols-4">
        {favourite.length > 0 ? (
          favourite.map((book, index) => (
            <div
              key={index}
              style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
            >
              <img src={book.url} alt={book.title} style={{ width: "100px", height: "150px" }} />
              <h2>{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Price:</strong> ${book.price}
              </p>
              <button
                onClick={() => handleRemoveBook(book._id)} 
                className="bg-yellow-100 py-2 px-4 rounded mt-2 border-yellow-500 text-black hover:bg-black hover:text-yellow-300 transition-all duration-300"
              >
                Remove Book
              </button>
            </div>
          ))
        ) : (
          <p className='items-center justify-center'>No favourite books found.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
