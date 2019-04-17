import React, { Component } from "react";
import Button from "../Button";
import { useDropzone } from "react-dropzone";
import Toast from "../Toast";
import "./FilePicker.scss";
import uploadPhoto from "../../../api/PhotoApi";

function FilePicker(props) {
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: props.mSize * 1024 * 1024,
    multiple: props.multiple,
    onDropAccepted: files => {
      if (props.onAccept) props.onAccept(files);
    },
    onDropRejected: files => {
      files.map((file, i)=>{
        if(file.size > props.mSize * 1024 * 1024)
          Toast.notify(file.name + " dung lượng lớn hơn " + props.mSize + "MB");

      })
    }
  });
  const files = acceptedFiles.map((file, i) => (
    <li key={file.path} className="file-name">
      <div>{i + 1}</div>
      {file.path} - {Number((file.size / (1024 * 1024)).toFixed(2))} MB
    </li>
  ));
  return (
    <section className="file-picker-container">
      <div {...getRootProps({ className: "file-dropzone" })}>
        <input {...getInputProps()} />
        <p>Chọn ảnh - Ảnh có kích thước tối đa {props.mSize}MB</p>
      </div>
      <aside>
        {acceptedFiles.length != 0 ? <h4>Ảnh:</h4> : ""}
        <ol>{files}</ol>
      </aside>
    </section>
  );
}

export default FilePicker;
