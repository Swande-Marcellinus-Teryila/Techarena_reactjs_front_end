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


export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [roleName, setRoleName] = useState("")
    const [roleDescription, setRoleDescription] = useState(" ");
    const [validationError, setValidationError] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        document.title = "edit role -Techarena innovasion";

        getCollections()
    }, [])

    const getCollections = async () => {
        await api.get(`roles/${id}`).then(({ data }) => {
            const { role_name, role_description } = data.content
            setRoleName(role_name)
            setRoleDescription(role_description)
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

    const editRole = async (e) => {
        e.preventDefault();
        if (errorMessage === "") {

            setIsLoading(true);

            const formData = new FormData()
            formData.append('_method', 'PATCH');
            formData.append('role_name', roleName)
            formData.append('role_description', roleDescription)
            await api.post(`roles/${id}`, formData).then(({ data }) => {
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
                            <h3 className="card-title bg bg-light text text-center">Edit Role</h3>
                            <hr />
                            <div className="form-wrapper">


                                <Form onSubmit={editRole}>

                                    <Row>

                                        <Col>
                                            <TextField
                                                required
                                                helperText={errorMessage}
                                                id="demo-helper-text-aligned-no-helper"
                                                label="Role" className="form-control"
                                                controlId="Name" value={roleName}
                                                onChange={(event) => {
                                                    setRoleName(event.target.value)
                                                }} autoComplete="on" size="lg"
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="my-3">
                                        <Col>
                                            <TextField

                                                id="outlined-multiline-static"
                                                label="Description" className="form-control"
                                                multiline autoComplete="on"
                                                rows={4} value={roleDescription}
                                                onChange={(event) => {
                                                    setRoleDescription(event.target.value)
                                                }}
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
