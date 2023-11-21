const FacturaDetalle = () => {
    let detalle = {
        "iva": "3.11",
        "tarjeta_consumo_id": null,
        "vendedor": {
            "adicional1_cliente": "",
            "personaasociada_id": null,
            "direccion": "COOP. PANCHO JACOME MZ 240 SL20",
            "id": "4pzb8ZY8KhvE3eEw",
            "es_vendedor": true,
            "tipo": "J",
            "razon_social": "COMPUTECNICSNET S.A",
            "nombre_comercial": "COMPUTECNICSNET S.A",
            "es_corporativo": false,
            "porcentaje_descuento": null,
            "origen": null,
            "ruc": "0992782129001",
            "es_empleado": true,
            "banco_codigo_id": null,
            "email": "vendedor@contifico.com",
            "adicional3_cliente": "",
            "es_cliente": true,
            "adicional1_proveedor": "",
            "numero_tarjeta": null,
            "adicional3_proveedor": "",
            "aplicar_cupo": false,
            "adicional2_cliente": "",
            "pvp_default": null,
            "es_extranjero": false,
            "es_proveedor": false,
            "telefonos": "5104910",
            "categoria_nombre": null,
            "adicional4_proveedor": "",
            "tipo_cuenta": null,
            "adicional4_cliente": "",
            "placa": null,
            "adicional2_proveedor": "",
            "id_categoria": null,
            "cedula": null
        },
        "pos": "4511aa3d-fce0-4441-a3e1-0961bd3357af",
        "vendedor_id": "4pzb8ZY8KhvE3eEw",
        "logistica": null,
        "subtotal_0": "0.0",
        "ice": "0.0",
        "descripcion": "Servicio de Internet \r\nPlan internet : FIBRA-ADVANCE - ANTIGUO 80000K/80000K\r\nfacturacin del 13/08/2023 al 12/09/2023\r\nFecha del corte anterior : 18/08/2023\r\nMes  : Agosto",
        "total": "28.99",
        "id": "BleXYX7wxi5WAarN",
        "subtotal_12": "25.88",
        "servicio": "0.0",
        "detalles": [
            {
                "porcentaje_iva": 12,
                "promocion_integracionId": null,
                "cantidad": "1.0",
                "base_no_gravable": "0.0",
                "descripcion": null,
                "producto_id": "onPeEAWwph9Yyep1",
                "formula_asociada": null,
                "peso": null,
                "ibpnr": "0.0",
                "centro_costo_id": "9pgenRA6cOkweNQx",
                "porcentaje_descuento": "0.0",
                "valor_ice": "0.0",
                "nombre_manual": null,
                "formula": [],
                "porcentaje_ice": null,
                "adicional1": null,
                "personas_asociadas": null,
                "serie": null,
                "codigo_bien": null,
                "producto_nombre": "FIBRA-ADVANCE - ANTIGUO",
                "base_cero": "0.0",
                "base_gravable": "25.88",
                "volumen": null,
                "precio": "25.88",
                "color_id": null,
                "cuenta_id": null
            }
        ],
        "referencia": "",
        "saldo_anticipo": "0.0",
        "tipo_domicilio": null,
        "autorizacion": null,
        "hora_evento": null,
        "url_ride": "https://0992782129001.contifico.com/sistema/registro/documento/ride/3eMOY3FaTX.pdf",
        "fecha_creacion": "18/08/2023",
        "cobros": [
            {
                "forma_cobro": "CAJA",
                "numero_comprobante": "Efectivo",
                "caja_id": null,
                "monto": "28.99",
                "numero_tarjeta": null,
                "fecha": "18/08/2023",
                "nombre_tarjeta": null,
                "tipo_banco": null,
                "cuenta_bancaria_id": null,
                "bin_tarjeta": null,
                "monto_propina": null,
                "numero_cheque": null,
                "fecha_cheque": null,
                "tipo_ping": null,
                "id": "1qdGvnoo9IY6nbN8",
                "lote": null
            }
        ],
        "tipo_descuento": null,
        "orden_domicilio_id": null,
        "fecha_vencimiento": "18/08/2023",
        "documento_relacionado_id": null,
        "reserva_relacionada": null,
        "fecha_emision": "18/08/2023",
        "vendedor_identificacion": null,
        "documento": "001-001-000009013",
        "adicional2": null,
        "firmado": false,
        "adicional1": null,
        "hora_emision": null,
        "url_xml": null,
        "persona": {
            "adicional1_cliente": "",
            "personaasociada_id": null,
            "direccion": "COOP SERGIO TORAL 2 MZ 4913 SL 15",
            "id": "x01dNw6DAFlzLeX7",
            "es_vendedor": false,
            "tipo": "N",
            "razon_social": "RAMIREZ POZO KEVIN FABRICIO",
            "nombre_comercial": "RAMIREZ POZO KEVIN FABRICIO",
            "es_corporativo": false,
            "porcentaje_descuento": "0.0",
            "origen": null,
            "ruc": "",
            "es_empleado": false,
            "banco_codigo_id": null,
            "email": "pozotomalamarlene-1966@hotmail.com",
            "adicional3_cliente": "",
            "es_cliente": true,
            "adicional1_proveedor": "",
            "numero_tarjeta": "",
            "adicional3_proveedor": "",
            "aplicar_cupo": false,
            "adicional2_cliente": "",
            "pvp_default": "",
            "es_extranjero": false,
            "es_proveedor": false,
            "telefonos": "0967423859",
            "categoria_nombre": null,
            "adicional4_proveedor": "",
            "tipo_cuenta": null,
            "adicional4_cliente": "",
            "placa": null,
            "adicional2_proveedor": "",
            "id_categoria": null,
            "cedula": "0954764411"
        },
        "saldo": "0.0",
        "entregado": true,
        "tipo_registro": "CLI",
        "url_": null,
        "estado": "C",
        "persona_id": "x01dNw6DAFlzLeX7",
        "tipo_documento": "FAC",
        "fecha_evento": null,
        "electronico": true,
        "direccion_evento": null,
        "placa": null,
        "pax": null,
        "anulado": false,
        "caja_id": null
    }
    return (
        <div className="card">
            <div className="container col-8 border m-5">
                <div className="row">
                    <div className="col-6">
                        <h5 className="text-uppercase fw-bold" >Factura</h5>
                    </div>
                    <div className="col-6 text-right">
                        <h5 className="text-uppercase fw-bold">Fecha:</h5>
                        <h5 className="text-uppercase fw-bold">{detalle.fecha_emision}</h5>
                    </div>
                </div>
                <div className="row border-top border-bottom">
                    <div className="col-6">
                        <h5 className="text-uppercase fw-bold">Nombre del Cliente:</h5>
                        <h5 className="text-uppercase fw-bold">{detalle.persona.razon_social}</h5>
                    </div>
                    <div className="col-6 text-right">
                        <h5 className="text-uppercase fw-bold">Número de Factura:</h5>
                        <h5 className="text-uppercase fw-bold">{detalle.documento}</h5>
                    </div>
                </div>
                <div className="row border-top border-bottom">
                    <div className="col-9 mt-2  " style={{
                        lineHeight: 0.5
                    }}>
                        <div className=" d-flex">
                            <p className="text-uppercase fw-bold px-1">Cédula:</p>
                            <p className="text-uppercase fw-bold">{detalle.persona.cedula}</p>
                        </div>
                        <div className=" d-flex">
                            <p className="text-uppercase fw-bold px-1">Telefono:</p>
                            <p className="text-uppercase fw-bold">{detalle.persona.telefonos}</p>
                        </div>
                        <div className=" d-flex">
                            <p className="text-uppercase fw-bold px-1">email:</p>
                            <p className="text-uppercase fw-bold">{detalle.persona.email}</p>
                        </div>

                    </div>

                </div>
                <div className="row border-bottom">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.detalles.map((elm, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{elm.producto_nombre}</td>
                                            <td>{elm.cantidad}</td>
                                            <td>{elm.precio}</td>
                                            <td>{elm.precio}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row border-bottom">
                    <div className="col-6 p-3">
                        <span className="">{"Servicio de Internet \r\nPlan internet : FIBRA-ADVANCE - ANTIGUO 80000K/80000K\r\nfacturacin del 13/08/2023 al 12/09/2023\r\nFecha del corte anterior : 18/08/2023\r\nMes  : Agosto"}</span>
                    </div>
                    <div className="col-6 text-right">
                    </div>
                </div>
                <div className="row">


                    <div className="col-6">
                        <table className=" table table-bordered">
                            <thead>
                                <tr>
                                    <th>Forma de pago</th>
                                    <th>Comprobante</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalle.cobros.map((elm,inde)=>{
                                    return(
                                        <tr key={inde}>
                                            <td>{elm.forma_cobro}</td>
                                            <td>{elm.numero_comprobante}</td>
                                            <td>{elm.monto}</td>
                                        </tr>
                                        )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">


                        <div className="row ">
                            <div className="col-12 text-right p-2">
                                <span className="text-uppercase fw-bold px-1">Subtotal:</span>
                                <span className="text-uppercase fw-bold border-bottom">$25.88</span>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-12 text-right p-2">
                                <span className="text-uppercase fw-bold px-1">Impuesto:</span>
                                <span className="text-uppercase fw-bold">$3.11</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-right p-2">
                                <span className="text-uppercase fw-bold px-1">Total:</span>
                                <span className="text-uppercase fw-bold">$28.99</span>
                            </div>
                        </div>
                    </div>
                </div>            </div>
        </div>
    )
}
export default FacturaDetalle