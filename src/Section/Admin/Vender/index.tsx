import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import {   getAllVenderDeatails } from '../../../service/api/admin/apiMethod';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2';
import { userDataTypes } from '../../../utils/types';
import { getAlllocationwithId } from '../../../service/api/manager/apiMethod';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getAllVenderwithId } from '../../../service/api/vender/apiMethod';



const rowsPerPageOptions = [5, 10, 25];

const Venders: React.FC = () => {
  const [page, setPage] = useState(0);
  // const [api, setApi] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [venderData, setVenderData] = useState<userDataTypes[]>([]);
  const [filteredRows, setFilteredRows] = useState<userDataTypes[]>([]);

  const color = grey[200];
  const navigate: NavigateFunction = useNavigate();


  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const response = await getAllVenderDeatails();
      if (response && Array.isArray(response.data)) {
        setVenderData(response.data);
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
      const filtered = venderData.filter((userValue) =>
        Object.values(userValue).some((value) =>
          value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery, venderData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (id: string) => {
    console.log(id, "jdhshdjh");
    Swal.fire({
      title: "Are you sure to block event?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "blocked!",
          text: "user is blocked.",
          icon: "success"
        });
   
      }
    });

   
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);


  const handleVender = async (venderId: string) => {
    try {
      const response = await getAllVenderwithId(venderId);
      
      if (response && Array.isArray(response.data)) {
        console.log(response.data,"klhkgkhl");
        
        navigate('/admin/viewVenders', { state: response.data });
      } else {
        toast.error("No user data found");
      }
    } catch (error:unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  

  return (
    <div className='mx-5'>
      <div className='flex justify-between'>
      <input
        placeholder="Search"
      className='border-2 my-6 p-2'
        value={searchQuery}
        onChange={handleSearchChange}
       
      />
 
      </div>
 
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ maxWidth: '50px', fontWeight: 'bold', backgroundColor: color, color: 'black' }}>ID</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor: color, color: 'black' }}>Username</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor: color, color: 'black' }}>Email</TableCell>
              <TableCell align="center" sx={{ maxWidth: '50px', fontWeight: 'bold', backgroundColor: color, color: 'black' }}>Phone</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor: color, color: 'black' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((row: userDataTypes,index) => (
              <TableRow key={row._id}>
                <TableCell align="center">{index+1}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone || "no number"}</TableCell>
                <TableCell align="center">
                  {row.isBlocked ? (
                 <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-4 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ' onClick={() => handleClick(row._id)}>
                      unblock
                    </button>
                  ) : (
                    <button className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' onClick={() => handleClick(row._id)}>
                      block
                    </button>
                  )}
               <button className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' onClick={()=>handleVender(row._id)}>
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
  );
}




export default Venders;
