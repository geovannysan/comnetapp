import { Modal } from "@mui/material";
import { LineWave, Radio ,Rings,Triangle} from "react-loader-spinner";
import { useSelector } from "react-redux";
export default function AlerModal(){
    let datos = useSelector(state => state.usuario.modal)
    return(
       
        <Modal 
            open={(datos.nombre=="Alerta")}
        centered
        id="Alerta"
        >
        <div className="h-100 m-auto text-center d-flex flex-column justify-content-center align-items-center" >
                <Rings className="d-none"
                    height="100"
                    width="100"
                    color="#fff"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <span className=" text-white">{datos.payloa}</span>
             </div>
          
            
        </Modal>
    )
}