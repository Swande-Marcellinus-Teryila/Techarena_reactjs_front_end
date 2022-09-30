import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <nav>
            <ul>
                <li><Link to="/" className="link">Home</Link></li>
                <li><Link to="/gallery" className="link">Gallery</Link></li>
                <li><Link to="/create-student" className="link">Sign Up</Link></li>
                <li><Link to="/topbar" className="link">Topbar</Link></li>
               
                
            </ul>
        </nav>
    );
}