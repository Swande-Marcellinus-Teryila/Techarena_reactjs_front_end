import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../../api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';











export default function CreateStudent() {
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [photo, setPhoto] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsappNo, setWhatsappNo] = useState("");
    const [email, setEmail] = useState("");
    const [residentialAddress, setResidentialAddress] = useState("");
    const [priSchAttended, setPriSchAttended] = useState("");
    const [secSchAttended, setSecSchAttended] = useState("");
    const [guidianceName, setGuidianceName] = useState("");
    const [guidianceAddress, setGuidianceAddress] = useState("");
    const [guidianceEmail, setGuidianceEmail] = useState("");
    const [guidiancePhone, setGuidiancePhone] = useState("");
    const [courseId, setCourseId] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [sexId, setSexId] = useState("");
    const [martialStatusId, setMaritalStatusId] = useState("");
    const [stateId, setStateId] = useState("");
    const [lgaId, setLgaId] = useState("");
    const [eduQualificationId, setEduQualificationId] = useState("");
    const [employmentStatusId, setEmploymentId] = useState("");
    const [isComputerKnowledgeable, setIsComputerKnowledgeable] = useState("");
    const [isCertificateNeeded, setIsCertificateNeeded] = useState("");

    const [coursesWithDepartmentsWithPrice, setCoursesWithDepartmentsWithPrice] = useState([]);
    const [courseDurations, setCourseDuration] = useState([]);
    const [sexes, setSex] = useState([]);
    const [eduQualifications, setEdualification] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState([]);
    const [states, setState] = useState([]);
    const [lgas, setLga] = useState([]);
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [inputErrorState, setInputErrorState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "create student -Techarena innovasion";
        getCollections();

    }, []);
    const getCollections = async () => {
        setIsLoading(true);
        await api.get(`students/`).then(({ data }) => {
            setCoursesWithDepartmentsWithPrice(data.coursesWithDepartmentsWithPrices);
            setEdualification(data.eduQualification);
            setSex(data.sex);
            setMaritalStatus(data.maritalStatus);
            setIsLoading(false)
        })
    }

    const createCoursePrice = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('course_id', courseId);
            formData.append('department_id', departmentId);

            await api.post(`students/`, formData).then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message
                })
                setIsLoading(false)
                navigate(-1)
            }).catch(({ response }) => {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"

                })
                setIsLoading(false)
            })
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-10">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Student Registration</h4>
                            <hr />
                            <div className="form-wrapper">

                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                />
                                <Form onSubmit={createCoursePrice}>



                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                    <Tab label="Personal Info" value="1" />
                                                    <Tab label="Education" value="2" />
                                                    <Tab label="Course Registration" value="3" />
                                                    <Tab label="Others" value="4" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1">
                                                <Row>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Full Name"
                                                            variant="standard"
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Phone Number"
                                                            variant="standard"
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Whatsapp No"
                                                            variant="standard"
                                                        />
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Email"
                                                            variant="standard"
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Sex</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label="Sex"
                                                                variant="standard"
                                                                required
                                                            >
                                                                <MenuItem>
                                                                    <em>Select</em></MenuItem>
                                                                {sexes.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.sex_name}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>

                                                    <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Marital Status</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label=""
                                                                variant="standard"
                                                            >
                                                                {maritalStatus.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.marital_status}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Country</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label=""
                                                                variant="standard"
                                                            >
                                                                {maritalStatus.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.marital_status}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                    <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label=""
                                                                variant="standard"
                                                            >
                                                                {maritalStatus.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.marital_status}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>

                                                    <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">LGA</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label=""
                                                                variant="standard"
                                                            >
                                                                {maritalStatus.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.marital_status}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col>
                                                        <FormControl sx={{ minWidth: '65%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Employment Status</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label="Sex"
                                                                variant="standard"
                                                                required
                                                            >
                                                                <MenuItem>
                                                                    <em>Select</em></MenuItem>
                                                                {sexes.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.sex_name}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Guidiance Name"
                                                            variant="standard"
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Guidiance Email"
                                                            variant="standard"
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Guidiance Phone Number"
                                                            variant="standard"
                                                        />
                                                    </Col>
                                                 </Row>
                                                 <Row>
                                                 <Col>
                                                <TextField
                                                
                                                id="outlined-multiline-static"
                                                label="Guidiance Address" className="form-control"
                                                multiline autoComplete="on"
                                                rows={2}
                                               
                                                />
                                        </Col>
                                                </Row>

                                                <Row>
                                                 <Col>
                                                <TextField
                                                
                                                id="outlined-multiline-static"
                                                label="Residential Address" className="form-control"
                                                multiline autoComplete="on"
                                                rows={2}
                                                
                                                />
                                        </Col>
                                                </Row>
                                            </TabPanel>

                                            <TabPanel value="2">
                                                <Row>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Primary School Attended"
                                                            variant="standard"
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Secondary School Attended"
                                                            variant="standard"
                                                        />
                                                    </Col>

                                                    <Col>
                                                        <FormControl sx={{ minWidth: '100%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">Educational Qualification</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label="Educational Qualification"
                                                                variant="standard"
                                                            >

                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {eduQualifications.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.qualification}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <TextField

                                                            id="standard-disabled"
                                                            label="Primary School Attended"
                                                            variant="standard"
                                                        />
                                                    </Col>
                                                    </Row>
                                            </TabPanel>

                                            
                                            <TabPanel value="3">
                                                <Row>
                                                    <Col>
                                                    <FormControl sx={{ minWidth: '100%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">
                                                                Course
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-helper-label"
                                                                id="demo-simple-select-helper"
                                                                value={courseId}
                                                                label="Course"
                                                                onChange={(event) => setCourseId(event.target.value)}
                                                                variant ="standard"
                                                                required
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {coursesWithDepartmentsWithPrice.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.course_name}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>


                                                    <Col>
                                                    <FormControl sx={{ minWidth: '100%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">
                                                                Course
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-helper-label"
                                                                id="demo-simple-select-helper"
                                                                value={courseId}
                                                                label="Course"
                                                                onChange={(event) => setCourseId(event.target.value)}
                                                                variant ="standard"
                                                                required
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {coursesWithDepartmentsWithPrice.map((data) => {
                                                                    return <MenuItem value={data.id}>{data.course_name}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                                <Row>
                                            <Col>
                                                    <FormControl sx={{ minWidth: '100%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">
                                                            Do you have perior computer knowledge ?</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label="Educational Qualification"
                                                                variant="standard"
                                                                value ={isComputerKnowledgeable}
                                                                onChange ={(event)=>setIsComputerKnowledgeable(event.target.value)}
                                                            >

                                                                <MenuItem value="0">
                                                                    <em>Yes</em>
                                                                </MenuItem>
                                                                <MenuItem value="1">
                                                                    <em>No</em>
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Col>

                                                    <Col>
                                                    <FormControl sx={{ minWidth: '100%' }}>
                                                            <InputLabel id="demo-simple-select-helper-label">
                                                            Do you need Certificate?</InputLabel>
                                                            <Select
                                                                id="standard-disabled"
                                                                label="Educational Qualification"
                                                                variant="standard"
                                                                value ={isCertificateNeeded}
                                                                onChange ={(event)=>setIsCertificateNeeded(event.target.value)}
                                                            >

                                                                <MenuItem value="0">
                                                                    <em>Yes</em>
                                                                </MenuItem>
                                                                <MenuItem value="1">
                                                                    <em>No</em>
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Col>
                                                </Row>
                                            </TabPanel>
                                            <TabPanel value="4">Item FOUR</TabPanel>
                                        </TabContext>
                                    </Box>



                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Cost" className="form-control"
                                                controlId="Name" value={age}
                                                type="number"
                                                onChange={(event) => {
                                                    setAge(event.target.value)
                                                }} autoComplete="off" size="lg"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={departmentId}
                                                    label="Departement"
                                                    onChange={(event) => { setDepartmentId(event.target.value) }}
                                                    className="form-control"
                                                    disabled={false}
                                                    required
                                                >

                                                    {coursesWithDepartmentsWithPrice.map((data) => {
                                                        if (data.id === courseId) {

                                                            return <MenuItem value={data.department_id}>{data.dept_name}</MenuItem>
                                                        } else {
                                                            return;

                                                        }
                                                    })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>


                                    

                                    <Row>
                                        <Col>
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={departmentId}
                                                    label="Departement"
                                                    onChange={(event) => { setDepartmentId(event.target.value) }}
                                                    className="form-control"
                                                    disabled={false}
                                                    required
                                                >

                                                    {coursesWithDepartmentsWithPrice.map((data) => {
                                                        if (data.id === courseId) {

                                                            return <MenuItem value={data.department_id}>{data.dept_name}</MenuItem>
                                                        } else {
                                                            return;

                                                        }
                                                    })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>


                                    <table>
                                        <tr>
                                            <td>
                                                <Button className="add-record-btn" size="md"
                                                    block="block" type="submit" disabled={isLoading}>
                                                    Add <SaveOutlinedIcon />
                                                </Button>
                                            </td>

                                            <td>

                                                <Button className='btn btn-secondary mt-2 float-end'
                                                    onClick={() => navigate(-1)}>

                                                    <ChevronLeftOutlinedIcon /> Back </Button>
                                            </td>
                                        </tr>
                                    </table>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
