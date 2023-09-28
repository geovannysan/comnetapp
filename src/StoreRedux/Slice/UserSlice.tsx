import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        nombre: "",
        apellido: "",
        email: "",
        cedula: "",
    },
    plan: [],
    positio: [-2.129304, -79.936441],
    authb: false,
    progres: false,
    cosultstatus: false,
    soporte: false,
    opcion: "",
    nickname: "",
    señal: {
        onu_signal_value: "",
        onu_status: "",
        onu_signal: ""
    },
    facttura:
    {
        "id": "",
        "legal": "",
        "idcliente": "",
        "emitido": "",
        "vencimiento": "",
        "total": "",
        "estado": "",
        "cobrado": "",
        "impuesto": "",
        "oxxo_id": "",
        "oxxo_referencia": "",
        "barcode_cobro_digital": "",
        "otros_impuestos": "",
        "siro": 0,
        "hashsiro": "",
        "siroconcepto": 0,
        "barcode_siro": "",
        "percepcion_afip": "",
        "saldo": "",
        "moneda": 1,
        "fechapago": "0000-00-00",
        "subtotal": "",
        "subtotal2": "",
        "total2": "",
        "impuesto2": "",
        "operaciones": [],
        "formapago": ""

    },
    modal: {
        nombre: "",
        payloa: ""
    }

}
const userSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        setDatosuser: (state, action) => {
            state.user = { ...action.payload }
        },
        setlogin: (state, action) => {
            state.authb = action.payload.estado;
        },
        setProg: (state, action) => {
            state.progres = action.payload.progres
        },
        setStatus: (state, action) => {
            state.cosultstatus = action.payload.cosultstatus
        },
        setPlan: (state, action) => {
            state.plan = action.payload
        },
        setModal: (state, action) => {
            state.modal = { ...action.payload }
        },
        setSeñal: (state, action) => {
            state.señal = { ...action.payload }
        },
        setOpctionslice: (state, action) => {
            state.opcion = action.payload.opcion
        },
        setNicknameslice: (state, action) => {
            state.nickname = action.payload.nickname
        },
        setSoport: (state, action) => {
            state.soporte = action.payload.soporte
        },
        setPosision: (state, action) => {
            state.positio = [...action.payload]
        },
        setFactura:(state,action)=>{
            state.facttura={...action.payload}
        }

    }
})
export const { setDatosuser, setlogin, setProg, setPlan,
    setNicknameslice, setSoport, setPosision,
    setModal, setStatus, setSeñal, setOpctionslice, setFactura } = userSlice.actions;
export default userSlice.reducer;