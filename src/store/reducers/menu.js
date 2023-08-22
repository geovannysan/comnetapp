// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    user: {
        Id: 3,
        nombre: 'scajape@comnet.ec',
        password: '0999999999',
        permiso: '2',
        telefono: '',
        usuario: 'scajape'
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
        setUser(state, action) {
            state.user = action.payload.user;
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer, setUser } = menu.actions;
