import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Tables from '../../Components/Tables';
import { deleteRequest, getRequest } from '../../Services/networkRequests';
import { useNavigate } from 'react-router-dom';

export const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const titleStyle = { padding: '20px', width: '100%', margin: "0" };

  useEffect(() => {
    async function fetchCategories() {
      const _categories = await getRequest('categories');
      setCategories(_categories);
    }
    fetchCategories();
  }, []);

  const refreshCategories = async () => {
    const _categories = await getRequest('categories');
    setCategories(_categories);
  };

  const handlePreview = (arg) => {
    return navigate("/add-category/" + arg.id, { replace: true });
  };

  const handleDelete = async (arg) => {
    try {
      await deleteRequest(`/category/${arg.id}`);
      refreshCategories();
    } catch (error) {
      console.error("deleteCategory error:", error);
      throw error;
    }
  };

  const handleAddNew = (arg) => console.log(arg);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: "actions",
      flex: 1,
      minWidth: 80,
      maxWidth: 200,
      align: 'right',
      headerName: "Actions",
      headerClassName: "grid-header-custom",
      headerAlign: "center",
      editable: false,
      renderCell: (params) => {
        return (
          <Box display={"flex"} justifyContent="space-around" width={"100%"}>
            <Tooltip title="Edit" placement="left-start">
              <IconButton
                onClick={() => handlePreview(params)}
                sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="right-start">
              <IconButton
                onClick={() => handleDelete(params)}
                sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
              >
                <DeleteOutlineIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box component={'div'} justifyContent={'center'} alignItems={'center'} display={'flex'} maxWidth={'400px'}>
          <h3 style={titleStyle}>Categories</h3>
          <Tooltip title="Add Category" placement="left-start">
            <IconButton
              onClick={(e) => navigate("/add-category/", { replace: true })}
              sx={{ boxShadow: "0px 0px 10px rgba(37, 133, 202, 0.2)" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Tables tableTitle={'Categories Listing'} tableData={categories} cols={columns} />
      </Paper>
    </div>
  );
};
