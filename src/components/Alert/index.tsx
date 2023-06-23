import { IonAlert } from "@ionic/react";
import "./index.css";
import { useState } from "react";
export default function AlerView(props: any) {
    let { setAlert, alert, header, Confirmcall, subheader } = props
    let [datos,setNombre]=useState("")
    const handleNameChange = (event:any) => {
        setNombre(event.target.value);
    };
    function  handleAlertConfirm () {
        // Hacer algo con el valor capturado
      
        //console.log('Nombre:', datos);
        setAlert("")
    };
    return (
        <IonAlert
            header={header}
            isOpen={alert}
            message={subheader}
            cssClass='custom-alert'
            buttons={[
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        setAlert("");
                    },
                },
                {
                    text: 'Confirmar',
                    role: 'confirm'
                    ,
                    handler: () => {
                        Confirmcall();
                    },
                },
            ]}
           /* inputs={[
                {
                    placeholder:'name',
                    name:"datos",
                    value:datos,
                 
                    
                }
            ]}*/
            onDidDismiss={handleAlertConfirm}
        ></IonAlert>
    )
}