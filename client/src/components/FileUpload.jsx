import React, { useState, useEffect } from "react";
import UploadButton from "./UploadButton";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// FIREBASE
import "./FileUpload.css";
import { storage } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// @MUI
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Button from "@mui/material/Button";

//built in firebase functions.
//ref: create reference to the folder path on the cloud storage
//uploadBytes: uploads the photo, takes care of file type etc. magic.
//listAll: list all items (objects) in the path folder specified
//getDownloadURL: get the actual url that can be added to img src to display the image

export default function FileUpload({ setIsNewEntry, handleClose }) {
  // USE STATE
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  // FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // USE EFFECT
  // PREVIEW IMAGE
  useEffect(() => {
    if (!fileUpload) {
      setPreviewImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(fileUpload);
    setPreviewImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileUpload]);

  useEffect(() => {
    if (imageURL) {
      uploadToDatabase();
      setIsNewEntry((prev) => prev + 1);
      handleClose();
    }
  }, [imageURL]);

  // HANDLER FUCNTION
  const storage = getStorage();

  // UPLOAD FILE TO FIREBASE
  const uploadFile = async () => {
    if (!fileUpload) return;
    const diaryEntriesFolderRef = ref(
      storage,
      `diaryEntries/${fileUpload.name}`
    );
    try {
      const snapshot = await uploadBytes(diaryEntriesFolderRef, fileUpload);
      const firebaseURL = await getDownloadURL(snapshot.ref);
      console.log("Download URL", firebaseURL);
      setImageURL(firebaseURL);
    } catch (err) {
      console.error("image upload error!", err);
    }
  };

  // UPLOAD TO DATABASE
  const uploadToDatabase = async () => {
    const response = await fetch(`${BASE_URL}/diaries`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: 1,
        foodTitle: title,
        foodDescription: description,
        imageURL: imageURL,
      }),
    });

    console.log(response);
  };

  // RETURN
  return (
    <Box sx={{ width: "100%" }}>
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
