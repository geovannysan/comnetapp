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
export default function DialogViewapago(props) {
    let { setAlert, alert, header, ComfirmaDepo, subheader, ConfrimaTarje } = props
    return (
        <>
            <Dialog open={alert} TransitionComponent={Transition} onClose={() => setAlert(false)}>
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <div className=' text-center'>
                        {subheader}
                    </div>
                    
                </DialogContent>
                <DialogActions className=' d-flex justify-content-between'>
                    <Button className='btn btn-sm   text-white rounded-pill btn-size-1 py-25 shadow-2' color='error' variant={"contained"} onClick={() => ConfrimaTarje()}>Gen. Link</Button>
                    <Button className='btn btn-sm  bg-blue-gradient text-white rounded-pill btn-size-1 py-25 shadow-2' color={"success"} variant={"contained"} onClick={() => ComfirmaDepo()}>Rep. Deposito</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}