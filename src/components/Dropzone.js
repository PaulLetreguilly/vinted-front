import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setFile, file }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles);
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });
  // URL.createeObjectURL(file[0])
  return (
    <div>
      <div
        {...getRootProps()}
        className="zone"
        onDrag={(event) => {
          console.log(event);
          setFile(event);
        }}
      >
        {file &&
          file.map((item, index) => {
            return (
              <p key={index} className="pic-name">
                {item.name}
              </p>
            );
          })}
        <input {...getInputProps()} />
        <p className="add-pic">+ Ajoute une photo</p>
      </div>
    </div>
  );
};

export default Dropzone;
