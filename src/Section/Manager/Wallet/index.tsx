import React, { useEffect, useState } from 'react';
import Sidebar from '../Settings/contents/Sidebar';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
  } from "@mui/material";
  import { grey } from "@mui/material/colors";
import { useSelector } from 'react-redux';
import { RootState } from '../../../utils/redux/app/store';
import { toast } from 'react-toastify';
import {  transaction, wallet } from '../../../utils/types';
import { getWallet } from '../../../service/api/manager/apiMethod';

  const rowsPerPageOptions = [5, 10, 25];
const Wallet:React.FC = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [walletData, setWalletData] = useState<wallet|null>(null);
    const [filteredRows, setFilteredRows] =  useState<transaction[]>([]);

    const manager = useSelector((state: RootState) => state.manager);
    
    const color = grey[200];
  
    useEffect(() => {
      getDetails();
    }, []);
  
    const getDetails = async () => {
      try {
        if(!manager.managerId)return

        const response = await getWallet(manager.managerId);
        
        if (response && response.data) {
            if (Array.isArray(response.data.transactions)) {
                console.log(response.data.transactions );
                
                setFilteredRows(response.data.transactions );
              } else {
                toast.error("Unexpected response format");
              }
        
            
            setWalletData(response.data as wallet);

        
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
        const filtered = walletData?.transactions.filter((transactionValue) =>
          Object.values(transactionValue).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setFilteredRows(filtered);
      }, 1000);
  
      return () => clearTimeout(debounce);
    }, [searchQuery, walletData]);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleChangePage = ( newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
  return (
    <div className="h-screen flex flex-col ">
    <div className="flex-grow flex justify-center items-center lg:px-48">
    <Sidebar />
    <div className="grid gap-6 items-start max-w-6xl px-4 mx-auto py-6 bg-white w-2/3">
      <div className="grid gap-4">
        <div className="bg-muted rounded-lg p-6 flex items-center justify-between">
          <div className='text-center mx-auto'>
            <div className="text-sm text-muted-foreground">Current Balance</div>
            <div className="text-4xl font-bold">₹{walletData?.walletBalance}</div>
          </div>
          
        </div>
        <div>
          <div className='text-center'>
            <h1>Transaction History</h1>
            <p>View your recent transactions and account activity.</p>
          </div>
          <div className="flex justify-between">
            <input
              placeholder="Search"
              className="border-2 my-6 p-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "50px",
                      fontWeight: "bold",
                      backgroundColor: color,
                      color: "black",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "150px",
                      fontWeight: "bold",
                      backgroundColor: color,
                      color: "black",
                    }}
                  >
                    amount
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "150px",
                      fontWeight: "bold",
                      backgroundColor: color,
                      color: "black",
                    }}
                  >
                  Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      maxWidth: "50px",
                      fontWeight: "bold",
                      backgroundColor: color,
                      color: "black",
                    }}
                  >
                    Date
                  </TableCell>
               
                 
                
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredRows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredRows
                ).map((row: transaction, index) =>  (
                    <TableRow key={row._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{new Date(row.date).toLocaleDateString()}</TableCell>
                  
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
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}

export default Wallet;
