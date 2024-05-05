import { Box, Modal, Typography } from "@mui/material";

export default function CreateUserModal({
  showConfirmRegister,
  newEmail,
  setShowConfirmRegister,
}) {
  // HANDLER FUNCTION
  const handleClose = () => setShowConfirmRegister(false);

  // RETURN
  return (
    <Modal
      open={showConfirmRegister}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Successful!
        </Typography>
        <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
          Your{" "}
          <span style={{ fontWeight: "bold", color: "#1769aa" }}>
            {newEmail}
          </span>{" "}
          has been registered
        </Typography>
      </Box>
    </Modal>
  );
}
