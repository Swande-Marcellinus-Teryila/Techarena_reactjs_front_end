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


export default function CreateCoursePrices() {
    const navigate = useNavigate();
    const [cost, setCost] = useState('');
    const [courseId, setCourseId] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [coursesWithDepartments, setCoursesWithDepartments] = useState([]);
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [inputErrorState, setInputErrorState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "create course prices -Techarena innovasion";
        getDepartments();
     
    }, []);
    const getDepartments = async () => {
        setIsLoading(true);
        await api.get(`course-prices/`).then(({ data }) => {
            
            setCoursesWithDepartments(data.coursesWithDepartments)

            setIsLoading(false)
        })
    }

    const createCoursePrice = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('cost', cost);
            formData.append('course_id', courseId);
            formData.append('department_id', departmentId);

            await api.post(`course-prices/`, formData).then(({ data }) => {
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
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add New Course Prices</h4>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={createCoursePrice}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                
                                                
                                               
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Cost" className="form-control"
                                                controlId="Name" value={cost}
                                                type = "number"
                                                onChange={(event) => {
                                                    setCost(event.target.value)
                                                }} autoComplete="off" size="lg"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormControl sx={{ minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Course</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={courseId}
                                                    label="Course"
                                                    onChange={(event) => setCourseId(event.target.value)}
                                                    className="form-control"
                                                    required
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {coursesWithDepartments.map((data) => {
                                                        return <MenuItem value={data.id}>{data.course_name}</MenuItem>
                                                    })}
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
                                                    onChange={(event) =>{setDepartmentId(event.target.value)}}
                                                    className="form-control"
                                                    disabled ={false}
                                                    required
                                                >
                                            
                                                    {coursesWithDepartments.map((data) => {
                                                        if(data.id ===courseId){
                                                            
                                                        return <MenuItem value={data.department_id}>{data.dept_name}</MenuItem>
                                                        }else{
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
