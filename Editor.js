// import React, { useState, useEffect, useRef } from "react";
// import MonacoEditor from "@monaco-editor/react";

// const Editor = ({ projectPath }) => {
//   const [htmlCode, setHtmlCode] = useState(""); // For HTML code
//   const [cssCode, setCssCode] = useState(""); // For CSS code
//   const [jsCode, setJsCode] = useState(""); // For JavaScript code
//   const iframeRef = useRef(null); // Reference for iframe preview

//   // Fetch initial code for HTML, CSS, JS
//   useEffect(() => {
//     const fetchCode = async () => {
//       const response = await fetch(`http://localhost/editorbackend/sync_collab.php?project_path=${projectPath}`);
//       const data = await response.json();

//       if (data.code) {
//         const [html, css, js] = data.code.split('/*END OF CODE*/');
//         setHtmlCode(html || "");
//         setCssCode(css || "");
//         setJsCode(js || "");
//       }
//     };

//     fetchCode();
//   }, [projectPath]);

//   // Update live preview iframe when code changes
//   const updatePreview = () => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.srcdoc = `
//         <html>
//           <head>
//             <style>${cssCode}</style>
//           </head>
//           <body>
//             ${htmlCode}
//             <script>${jsCode}<\/script>
//           </body>
//         </html>
//       `;
//     }
//   };

//   // Handle code changes in Monaco editor
//   const handleHtmlChange = (value) => {
//     setHtmlCode(value);
//     updatePreview(); // Update preview after code change
//   };

//   const handleCssChange = (value) => {
//     setCssCode(value);
//     updatePreview(); // Update preview after code change
//   };

//   const handleJsChange = (value) => {
//     setJsCode(value);
//     updatePreview(); // Update preview after code change
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
//       {/* Editor Section */}
//       <div style={{ display: "flex", gap: "20px" }}>
//         <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
//           <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>HTML Code</h3>
//           <MonacoEditor
//             height="200px"
//             language="html"
//             value={htmlCode}
//             onChange={handleHtmlChange}
//           />
//         </div>

//         <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
//           <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>CSS Code</h3>
//           <MonacoEditor
//             height="200px"
//             language="css"
//             value={cssCode}
//             onChange={handleCssChange}
//           />
//         </div>

//         <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
//           <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>JavaScript Code</h3>
//           <MonacoEditor
//             height="200px"
//             language="javascript"
//             value={jsCode}
//             onChange={handleJsChange}
//           />
//         </div>
//       </div>

//       {/* Live Preview Panel */}
//       <div style={{ border: "1px solid #ccc", padding: "10px" }}>
//         <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Live Preview</h3>
//         <iframe
//           ref={iframeRef}
//           title="Live Preview"
//           style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Editor;
