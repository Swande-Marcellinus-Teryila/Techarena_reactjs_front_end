
import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useEffect } from "react";
import api from "../../../api/api";
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from "react-router-dom";
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});


export default function Index() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const [collection, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "students - Techarena innovasion "
    getCollections()
  }, [])
  const getCollections = async () => {
    setIsLoading(true);
    await api.get(`roles/`).then(({ data }) => {
      setCollections(data)
      setIsLoading(false)
    })
  }


  const deleteData = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0055ce',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed
    });
    if (!isConfirm) {
      window.location.reload();
    }
    await api.delete(`roles/${id}`).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: data.message
      })
      getCollections()
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error"
      })
    })
  }




  const columns = [
    { name: "ROLE", options: { filterOptions: { fullWidth: true } } },
    "DESCRIPTION",
    {
      name: "Action", 
      options: {
        filter: false,
        sort: false,
        download: false,
        print:false
      }
    },

  ];


  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: true, // <===== will turn off checkboxes in rows
    downloadOptions: {
      filename: 'roles.csv',
    },

    onRowsDelete: (rowsDeleted) => {
      
      deleteData(rowsDeleted.data.map(d =>data[d.dataIndex][data[d.dataIndex].length-1]));
    },
    onTableChange: (action, state) => {
      //console.log(action);
      //console.log(state);
    }
  };

  const addRecordBtn = <><Link to={"create"}>
    <Button title="Add Record" className="add-record-btn">Add Record<ControlPointIcon /> </Button>
  </Link>&nbsp;
    <Button onClick={getCollections} disabled={isLoading} className="refresh-btn"><AutorenewIcon className="refresh-btn-icon" /></Button>
  </>

  const tableHeading = <div className="table-heading"><h1>Roles</h1></div>

  const EditRecord=({id}) =><Link to={`edit/${id}`}>
  <Button title="Edit Record" className="update-record-btn">Edit<EditIcon/> </Button>
</Link>

  let tableData = []
  
    if (collection.length > 0) {
      collection.map((data, idx) => {
       return tableData.push([data.role_name, data.role_description, <EditRecord id={data.id}/>, data.id]);
      })
    }
  
  const data = tableData;

  return (

    <CacheProvider value={muiCache}>
      {tableHeading}
      {addRecordBtn}
      {isLoading ? <LoadingSpinner /> :
        <ThemeProvider theme={createTheme()}>

          <MUIDataTable
            data={data}
            columns={columns}
            options={options}

          />

        </ThemeProvider>
      }
    </CacheProvider>
  );

}

