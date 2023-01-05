export function usuario(){
        let usuario = JSON.parse( localStorage.getItem("user"))
        if(usuario){
           
            return usuario
        }else{
            return null
        }

}