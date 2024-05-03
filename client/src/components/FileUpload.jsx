import React, { useState, useEffect } from "react";
import "./FileUpload.css";
import { storage } from "../config/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
//built in firebase functions.
//ref: create reference to the folder path on the cloud storage
//uploadBytes: uploads the photo, takes care of file type etc. magic.
//listAll: list all items (objects) in the path folder specified
//getDownloadURL: get the actual url that can be added to img src to display the image

export default function FileUpload() {
  //file upload state
  const [fileUpload, setFileUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  //use effect
  useEffect(() => {
    listAllImages();
  }, []);

  //handler function
  const storage = getStorage();
  const imageListRef = ref(storage, "diaryEntries/");

  //upload a file to the bucket
  const uploadFile = async () => {
    if (!fileUpload) return;
    const diaryEntriesFolderRef = ref(
      storage,
      `diaryEntries/${fileUpload.name}`
    );
    try {
      const snapshot = await uploadBytes(diaryEntriesFolderRef, fileUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Download URL", downloadURL);
    } catch (err) {
      console.error("image upload error!", err);
    }
  };

  const listAllImages = async () => {
    const imageListObj = await listAll(imageListRef);

    const requests = imageListObj.items.map((item) => getDownloadURL(item));
    const urls = await Promise.all(requests);
    console.log("listAll images from ref", imageListObj);
    console.log("requests", requests);
    console.log("urls", urls);
  };

  // RETURN
  return (
    <>
      <p>file upload component</p>
      <div>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
        ></input>
        <button onClick={uploadFile}>Upload File</button>
        {imageList.map((url) => {
          return <img src={url} />;
        })}
      </div>
    </>
  );
}
