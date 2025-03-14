import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  //   tanlangan sozni olish uchun
  const [selectedText, setSelectedText] = useState("");

  const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

  useEffect(() => {
    const savedFile = localStorage.getItem("file");
    const savedFileType = localStorage.getItem("fileType");
    if (savedFile && savedFileType) {
      setFile(savedFile);
      setFileType(savedFileType);
    }
  }, []);

  const handleTextSelection = () => {
    const selected = window.getSelection().toString();
    if (selected) {
      setSelectedText(selected);
      console.log(selected);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        const fileData = e.target.result;
        setFile(fileData);
        setFileType(selectedFile.type);

        localStorage.setItem("file", fileData);
        localStorage.setItem("fileType", selectedFile.type);
      };
    } else {
      setFile(null);
      setFileType(null);
      localStorage.removeItem("file");
      localStorage.removeItem("fileType");
      console.log("Iltimos, PDF fayl tanlang.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <form className="flex flex-col space-y-4">
        <Input type="file" accept="application/pdf" onChange={handleChange} />
        <Button type="button">PDF yuklash</Button>
      </form>

      <h2 className="mt-4 text-lg font-semibold">PDF Ko‘rish</h2>
      {file ? (
        <div
          className="border rounded shadow p-2 bg-white"
          onMouseUp={handleTextSelection}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={file} />
          </Worker>
        </div>
      ) : (
        <p className="text-gray-600">PDF fayl yuklang...</p>
      )}
      {selectedText && (
        <div className="mt-4 p-2 bg-yellow-100 border border-yellow-400 rounded shadow">
          <h3 className="text-lg font-semibold">Tanlangan so‘z:</h3>
          <p className="text-black font-bold">{selectedText}</p>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
