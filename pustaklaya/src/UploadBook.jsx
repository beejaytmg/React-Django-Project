import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  const [genre, setGenre] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate()
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleInfoChange = (e) => setInfo(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleCoverFileChange = (e) => setCoverFile(e.target.files[0]);
  const handlePdfFileChange = (e) => setPdfFile(e.target.files[0]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('info', info);
    formData.append('genre', genre);
    formData.append('book_cover', coverFile);
    formData.append('pdf_file', pdfFile);
    const accessToken = localStorage.getItem('token');

    // Make the API request with the authorization header
    axios.post('http://127.0.0.1:8000/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      console.log(response.data);
      navigate("/");
      // Handle success, e.g., show a success message to the user
    })
    .catch(error => {
      console.error(error);
      // Handle error, e.g., show an error message to the user
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Book</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Author:</label>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Info:</label>
        <textarea
          value={info}
          onChange={handleInfoChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={handleGenreChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Book Cover:</label>
        <input
          type="file"
          onChange={handleCoverFileChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">PDF File:</label>
        <input
          type="file"
          onChange={handlePdfFileChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadBook;
