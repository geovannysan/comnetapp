// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    spiner: false,
    facturas: [],
    clientes: [],
    tickets: [],
    user: {
        Id: '',
        nombre: '',
        password: '',
        permiso: '',
        telefono: '',
        usuario: ''
    },
    estado: false,
    facturadetalle: {

    }
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setTickets(state, action) {
            state.tickets = [...action.payload.tickets];
        },
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
        setFacturas(state, action) {
            state.facturadetalle = action.payload.factura
        },
        setSpiner(state, action) {
            state.spiner = action.payload.spiner
        },
        setListaFactura(state, action) {
            state.facturas = action.payload.listaFactura
        },
        setClientes(state, action) {
            state.clientes = action.payload.clientes
        }
    }
});

export default menu.reducer;

export const { activeItem,
    activeComponent,
    setListaFactura,
    setClientes,
    openDrawer,
    openComponentDrawer,
    setDatosuser,
    setlogin,
    setFacturas,
    setTickets
} = menu.actions;
