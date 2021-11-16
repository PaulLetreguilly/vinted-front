import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setFile, file }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });
  // URL.createObjectURL(file[0])
  return (
    <div>
      <div
        {...getRootProps()}
        className="zone"
        onDrag={(event) => {
          // console.log(event);
          // setFile(event);
        }}
      >
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt=""
            style={{ height: "150px" }}
          />
        )}
        <input {...getInputProps()} />
        <p className="add-pic">+ Ajoute une photo</p>
      </div>
    </div>
  );
};

export default Dropzone;
