import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        nombre:"",
        apellido:"",
        email:"",
        cedula:"",
    },
    plan:[],
    authb: false,
    progres:false,
}
const userSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        setDatosuser: (state, action) => {
            state.user ={ ...action.payload}
        },
        setlogin: (state, action) => {
            state.authb = action.payload.estado;
        },
        setProg:(state,action)=>{
            state.progres=action.payload.progres
        },
        setPlan:(state,action)=>{
            state.plan= action.payload
        }
    }
})
export const { setDatosuser, setlogin,setProg ,setPlan} = userSlice.actions;
export default userSlice.reducer;