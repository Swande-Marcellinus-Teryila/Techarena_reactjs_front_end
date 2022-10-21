import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../../api/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';


export default function CreateCategory() {
    const navigate = useNavigate();
    const [categoryName, setCoursecategoryName] = useState("")

    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "create course category -Techarena innovasion";
    }, [categoryName]);
    const createCourseCategory = async (e) => {
        e.preventDefault();
        if (errorMessage ==="") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('category_name', categoryName)
   
            await api.post(`course-categories/`, formData).then(({ data }) => {
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
                            <h4 className="card-title">Add New Course Category</h4>
                            <hr />
                            <div className="form-wrapper">
                

                                <Form onSubmit={createCourseCategory}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Category" className="form-control"
                                                controlId="Name" value={categoryName}
                                                onChange={(event) => {
                                                    setCoursecategoryName(event.target.value)
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
