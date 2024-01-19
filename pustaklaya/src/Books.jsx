import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Books = () => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksResponse = await axios.get('http://127.0.0.1:8000/api/books/');
        const fetchedBooksData = booksResponse.data; // Access the data property of the response
        setBooksData(fetchedBooksData);
        console.log(fetchedBooksData);
      } catch (error) {
        console.error("Couldn't fetch books", error);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Render your books data here */}
      {booksData.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">{book.title}</h3>
          <p className="text-gray-600 mb-2">Author: {book.author}</p>
          <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
          {/* Add more details as needed */}
          <img
            src={book.book_cover}
            alt={`Book cover for ${book.title}`}
            className="w-full h-auto mb-2"
          />
          {/* Add more details as needed */}
          <Link to={`/book/${book.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Books;
