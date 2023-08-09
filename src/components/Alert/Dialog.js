import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogViewa(props) {
     let { setAlert, alert, header, Confirmcall, subheader } = props
    function  handleAlertConfirm () {
        // Hacer algo con el valor capturado
      
        //console.log('Nombre:', datos);
        setAlert("")
    };
    return (
        <>
            <Dialog open={alert} TransitionComponent={Transition} onClose={()=>setAlert("")}>
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                   {subheader}
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setAlert("")}>Cancelar</Button>
                    <Button onClick={()=>Confirmcall()}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}