import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [log, setLog] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleShowAlert = () => {
    alert("Alert Button Clicked!");
  };
  const handleShowAlert2 = () => {
    toast.success("custom Alert Button Clicked!");
  };

  // Event handlers for browser events
  const handleMouseEvent = (e) => {
    setLog((prevLog) => [`Mouse Event: ${e.type}`, ...prevLog].slice(0, 5));
  };

  const handleKeyEvent = (e) => {
    setLog((prevLog) => [`Keyboard Event: ${e.type} (${e.key})`, ...prevLog].slice(0, 5));
  };

  useEffect(() => {
    // Add event listeners
    window.addEventListener("mousemove", handleMouseEvent);
    window.addEventListener("mousedown", handleMouseEvent);
    window.addEventListener("keyup", handleKeyEvent);
    window.addEventListener("keydown", handleKeyEvent);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseEvent);
      window.removeEventListener("mousedown", handleMouseEvent);
      window.removeEventListener("keyup", handleKeyEvent);
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
       <Toaster />
      <h1 className="text-2xl font-bold mb-4">Event Monitoring App</h1>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-3/4">
        {/* Image Display Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 border-2 border-gray-300 p-4 rounded-lg bg-white">
          <div className="text-center mb-4">
            <h2 className="font-semibold text-lg">Selected Image</h2>
            <p className="text-sm text-gray-500">Choose an image to display here.</p>
          </div>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-48 object-contain rounded-md"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4 text-sm text-gray-500"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col items-center w-full md:w-1/2 border-2 border-gray-300 p-4 rounded-lg bg-white">
          <h2 className="font-semibold text-lg mb-4">Controls</h2>
          <button
            onClick={handleShowAlert}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Show Alert
          </button>
          <button
            onClick={handleShowAlert2}
            className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Show Alert
          </button>
        </div>
      </div>

      {/* Event Log */}
      <div className="mt-8 w-full md:w-3/4">
        <h2 className="text-lg font-semibold mb-2">Event Log</h2>
        <div className="h-40 bg-gray-200 p-4 rounded-md overflow-auto">
          {log.length > 0 ? (
            log.map((entry, index) => (
              <p key={index} className="text-sm text-gray-800">
                {entry}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No events captured yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
