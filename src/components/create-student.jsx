import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function RegForm() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);

    const baseUrl = `http://localhost:8000/api/home/`;
    let formData = {};
    const handleSubmit = async (event) => {
        event.preventDefault();
        formData = {
            'username': username,
            'password': password,
            'email': email,
            'role': role
        }

        await axios.post(baseUrl, formData).then(({ data }) => {
            (data.status == 422)?alert(data.message):alert(data.message);
        }).catch(({ response }) => {
            alert(response.data.message);
        });

    }




    return (

        <div className="container">
            <div className="row">
                <div className="col-4">
                    &nbsp;
                </div>
                <div className="col-6">
                    <div className="text text-primary">User Registration</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-10">
                            <input className="form-control" placeholder="username"
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div className="mb-10">
                            <input className="form-control" placeholder="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }} />
                        </div>
                        <div className="mb-10">
                            <input className="form-control" placeholder="Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }} />
                        </div>
                        <div className="mb-10">
                            <select
                                className="form-control"
                                value={role}
                                onChange={(event) => {
                                    setRole(event.target.value)
                                }}

                            >
                                <option value={1}>Admin</option>
                                <option value={2}>Second user</option>
                                <option value={3}>Third User</option>
                            </select>
                        </div>
                        <br />
                        <input type="submit" className="btn btn-primary" value="Save" />
                    </form>
                </div>
            </div>
        </div>
    );
}