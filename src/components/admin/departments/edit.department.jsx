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


export default function EditDepartment() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [department, setDepartment] = useState("")
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "edit department -Techarena innovasion";

        getCollections()
    }, [])

    const getCollections = async () => {
        await api.get(`departments/${id}`).then(({ data }) => {
            
            const {dept_name} = data.content
            setDepartment(dept_name)

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

    const updateDepartment = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('_method', 'PATCH');
            formData.append('dept_name', department)
            await api.post(`departments/${id}`, formData).then(({ data }) => {
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
                            <h3 className="card-title bg bg-light text text-center">Edit Department</h3>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={updateDepartment}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Department" className="form-control"
                                                controlId="Name" value={department}
                                                onChange={(event) => {
                                                    setDepartment(event.target.value)
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
