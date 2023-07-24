import { Modal } from "react-bootstrap";
import { LineWave, Radio ,Triangle} from "react-loader-spinner";
import { useSelector } from "react-redux";
export default function AlerModal(){
    let datos = useSelector(state => state.usuario.modal)
    return(
       
        <Modal 
            show={(datos.nombre=="Alerta")}
        centered
        id="Alerta"
        >
        <Modal.Body className="m-auto text-center d-flex flex-column justify-content-center align-items-center" >
                <Triangle
                    height="100"
                    width="100"
                    color="#fff"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <span className=" text-white">{datos.payloa}</span>
             </Modal.Body>
          
            
        </Modal>
    )
}