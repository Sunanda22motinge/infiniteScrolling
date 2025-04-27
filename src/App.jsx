
import React, { useState, useEffect } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  // const fetchImages = async () => {
  //   const res = await fetch(`https://api.unsplash.com/photos/?client_id=r8PpeWMDtXsl5Z4y234vIoiRcRjGgSxI7uD8tFXdUQg&page=${page}&per_page=10`);
  //   const data = await res.json();
  //   setImages((prev) => [...prev, ...data]);
  // };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchImages = async () => {
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=r8PpeWMDtXsl5Z4y234vIoiRcRjGgSxI7uD8tFXdUQg&page=${page}&per_page=10`);
    const data = await res.json();
    console.log("Fetched data:", data);  // <-- add this
    setImages((prev) => [...prev, ...data]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Infinite Image Gallery</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
