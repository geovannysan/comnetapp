import React, { useEffect } from "react";
export default function ComprovanteViews() {
    useEffect(() => {


    }, [])


    return (
        <div className="container " >
            <h5>Comprobantes</h5>

            <div className="bg-white">
                <div className="w-100 py-3 bg-dark">
                    <div className="text-white ps-2">
                        <i className="bi bi-file-earmark-pdf"></i> Comprobantes
                    </div>
                </div>
                <div className="p-2">
                    <table id="example" className="table  table-bordered">
                        <thead className="border">
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
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td>00150764</td>
                                <td>0</td>
                                <td>30/12/2022</td>
                                <td>30/12/2022</td>
                                <td>0/0/0000</td>
                                <td>$ 0.00  </td>
                                <td>$ 0.00</td>
                                <td>$ 0.00</td>
                                <td><span className="badge bg-danger border"> Activo </span></td>
                                <td> <button className="btn bg-white">Pagar Factura </button> </td>
                            </tr>


                        </tbody>
                    </table>

                </div>

            </div>



        </div>
    )


}