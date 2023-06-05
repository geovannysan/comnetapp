export function obtenervaariables(dato) {
    const variables = {}
    let data = JSON.stringify(dato)
    const procesar = JSON.parse(data).split("{")[1]
    procesar.replace("{", "").replace("}", "").split(";").forEach((element, i) => {
        if (!(i % 2 == 0)) {
            let index = procesar.replace("{", "").replace("}", "").split(";")[i - 1].replace("s:", "").split(":")[1]
            variables[index.replace(/['"]+/g, '')] = element.replace("s:", "").split(":")[1].replace(/['"]+/g, '')
        }
    });
    //console.log(variables)
    return variables
}
