// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    spiner: false,
    user: {
        Id:'',
        nombre: '',
        password: '',
        permiso: '',
        telefono: '',
        usuario: ''
    },
    estado: false,
    facturadetalle:{

    }
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },
        setDatosuser(state, action) {
            state.user = action.payload;
        },
        setlogin(state, action) {
            state.estado = action.payload.estado
        },
        setFacturas(state,action){
            state.facturadetalle=action.payload.factura
        },
        setSpiner(state,action){
            state.spiner=action.payload.spiner
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, setDatosuser, setlogin,setFacturas } = menu.actions;
