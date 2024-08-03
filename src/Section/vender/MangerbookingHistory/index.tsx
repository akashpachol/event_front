import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { bookingData } from "../../../utils/types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../utils/redux/app/store";
import { bookingAdd } from "../../../utils/redux/slice/bookingSlice";
import { getManagerBookingHistory } from "../../../service/api/vender/apiMethod";
import TableHeader from "../../../components/Admin/Table/TableHeader";
import Search from "../../../components/Admin/Table/Search";
import Pagination from "../../../components/Admin/Table/Pagination";

export interface eventDataTypes {
  _id: number;
  name: string;
  description: string;
  image?: string;
  isBlocked?: boolean;
}

const rowsPerPageOptions = [5, 10, 25];

const ManagerbookingHistory: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState<bookingData[]>([]);
  const [filteredRows, setFilteredRows] = useState<bookingData[]>([]);
  const [heading] = useState([
    "id",
    "UserName",
    "Name of event",
    "Phone",
    "vender Name",
    "Total",
    "Actions",
  ]);
  const dispatch = useDispatch();
  const vender = useSelector((state: RootState) => state.vender);
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const response = await getManagerBookingHistory(vender.venderId);
      if (response && Array.isArray(response.data)) {
        setBookingData(response.data);
        setFilteredRows(response.data);
      } else {
        toast.error("No user data found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = bookingData.filter((bookingValue) =>
        Object.values(bookingValue).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, bookingData]);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const handleLocation = async (bookingId: string | undefined) => {
    dispatch(bookingAdd({ data: bookingId }));
    navigate("/vender/managerBookingDetails");
  };
  return (
    <div className="mx-5">
      <div className="flex justify-between">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableHeader heading={heading} />
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row: bookingData, index) => (
              <TableRow key={row._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.manager.username}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.phone || "no number"}</TableCell>
                <TableCell align="center">{row.venderData.name}</TableCell>
                <TableCell align="center">{row.total}</TableCell>

                <TableCell align="center">
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => handleLocation(row?._id)}
                  >
                    view
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No Data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && filteredRows.length !== 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        setPage={setPage}
        page={page}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        count={filteredRows.length}
      />
    </div>
  );
};

export default ManagerbookingHistory;
