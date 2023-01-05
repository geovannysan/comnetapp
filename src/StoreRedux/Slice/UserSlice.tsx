import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        nombre:"",
        apellido:"",
        email:"",
        cedula:"",
    },
    authb: false
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
        }
    }
})
export const { setDatosuser, setlogin } = userSlice.actions;
export default userSlice.reducer;