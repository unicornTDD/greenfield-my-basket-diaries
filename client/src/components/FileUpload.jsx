import React, { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function FileUpload() {
  //file upload state
  const [fileUpload, setFileUpload] = useState(null);

  //handler function
  const uploadFile = async () => {
    if (!fileUpload) return;
    const diaryEntriesFolderRef = ref(
      storage,
      `diaryEntries/${fileUpload.name}`
    );
    try {
      await uploadBytes(diaryEntriesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  // RETURN
  return (
    <>
      <p>file upload componenttt</p>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        ></input>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </>
  );
}
