import React, { useState, useEffect } from "react";

// @MUI
import Masonry from "@mui/lab/Masonry";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateConversion from "../utils/DateConversion";
import { Box, Button, Modal, TextField } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function MasonryGrid({
  entries,
  handleDeleteDiary,
  handleReadData,
  setIsEdit,
  setEditId,
}) {
  // RETURN
  return (
    <Masonry
      columns={{ xs: 1, sm: 2, md: 4 }}
      spacing={2}
      style={{ width: "100%" }}
    >
      {entries.map((entry, index) => (
        <Card
          key={index}
          sx={{
            transition: "ease-in-out 0.2s",
            backgroundColor: "rgba(60,157,179,0.7)",
            color: "white",
            maxWidth: 345,
            borderRadius: 2,
            ":hover": { boxShadow: 10, transform: "scale(1.02)" },
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "rgb(224,137,146)" }} aria-label="recipe">
                CC
              </Avatar>
            }
            title={<Typography variant="h6">{entry.food_title}</Typography>}
            subheader={
              <Typography variant="caption">
                {`${DateConversion(entry.date_created).date},
              ${DateConversion(entry.date_created).time}`}
              </Typography>
            }
          />
          <CardMedia
            component="img"
            height="194"
            image={
              entry.image_url ||
              "https://firebasestorage.googleapis.com/v0/b/my-basket-diaries.appspot.com/o/diaryEntries%2FnoImage.png?alt=media&token=33a5d687-5b67-4284-a340-f8f2f8bb07de"
            }

            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.white">
              {entry.food_description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              sx={{ color: "white", ":active": { color: red[500] } }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              sx={{ color: "white", ":active": { color: red[500] } }}
              onClick={() => {
                setEditId(entry.diary_id);
                setIsEdit(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="share"
              sx={{ color: "white" }}
              onClick={() => handleDeleteDiary(entry.diary_id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Masonry>
  );
}
