import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import '../index.css'


function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);

  const handleQrCodeGenerator = () => {
    if (!url) {
      return;
    }

    setQrIsVisible(true);
  };

  // Reference to the container div that includes the QR code
  // Used for capturing the QR code as an image
  const qrCodeRef = useRef(null);

  // Function to handle downloading the QR code as a PNG image
  const downloadQRCode = () => {
    // Safety check to ensure the ref exists
    if (!qrCodeRef.current) return;
    
    // Use html-to-image library to convert the QR code div to a PNG
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        // Create a temporary <a> element to trigger the download
        const link = document.createElement("a");
        // Set the data URL as the href
        link.href = dataUrl;
        // Set the filename for the downloaded image
        link.download = "qr-code.png";
        // Programmatically click the link to start the download
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="qrcode__container">
      <h1>QR Code Generator</h1>
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        <div className="qrcode__input">
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        
          <button onClick={handleQrCodeGenerator}>Generate QR Code</button>
        </div>

        {qrIsVisible && (
          <div className="qrcode__download">
            {/* Container for the QR code image */}
            <div className="qrcode__image">
              <QRCode value={url} size={300} />
            </div>
            {/* Button to trigger the QR code download */}
            <button onClick={downloadQRCode}>Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeGenerator;
