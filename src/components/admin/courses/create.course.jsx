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


export default function CreateDepartments() {
    const navigate = useNavigate();
    const [course_name, setCourseName] = useState("")
    const [description, setDescription] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [departments, setDepartments] = useState([])

    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "create courses -Techarena innovasion";
        getDepartments();
    }, []);
    const getDepartments = async () => {
        setIsLoading(true);
        await api.get(`courses/`).then(({ data }) => {
          setDepartments(data.departments)
          setIsLoading(false)
        })
    }

    const createCourse = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('course_name', course_name);
            formData.append('description', description);
            formData.append('department_id', departmentId);

            await api.post(`courses/`, formData).then(({ data }) => {
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
                            <h4 className="card-title">Add New Course</h4>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={createCourse}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Course" className="form-control"
                                                controlId="Name" value={course_name}
                                                onChange={(event) => {
                                                    setCourseName(event.target.value)
                                                }} autoComplete="on" size="lg"
                                            />
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col>
                                            <FormControl sx={{minWidth: '100%' }}>
                                                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={departmentId}
                                                    label="Departement"
                                                    onChange={(event)=>setDepartmentId(event.target.value)}
                                                    className="form-control"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {departments.map((data)=>{
                                                      return <MenuItem value={data.id}>{data.dept_name}</MenuItem>  
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <TextField

                                                helperText={errorMessage}
                                                rows={4}
                                                multiline
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Description" className="form-control"
                                                controlId="Name" value={description}
                                                onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} autoComplete="on" size="lg"
                                            />
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
