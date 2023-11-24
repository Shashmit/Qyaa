import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("render", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(data) {
      scanner.clear();
      setScanResult(data);
      localStorage.setItem("qr", data);
    }

    function error(err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <h1>Qr Scanner</h1>
      <div id="render"></div>
    </div>
  );
};

export default Scanner;
