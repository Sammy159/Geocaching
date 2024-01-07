import React from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

interface QrReaderProps {
  handleDecode: (result: any) => any;
  handleError: (error: any) => any;
}

/**
 * QrReader Component
 *
 * This is a React component that provides QR code scanning functionality.
 *
 * @param {Object} props - The properties for the QrReader component.
 * @param {(result: any) => any} props.handleDecode - A callback function to handle QR code decoding.
 * @param {(error: any) => any} props.handleError - A callback function to handle errors during QR code scanning.
 *
 * @returns {JSX.Element} - The QrReader component.
 */
const QrReader: React.FC<QrReaderProps> = ({ handleDecode, handleError }) => {
  return <QrScanner onDecode={handleDecode} onError={handleError} />;
};

export default QrReader;
