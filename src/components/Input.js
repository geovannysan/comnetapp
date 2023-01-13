import {Form} from "react-bootstrap"
export default function InputViews({...props}){
    return(
        <Form.Control 
      
        name={props.name}
        value={props.value}
        onChange={(e)=>props.onChange(e.target)}
        />
    )
}