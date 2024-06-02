import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

interface Row {
  id: number;
  lastName: string | null;
  firstName: string | null;
  age: number | null;
}

const rowsPerPageOptions = [5, 10, 25];

const rows: Row[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const UserManagement: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState<Row[]>(rows);
  const color = grey[200];
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = rows.filter(row =>
        Object.values(row).some(value =>
          value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRows(filtered);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

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

  const handleEditClick = (id: number) => {
    // Handle edit action
    console.log("Edit clicked for ID:", id);
  };

  const handleDeleteClick = (id: number) => {
    // Handle delete action
    console.log("Delete clicked for ID:", id);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  return (
    <div className='mx-5'>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '1rem' }}
      />
      <TableContainer component={Paper} style={{ minHeight: 100 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ maxWidth: '50px', fontWeight: 'bold', backgroundColor:color, color: 'black' }}>ID</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor:color, color: 'black' }}>First Name</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor:color, color: 'black' }}>Last Name</TableCell>
              <TableCell align="center" sx={{ maxWidth: '50px', fontWeight: 'bold', backgroundColor:color, color: 'black' }}>Age</TableCell>
              <TableCell align="center" sx={{ maxWidth: '150px', fontWeight: 'bold', backgroundColor:color, color: 'black' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.firstName}</TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(row.id)} sx={{ marginRight: 1 }}><BsPencilSquare /></Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(row.id)}><BsTrash /></Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No Data
                  </Typography>
                </TableCell>
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

export default UserManagement;
