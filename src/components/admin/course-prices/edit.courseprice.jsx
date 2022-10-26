import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../../api/api';
import Swal from 'sweetalert2';
import { useNavigate, Params, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';


export default function EditCoursePrice() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cost, setCost] = useState('');
    const [courseId, setCourseId] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [coursesWithDepartments, setCoursesWithDepartments] = useState([]);
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "edit course prices -Techarena innovasion";

        getCollections()
    }, [])

    const getCollections = async () => {
        await api.get(`course-prices/${id}`).then(({ data }) => {
            
            const {cost,course_id,department_id} = data.content;
             setCoursesWithDepartments(data.coursesWithDepartments)

            setDepartmentId(department_id);
            setCourseId(course_id);
            setCost(cost);
            

        }).catch(({ response: { data } }) => {

            if (data.status === 404) {
                navigate('/404')
            } else {
                setIsLoading(true);
                Swal.fire({
                    text: data.message,
                    icon: "error"
                })
            }


        })
    }

    const updateCoursePrices = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('_method', 'PATCH');
            formData.append('cost', cost);
            formData.append('course_id', courseId);
            formData.append('department_id', departmentId);
            await api.post(`course-prices/${id}`, formData).then(({ data }) => {
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
                            <h3 className="card-title bg bg-light text text-center">Edit Course Price</h3>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={updateCoursePrices}>

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
                                                    Update
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
