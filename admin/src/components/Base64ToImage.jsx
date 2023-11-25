import React, { useState, useEffect } from "react";

const Base64ToImage = ({ base64Image }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const convertBase64ToBlob = () => {
      // Step 1: Decode Base64 and create Blob
      const binaryData = atob(base64Image);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: "image/jpeg" });

      // Step 2: Create Object URL
      const objectURL = URL.createObjectURL(blob);

      // Step 3: Set Image Source
      setImageSrc(objectURL);
    };

    convertBase64ToBlob();
  }, [base64Image]);

  return (
    <div>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Converted Image"
          height={180}
          width={150}
          className="contain-image rounded-xl"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Base64ToImage;
