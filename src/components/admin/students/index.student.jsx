
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
import { Typography } from "@mui/material";


const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});


export default function StudentIndex() {
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
    await api.get(`students/`).then(({ data }) => {
    typeof(data.students)=== 'undefined' ? setCollections([]):setCollections(data.students)
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
    await api.delete(`students/${id}`).then(({ data }) => {
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

  const updateStatus = async (id, status,targetc) => {

    await api.get(`students/${id}/${status}/${targetc}`).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: data.message
      })
      getCollections()
    }).catch((er) => {
      console.log(er.response.data)
      //Swal.fire({
      //text:data.message,
      // icon:"error"
      // })
    })
  }



  const columns = [
    { name: "FULL NAME", options: { filterOptions: { fullWidth: true } } },
    "Age",
    'PHOTO',
    'PHONE',
    'WHATSAPP NO',
    'EMAIL',
    'RESD. ADDRESS',
    'PRI.SCH',
    'SEC. SCH',
    'GUIDIANCE_NAME',
    'GUIDIANCE_ADDRESS',
    'GUIDIANCE_EMAIL',
    'GUIDIANCE_PHONE',
    'Course',
    'DEPT',
    'COURSE DURATION',
    'SEX',
    'MARITAL STATUS',
    'STATE',
    'LGA',
    'EDU. QUALIFICATION',
    'EMPLOYMENT STATUS',
    'COMPUTER KNOWLEDGE',
    'CERTIFICATE',
    'DURATION STATUS',
    'APRROVAL',
    'STATUS',
    'DATE REG.',
    'DATE UPDATED',
 
    {
      name: "Action", 
      options: {
        filter: false,
        sort: false,
        download: false,
        print:false
      }
    },
    {
      name: " .", 
      options: {
        filter: false,
        sort: false,
        download: false,
        print:false
      }
    },
    {
      name: ".", 
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
      filename: 'Students-Techarena.csv',
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

  const tableHeading = <div className="table-heading" style={{textAlign:'left'}}><h1>Students</h1></div>

  const EditRecord=({id}) =><Link to={`edit/${id}`}>
  <Button title="Edit Record" className="update-record-btn">Edit<EditIcon/> </Button>
</Link>
const StatusSetter = ({id,status,targetc,msg}) =><>
{status=== 0 ? <Button
                      class="btn btn-success"
                      onClick ={()=>{
                        updateStatus(id,status=1, targetc);
                      }}
                      >{msg.positive}</Button>:
<Button  class="btn btn-danger"
onClick ={()=>{
  updateStatus(id,status=0, targetc);
}}
>{msg.negative}</Button>}</>

  let tableData = []
  
    if (collection.length > 0) {
      collection.map((data, idx) => {
       return tableData.push([
        data.full_name,
        data.age,
        data.photo,
        data.phone,
        data.whatsapp_no,
        data.email,
        data.residential_address,
        data.pri_sch_attended,
        data.sec_sch_attended,
        data.guidiance_name,
        data.guidiance_address,
        data.guidiance_email,
        data.guidiance_phone,
        data.course_id,
        data.dept_name,
        data.months,
        data.sex_name,
        data.marital_status,
        data.state_name,
        data.lga_name,
        data.qualification,
        data.employment_status,
        data.is_computer_knowledgeable===1?"Yes":"No",
        data.is_certicate_needed===1 ?"YES":"No",
        data.is_duration_over=== 1 ? "OVER":"NOT OVER",
        data.is_approved === 1 ? "Approved":"Declined",
        data.status === 1 ? "Active" : "Blocked",
        data.created_at,
        data.updated_at,
        <StatusSetter status ={data.is_approved} id={data.student_id} targetc ={'is_approved'}
        msg ={{positive:'Approve', negative:'Decline'}}/>,
        <StatusSetter status ={data.status} 
        id={data.student_id} 
        targetc ={'status'} msg ={{positive:'Activate', negative:'Block'}} />,
        <EditRecord id={data.student_id}/>,
         data.student_id]);
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
            title ="STUDENTS"

          />

        </ThemeProvider>
      }
    </CacheProvider>
  );

}

