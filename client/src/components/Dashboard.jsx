import { Box } from "@mui/material";
import PaginationTable from "./Table";
import FileUpload from "./FileUpload";
import { useState } from "react";

export default function Dashboard() {
  // USE STATE
  const [isNewEntry, setIsNewEntry] = useState(0);

  // RETURN
  return (
    <Box padding={2}>
      {/* FILE UPLOAD */}
      <FileUpload setIsNewEntry={setIsNewEntry} />

      <PaginationTable isNewEntry={isNewEntry} />
    </Box>
  );
}
