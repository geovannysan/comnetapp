import React from "react";
import Datatablesoporte from "./Tabla";

export default function Soportviews() {
    return (
        <div className="container-fluid ">
            <h5></h5>

            <div className="">
                <Datatablesoporte />
                <div className="d-none"
                    style={{
                        display: 'flex',
                        position: 'fixed',
                        height: "100%",
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: '#fff',

                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '5'
                    }}
                >
                    <div className="spinner-border" >
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
           

        </div>
    )
}