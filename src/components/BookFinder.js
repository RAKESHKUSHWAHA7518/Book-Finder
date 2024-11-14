import React, { useState } from "react";
import axios from "axios";

const BookFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch book data based on search query
  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      console.log(response.data);
      
      setBooks(response.data.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Handle Search Input Change
  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book Finder</h1>
      <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search for a book title..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 && !loading && <p>No books found. Try a different search.</p>}
        {books.map((book, index) => (
          <div key={index} className="border rounded p-4 shadow-sm">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="h-48 w-full object-cover mb-4"
            />
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-gray-700">Author: {book.author_name?.[0] || "N/A"}</p>
            <p className="text-gray-700">First Published: {book.first_publish_year || "N/A"}</p>
            <p className="text-gray-700">Average Rating: {book.ratings_average || "N/A"}⭐</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFinder;
