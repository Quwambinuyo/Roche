import React, { useRef, useState } from "react";
import { FiUpload, FiLink, FiX } from "react-icons/fi";

const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const ImageInput = ({ value, onChange }) => {
  const [mode, setMode] = useState("upload");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    setError("");

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG and PNG images are supported.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url) => {
    setError("");
    onChange(url);
  };

  const clearImage = () => {
    onChange("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border ${
            mode === "upload"
              ? "border-primary/60 text-primary bg-primary/5"
              : "border-primary/10 text-primary/60"
          }`}
        >
          <FiUpload size={13} />
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border ${
            mode === "url"
              ? "border-primary/60 text-primary bg-primary/5"
              : "border-primary/10 text-primary/60"
          }`}
        >
          <FiLink size={13} />
          URL
        </button>
      </div>

      {mode === "upload" ? (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-primary file:text-secondary file:text-xs"
        />
      ) : (
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={value?.startsWith("data:") ? "" : value}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="w-full px-3 py-2 bg-secondary border border-primary/10 text-primary text-sm"
        />
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      {value && (
        <div className="mt-3 relative w-24 h-24">
          <img
            src={value}
            alt="Preview"
            className="w-24 h-24 object-cover border border-primary/10"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-secondary rounded-full"
          >
            <FiX size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
