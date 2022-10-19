import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

//prime
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CountUp from 'react-countup';


const iconName = ""
function AdminCardContent({ titleName, numberCounts, icon }) {

    return (

        <Card title={titleName} style={{
            width: '100%', fontSize: '24px',
            marginbottom: '0',
            fontweight: '600',
            color: '#012970',
            textAlign: "center",
            paddingLeft: '10px',
        }}>

            <span style={{ fontSize: '3.7rem', textAlign: 'center', borderRadius: '100%', backgroundColor: '#f6f6fe' }}>
                {icon}

            </span>
            <b style={{ paddingLeft: '10px' }}>

                <CountUp start={0} end={numberCounts} delay={0}>
                    {({ countUpRef }) => (
                        <b>
                            <span ref={countUpRef} />
                        </b>
                    )}
                </CountUp></b>
        </Card>
    )
}

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        document.title  = "Admin Dashboard";
        getUsers()
    }, []);

    const getUsers = async () => {
        await axios.get(`http://localhost:8000/api/home`).then(({ data }) => {
            setUsers(data.data)
        })
    }

    const adminCards = <div className="container shadow-lg">
        <div className="row">
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Students" numberCounts='500' icon={<GroupIcon style={{ fontSize: '3.7rem', textAlign: 'center' }} className="dashboard-icons" />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Staff" numberCounts='15' icon={<PeopleAltIcon style={{ fontSize: '3.7rem', textAlign: 'center', color:'lightgreen' }} />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Courses" numberCounts='50' icon={<AutoStoriesIcon  style={{ fontSize: '3.7rem',textAlign: 'center', color:'#b3b3ff' }}  />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Partners" numberCounts='41' icon={<GroupIcon style={{ fontSize: '3.7rem', textAlign: 'center',color:'#ffb3e6' }} className="dashboard-icons" />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Products" numberCounts='101' icon={<WorkIcon style={{ fontSize: '3.7rem', textAlign: 'center',color:'#e67300' }} className="dashboard-icons" />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="schoolarships" numberCounts='131' icon={<SchoolIcon style={{ fontSize: '3.7rem', textAlign: 'center',color:'#ff8fb9' }} className="dashboard-icons" />} />
            </div>
            <div className="col-md-3 bg bg-light" style={{marginBottom:'10px'}}>
                <AdminCardContent titleName="Departments" numberCounts='131' icon={<HomeWorkIcon style={{ fontSize: '3.7rem', textAlign: 'center',color:'#80ffaa' }} className="dashboard-icons" />} />
            </div>
            
            
            
        </div>
    </div>





    return (
        <div>
            {adminCards}

          
        </div>

    );
}
