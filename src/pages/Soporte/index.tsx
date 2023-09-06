import axios from "axios";
import Datatablesoporte from "./Tabla";
export default function Soportviews() {
    document.addEventListener('ionBackButton', (ev:any) => {
        ev.detail.register(10, () => {
            console.log('Handler was called!');
        });
    });
    


    return (
        <div className="container-fluid">
            
            
                    <Datatablesoporte />
                
               
            
        </div>
    )
}