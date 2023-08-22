const cedula = document.getElementById("cedula")
const nombre = document.getElementById("name")
const movil = document.getElementById("movil")
const direccion = document.getElementById("direccion")
const email = document.getElementById("email")
const mailconfirma = document.getElementById("emailconfirma")
const password = document.getElementById("password")
const passwordcomfirma = document.getElementById("passwordcomfirma")
const perfil = document.getElementById("perfil")
var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))

const toastbody = document.getElementById("toast-body")
const toaast = document.querySelector('#toast-header')
const toasheader = document.getElementById("toastheader")
const spiner = document.getElementById("spiner")
function Toastainit(he, msg, rm, add) {
    console.log(he, msg, rm, add)
    toastbody.innerHTML = "" + msg;
    toasheader.innerHTML = "" + he
    toaast.classList.remove("" + rm)
    toaast.classList.add("" + add)
    new bootstrap.Toast(document.querySelector('#basicToast')).show();
}
const buscarcliente = async (datos) => {
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/consultar_cedula", datos, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
const crearsuscrito = async (datos) => {
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/crear_suscriptor", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (err) {
        return err
    }


}
async function Buscarcedula(cedula) {
    try {
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/cedula/" + cedula)
        const { success } = data
        if (success) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        return error;
    }
}

function consultarcedula() {
    if (perfil.value == "cedula") {

        console.log(cedula.value)
        if (cedula.value.trim().length == 10) {
            Buscarcedula(cedula.value).then(oupt => {
                if (oupt.success) {
                    nombre.value = oupt.data.name
                    direccion.value = oupt.data.direccion
                }
                console.log(oupt)
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            Toastainit("Ingrese una cédula", 'Formato de minimo 10 dígitos ', "bg-primary", "bg-danger")
        }
    }

}

document.getElementById("registro").addEventListener("submit", function (e) {

    e.preventDefault()
    console.log(e)

    let info = {
        nombreCompleto: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        movil: movil.value.trim(),
        ciudad: "urbanfest",
        //ciudad: modal.estado == "Subscription" ? "Eladio Carrion" :"guayaquil",
        direccion: direccion.value.trim(),
        cedula: cedula.value.trim(),
    }
    console.log(Object.values(info))
    if (!Object.values(info).every(e => e)) {
        Toastainit("Faltan datos por llenar", 'Complete los campos restantes', "bg-primary", "bg-danger")
    }
    else if (email.value.trim() != mailconfirma.value.trim()) {
        Toastainit("Email incorecto ", 'el correo de confirmación no coinciden ', "bg-primary", "bg-danger")
    }
    else if (password.value.trim() != passwordcomfirma.value.trim()) {
        Toastainit("Contraseña incorecto ", 'la contraseña de confirmación no coinciden ', "bg-primary", "bg-danger")
    } else {
        buscarcliente({ "cedula": cedula.value, "email": "" }).then(ou => {
            if (ou.success) {
                //myModal.toggle()
                document.getElementById("registro").reset();
                Toastainit("Usuario registrado", nombre.value.trim() + " registrado correctamente", "bg-danger", "bg-success")
            } else {
                crearsuscrito(info).then(oupt => {
                    console.log(oupt)
                    if (oupt.success) {
                         document.getElementById("registro").reset();
                     //   myModal.toggle()
                        Toastainit("Usuario registrado", nombre.value.trim() + " registrado correctamente", "bg-danger", "bg-success")
                    }
                    else {
                        Toastainit("Error de registro",
                            "El Email ya " + email.value.trim() + " se encuentra registrado intente con otro",
                            "bg-success",
                            "bg-danger")

                    }

                }).catch(err => {
                    console.log(err)
                    Toastainit("Error de registro",
                        "El Email ya " + email.value.trim() + " se encuentra registrado intente con otro",
                        "bg-success",
                        "bg-danger")
                })

            }
            console.log(ou)
        }).catch(err => {
            console.log(err)
        })


    }


})