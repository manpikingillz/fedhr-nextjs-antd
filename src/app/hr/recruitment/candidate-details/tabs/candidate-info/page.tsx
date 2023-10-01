'use client'

// import { GoogleDocViewer, PdfIFrameViewer } from "./DocViewer";

// const CandidateInfo = () => {
//     return <PdfIFrameViewer src="/files/GilbertTwesigomweResume.pdf"/>
// }

// export default CandidateInfo;

// import { useState, useEffect } from 'react';
// import mammoth from 'mammoth';

// const DocxViewer = () => {
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     // Ensure this code runs on the client, not on the server during SSR
//     if (typeof window !== 'undefined') {
//       mammoth.convertToHtml({ path: '/files/13THSUNDAYINORDINARYTIME.docx' })
//         .then(displayResult)
//         .catch(handleError);
//     }
//   }, []);

//   function displayResult(result) {
//     setHtmlContent(result.value); // The generated HTML
//   }

//   function handleError(err) {
//     console.error(err);
//   }

//   return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
// };

// export default DocxViewer;


import { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const DocxViewer = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Ensure this code runs on the client, not on the server during SSR
    if (typeof window !== 'undefined') {
      fetch('/files/13THSUNDAYINORDINARYTIME.docx')
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

export default DocxViewer;