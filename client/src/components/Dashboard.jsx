import { Box, Button, Modal, Paper } from "@mui/material";
import PaginationTable from "./Table";
import FileUpload from "./FileUpload";
import { useState } from "react";

export default function Dashboard() {
  // USE STATE
  const [isNewEntry, setIsNewEntry] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // RETURN
  return (
    <Box padding={2} sx={{ display: "flex", flexDirection: "column" }}>
      {/* FILE UPLOAD */}
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end", mb: 2 }}
        onClick={handleOpen}
      >
        New Diary
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width: "70lvw" }}>
          <Paper sx={{ p: 2 }}>
            <FileUpload setIsNewEntry={setIsNewEntry} />
          </Paper>
        </Box>
      </Modal>

      <PaginationTable isNewEntry={isNewEntry} />
    </Box>
  );
}
