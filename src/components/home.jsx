import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
export default function Home() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = async () => {
        await axios.get(`http://localhost:8000/api/home`).then(({ data }) => {
            setUsers(data.data)
        })
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-12 bg bg-light">
                    <h1 className="text text-success">Welcome to our page</h1>
                    <h2>we are currently working on it</h2>
                    <table className="table able-responsive table-striped table-success">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>EMAIL</th>
                                <th colSpan={2}>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => {
                                    return (<tr key={user}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Link to={`edit/${user.id}`} className="btn btn-primary">Edit</Link>
                                        </td>
                                        <td>
                                            <button class="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>)
                                })
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
}
