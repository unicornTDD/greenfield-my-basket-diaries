import React, { useState, useEffect } from "react";
import DateConversion from "../utils/DateConversion";

// @MUI
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import tableCellClasses from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function PaginationTable({ isNewEntry }) {
  // USE STATE
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [diaryID, setDiaryID] = useState("");
  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState(null);

  // USE EFFECT
  useEffect(() => {
    console.log(isNewEntry);
    handleReadData(); // AUTO RELOAD DATA
  }, [isNewEntry]);

  // HANDLERS FUNCTION
  const handleReadData = async () => {
    const resp = await fetch(`${BASE_URL}/diaries`, { credentials: "include" });
    const data = await resp.json();
    const sortedDataDesc = data.sort((a, b) => {
      return b.diary_id - a.diary_id;
    });
    setEntries([...sortedDataDesc]);
  };

  const handleEditDiary = async (diaryID) => {
    const response = await fetch(`${BASE_URL}/diaries/${diaryID}`, {
      credentials: "include",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodTitle: editTitle,
        foodDescription: editDescription,
      }),
    });
    setEditTitle(null);
    setEditDescription(null);
    handleReadData();
  };

  console.log("editTitle", editTitle);
  console.log("editDescr", editDescription);

  // RETURN
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 1000 }}>
      <Table
        stickyHeader
        sx={{ minWidth: 500, zIndex: 999 }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#9f9f9f" }}>
            <TableCell sx={{ width: 10 }}>Time</TableCell>
            <TableCell sx={{ width: 40 }} align="left">
              Food
            </TableCell>
            <TableCell sx={{ width: 10 }} align="left">
              User
            </TableCell>
            <TableCell sx={{ width: 40 }} align="left">
              Description
            </TableCell>
            <TableCell sx={{ width: 40 }} align="left">
              Image
            </TableCell>
            <TableCell sx={{ width: 10 }}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <p>{DateConversion(row.date_created).date}</p>
                  <p>{DateConversion(row.date_created).time}</p>
                </Box>
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="left">
                {row.food_title}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="left">
                {row.user_id}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="left">
                {row.food_description}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="left">
                <img
                  src={row.image_url}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
              </StyledTableCell>
              <StyledTableCell>
                <input
                  type="text"
                  placeholder="title"
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="description"
                  onChange={(e) => {
                    setEditDescription(e.target.value);
                  }}
                />
                <button onClick={() => handleEditDiary(row.diary_id)}>
                  Submit
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// STYLED
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
