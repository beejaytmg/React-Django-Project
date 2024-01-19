import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

const BookDetail = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/${id}/`);
        const fetchedBookDetails = response.data;
        setBookDetails(fetchedBookDetails);
        console.log(fetchedBookDetails);
      } catch (error) {
        console.error("Couldn't fetch book details", error);
      }
    };

    fetchBookDetails();
  }, [id]); // Include id in the dependency array to re-fetch when it changes

  return (
    <div className="max-w-2xl mx-auto p-4">
      {bookDetails ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{bookDetails.title}</h2>
          <p className="text-gray-600 mb-2">Author: {bookDetails.author}</p>
          <p className="text-gray-600 mb-2">Genre: {bookDetails.genre}</p>

          <img
            src={bookDetails.book_cover}
            alt={`Book cover for ${bookDetails.title}`}
            className="w-48 h-48 mb-4"
          />

          {/* Displaying PDF file using the <object> tag */}
          <object data={bookDetails.pdf_file} type="application/pdf" className="w-full h-64 md:h-72 lg:h-80"></object>
        </>
      ) : (
        <p className="text-gray-600">Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetail;
