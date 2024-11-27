import { useState, useRef } from "react";
import '../index.css'
import QRCode from "react-qr-code";


function QrCodeGenerator() {
  // State management:
  // - url: stores the input URL that will be converted to QR code
  // - qrIsVisible: controls the visibility of the QR code component
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);

  // Handler function that shows the QR code when the generate button is clicked
  // Only proceeds if there's a URL entered
  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }
    setQrIsVisible(true);
  };

  // Reference to the container div for potential future use
  // (e.g., if you want to implement download/save functionality)
  const qrCodeRef = useRef(null);

  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      {/* Main container that holds both input and QR code output */}
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        {/* Input section with URL input field and generate button */}
        <div className="qrcode__input">
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>

        {/* QR code section - only rendered when qrIsVisible is true */}
        {qrIsVisible && (
          <div className="qrcode__image">
            {/* QRCode component that converts the URL into a QR code */}
            {/* size prop sets the dimensions of the QR code in pixels */}
            <QRCode value={url} size={300} />
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeGenerator;
