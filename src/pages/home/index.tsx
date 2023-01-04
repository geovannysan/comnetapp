import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';



const Page: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (

        <div className='container-fluid  h-100  d-flex justify-content-center align-items-center'
        
        style={{
            backgroundColor:"#10063e"
        }}
        >


            <div className='container  d-flex justify-content-center '>
                <div className=' col-12 col-md-4 justify-content-center'>
                    <div className='col-12'>
                        <img src='https://portal.comnet.ec/admin/images/logo.png?t=1672860298' />
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
                        <button className='btn col-12  btn-primary'> Ingrese al Portal </button>

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