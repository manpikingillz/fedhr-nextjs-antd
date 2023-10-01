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
