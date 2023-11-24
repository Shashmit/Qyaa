import React, { useState } from "react";
import QRCode from "react-qr-code";

const QrGen = ({ sentValue }) => {
  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // const generateQRCode = () => {
  //   // Generate the QR code using the inputValue state variable
  //   <QRCode value={sentValue} size={256} viewBox={`0 0 256 256`} />;
  // };

  if (sentValue === "") {
    return <div>Waiting to Generate the QR</div>;
  } else {
    return (
      <div>
        <QRCode value={sentValue} size={256} viewBox={`0 0 256 256`} />
      </div>
    );
  }
};

export default QrGen;
