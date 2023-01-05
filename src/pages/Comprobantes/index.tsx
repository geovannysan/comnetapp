import React from "react";

export default function ComprovanteViews (){
    return(
        <div className="container " >
            <h5>Comprobantes</h5>

            <div className="card">
                <div className="card-body">
                    <table className="table table-striped  table-bordered">
                        <thead>
                            <tr>
                                
                                <th >No</th>
                                <th >No LEGAL</th>
                                <th >EMITIDO</th>
                                <th >VENCIMIENTO</th>
                                <th >PAGADO</th>
                                <th >SUBTOTAL</th>
                                <th >IMPUESTO</th>
                                <th >TOTAL</th>
                                <th >ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>



        </div>
    )


}