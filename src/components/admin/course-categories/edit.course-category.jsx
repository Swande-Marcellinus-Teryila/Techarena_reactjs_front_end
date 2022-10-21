import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import api from '../../../api/api';
import Swal from 'sweetalert2';
import { useNavigate, Params, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';


export default function EditCourseCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [courseCategoryName, setCourseCategoryName] = useState("")
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "edit caourse category -Techarena innovasion";

        getCollections()
    }, [])

    const getCollections = async () => {
        await api.get(`course-categories/${id}`).then(({ data }) => {
            
            const {category_name} = data.content
            setCourseCategoryName(category_name)

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

    const updateCourseCategory = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('_method', 'PATCH');
            formData.append('category_name', courseCategoryName)
            await api.post(`course-categories/${id}`, formData).then(({ data }) => {
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
                            <h3 className="card-title bg bg-light text text-center">Edit course category</h3>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={updateCourseCategory}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Category" className="form-control"
                                                controlId="Name" value={courseCategoryName}
                                                onChange={(event) => {
                                                    setCourseCategoryName(event.target.value)
                                                }} autoComplete="on" size="lg"
                                            />
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
