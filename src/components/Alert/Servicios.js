import { PersonPinCircle } from "@mui/icons-material";
import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDatosuser } from "../../StoreRedux/Slice/UserSlice";
import { blue } from "@mui/material/colors";

export default function DialogoServicio(prosp) {
    let { handleClose, open } = prosp
    let usedisp = useDispatch()
    let servicios = JSON.parse(localStorage.getItem("Perfiles"))
    function handleListItemClick(me) {
        console.log({ ...servicios.filter(perf => perf.id === me)[0].servicios.filter })
        localStorage.setItem("USERLOGIN", JSON.stringify({ ...servicios.filter(perf => perf.id === me)[0] }))
        usedisp(setDatosuser({ ...servicios.filter(f => f.id == me)[0] }))
        handleClose()
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <List sx={{ pt: 0 }}>
                {servicios.map((email, i) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(email.id)} key={i}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonPinCircle />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email.correo} secondary={email.nombre + "\n" + email.direccion_principal} 
                           
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

            </List>
        </Dialog>
    )
}