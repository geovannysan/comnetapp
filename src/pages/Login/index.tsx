import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams ,useHistory } from 'react-router';
import logo from "../../imagen/logo.png"

import { useDispatch } from 'react-redux';
import { setDatosuser,setlogin } from '../../StoreRedux/Slice/UserSlice';

const Page: React.FC = () => {
let usedispat = useDispatch()
let history = useHistory()
    const { name } = useParams<{ name: string; }>();
    function logearse(){
        usedispat(setlogin({ estado :true}))
        history.push("/page/inicio")

    }

    return (

        <div className='container-fluid  h-100  d-flex justify-content-center align-items-center'
        
        style={{
            backgroundColor:"#10063e"  
        }}
        >


            <div className='container  d-flex justify-content-center '>
                <div className=' col-12 col-md-4 justify-content-center'>
                    <div className='col-12'>
                        <img src={logo} />
                    </div>
                    <div className="  col-sm-12">
                        <label className="form-label"></label>
                        <input type="text"
                            placeholder='Usuario' className="form-control" id="validationCustom01"
                            required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-sm-12 ">
                        <label className="form-label"></label>
                        <input type="text"
                            placeholder='Contraseña' className="form-control" id="validationCustom01" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className='col-12 d-flex justify-content-center pt-3'>
                        <button className='btn col-12  btn-primary' onClick={logearse}> Ingrese al Portal </button>

                    </div>
                    <div className='mt-2 d-flex justify-content-center'>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                <label className="form-check-label text-white" > Mantener activa la sesión </label>                       </div>
                    </div>
                </div>
            </div>




        </div>



    );
};

export default Page;