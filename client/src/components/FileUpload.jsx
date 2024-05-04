import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";

// FIREBASE
import "./FileUpload.css";
import { storage } from "../config/firebase";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";

// @MUI
import { Box } from "@mui/system";
import { Input, TextField, TextareaAutosize, Typography } from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

//built in firebase functions.
//ref: create reference to the folder path on the cloud storage
//uploadBytes: uploads the photo, takes care of file type etc. magic.
//listAll: list all items (objects) in the path folder specified
//getDownloadURL: get the actual url that can be added to img src to display the image

export default function FileUpload() {
  // USE STATE
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  // FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  // USE EFFECT

  useEffect(() => {
    listAllImages();
  }, []);

  useEffect(() => {
    if (!fileUpload) {
      setPreviewImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(fileUpload);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileUpload]);

  /**
   * FOR LOGGING
   */
  useEffect(() => {
    console.log(title);
    console.log(description);
    console.log(fileUpload);
    console.log(imageURL);
  }, [title, description, fileUpload, imageURL]);

  // HANDLER FUCNTION
  const storage = getStorage();
  const imageListRef = ref(storage, "diaryEntries/");

  // UPLOAD FIILE
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
      setImageURL(downloadURL);
    } catch (err) {
      console.error("image upload error!", err);
    }
  };

  /**
   * WAIT FOR ENDPOINT
   */
  const uploadToDatabase = () => {
    const response = fetch("http://localhost:3001/diaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        imageURL: imageURL,
      }),
    });

    console.log(response.json());
  };

  const listAllImages = async () => {
    const imageListObj = await listAll(imageListRef);

    const requests = imageListObj.items.map((item) => getDownloadURL(item));
    const urls = await Promise.all(requests);
    // console.log("listAll images from ref", imageListObj);
    // console.log("requests", requests);
    // console.log("urls", urls);
  };

  // RETURN
  return (
    <Box sx={{ width: "50%" }}>
      <Typography variant="h6">New Diary</Typography>

      {/* PREVIEW IMAGE */}
      {fileUpload ? (
        <img src={previewImage} className="preview" />
      ) : (
        <DinnerDiningIcon sx={{ width: 400, height: 300 }} color="disabled" />
      )}

      {/* TEXT INPUT */}
      <TextField
        id="outlined-basic"
        label="title"
        variant="outlined"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        sx={{ width: "100%" }}
      />
      <textarea
        className="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* UPLOAD BUTTON */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <UploadButton setFileUpload={setFileUpload} />
        <Button
          variant="outlined"
          component="label"
          role={undefined}
          tabIndex={-1}
          onClick={async () => {
            await uploadFile();
            await uploadToDatabase();
          }}
        >
          Upload File
        </Button>
        {/* {imageList.map((url) => {
          return <img src={url} />;
        })} */}
      </Box>
    </Box>
  );
}
