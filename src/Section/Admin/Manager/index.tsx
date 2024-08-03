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

import {
  blockUser,
  getAllMangerDeatails,
} from "../../../service/api/admin/apiMethod";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { userDataTypes } from "../../../utils/types";
import { getAlllocationwithId } from "../../../service/api/manager/apiMethod";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../utils/redux/slice/Auth/managerAuthSlice";
import { search } from "../../../utils/SearchLogic";
import Search from "../../../components/Admin/Table/Search";
import TableHeader from "../../../components/Admin/Table/TableHeader";
import Pagination from "../../../components/Admin/Table/Pagination";

export interface eventDataTypes {
  _id: number;
  name: string;
  description: string;
  image?: string;
  isBlocked?: boolean;
}

const rowsPerPageOptions = [5, 10, 25];

const Manager: React.FC = () => {
  const [page, setPage] = useState(0);
  const [api, setApi] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [managerData, setManagerData] = useState<userDataTypes[]>([]);
  const [filteredRows, setFilteredRows] = useState<userDataTypes[]>([]);

  const [heading] = useState(["id", "Username", "Email", "Phone", "Actions"]);
  const dispatch = useDispatch();

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getDetails();
  }, [api]);

  const getDetails = async () => {
    try {
      const response = await getAllMangerDeatails();
      if (response && Array.isArray(response.data)) {
        setManagerData(response.data);
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
      const filtered = search(managerData, searchQuery);
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, managerData]);

  const handleClick = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure to block manager?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, block it!",
    });
    if (result.isConfirmed) {
      try {
        await blockUser(id);

        dispatch(logout());

        setApi((prev) => !prev);
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast.error(errorMessage);
      }
    }
  };
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const handleLocation = async (managerId: string) => {
    try {
      const response = await getAlllocationwithId(managerId);

      if (response && Array.isArray(response.data)) {
        navigate("/admin/viewLocation", { state: response.data });
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
            ).map((row: userDataTypes, index) => (
              <TableRow key={row._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone || "no number"}</TableCell>
                <TableCell align="center">
                  {row.isBlocked ? (
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
                      onClick={() => handleClick(row._id)}
                    >
                      unblock
                    </button>
                  ) : (
                    <button
                      className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                      onClick={() => handleClick(row._id)}
                    >
                      block
                    </button>
                  )}
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => handleLocation(row._id)}
                  >
                    view
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
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

export default Manager;
