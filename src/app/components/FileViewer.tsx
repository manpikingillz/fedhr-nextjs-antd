import { useState, useEffect } from 'react';
import mammoth from 'mammoth';

export const DocxViewer = ({src}) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Ensure this code runs on the client, not on the server during SSR
    if (typeof window !== 'undefined') {
      fetch(src)
        .then(response => response.blob())
        .then(blob => {
          mammoth.convertToHtml({ arrayBuffer: blob.arrayBuffer() })
            .then(displayResult)
            .catch(handleError);
        });
    }
  }, []);

  function displayResult(result) {
    setHtmlContent(result.value); // The generated HTML
  }

  function handleError(err) {
    console.error(err);
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export function GoogleDocViewer({ src }) {
  const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(src)}&embedded=true`;
  return (
    <iframe src={googleDocsUrl} style={{ width: '100%', height: '600px' }} frameBorder="0"></iframe>
  );
}


export function PdfIFrameViewer({ src, width = "100%", height = "600px" }) {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={{ border: "none" }}
    ></iframe>
  );
}



