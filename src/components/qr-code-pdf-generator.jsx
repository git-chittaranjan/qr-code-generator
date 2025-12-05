
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { PDFDocument, rgb } from 'pdf-lib';

function QRCodePdfGenerator(props) {
    const [qrDataUrl, setQrDataUrl] = useState('');

    // Generate the QR code
    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const url = await QRCode.toDataURL(props.url);
                setQrDataUrl(url);
            } catch (err) {
                console.error(err);
            }
        };
        generateQrCode();

    }, [props.url]);

    // Create and download PDF
    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);

        page.drawText('QR Code Below:', {
            x: 50,
            y: 350,
            size: 18,
            color: rgb(0, 0, 0),
        });

        // Embed the image
        const qrImageBytes = await fetch(qrDataUrl).then((res) => res.arrayBuffer());
        const qrImage = await pdfDoc.embedPng(qrImageBytes); // use embedJpg for JPG images

        const { width, height } = qrImage.scale(0.5);

        page.drawImage(qrImage, {
            x: 50,
            y: 200,
            width,
            height,
        });

        const pdfBytes = await pdfDoc.save();

        // Trigger download
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qr-code.pdf';
        link.click();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">QR Code to PDF Generator</h2>
            <button
                onClick={generatePdf}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Generate PDF
            </button>
        </div>
    );
}

export default QRCodePdfGenerator;
