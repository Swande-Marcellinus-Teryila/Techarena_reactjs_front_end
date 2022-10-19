import React from "react";

import Button from '@mui/material/Button';


import image1 from '../images/image1.png';
export default function Gallery() {
   
    
    return (
        <div className="container shadow-lg">
        <div className="row mt-90">
            <div className="col-4 mt-90">
                <div className="bg bg-light">
                    <p>
                        <h1 className="text text-success">React js blog for bignners</h1>
                        Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Cupiditate
                        cumque necessitatibus, aspernatur quod at
                        nihil, nulla vero ullam pariatur,
                        <Button variant="contained">Hello World</Button>
                        obcaecati odit reiciendis! Et numquam
                        debitis ea cum quas voluptas enim?
                        <img
                        src={image1}
                        
                        />
                    </p>
                </div>
            </div>
            <div className="col-4">
                <button className="btn btn-primary">
    
                </button>
            </div>
            <div className="col-4">
                <button className="btn btn-primary">Change me</button>
                
            </div>
        </div>
    </div>  
    );
}