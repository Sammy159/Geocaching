import React from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

interface QrReaderProps {
  handleDecode: (result: any) => any;
  handleError: (error: any) => any;
}

const QrReader: React.FC<QrReaderProps> = ({ handleDecode, handleError }) => {
  return <QrScanner onDecode={handleDecode} onError={handleError} />;
};

export default QrReader;
