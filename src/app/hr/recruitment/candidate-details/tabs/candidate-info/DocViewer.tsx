export function DocxViewer({ src }) {
  // const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(src)}&embedded=true`;
  const googleDocsUrl = `https://docs.google.com/gview?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true`;
  return (
    <iframe src={googleDocsUrl} style={{ width: '100%', height: '600px' }} frameBorder="0"></iframe>
  );
}


export function PdfViewer({ src, width = "100%", height = "600px" }) {
  return (
    <iframe
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      width={width}
      height={height}
      style={{ border: "none" }}
      
    ></iframe>
  );
}
