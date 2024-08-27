import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import { Listar_tickets } from 'util/Queryportal';
import { useDispatch, useSelector } from 'react-redux';
import { setSoporte, setTickets } from 'store/reducers/menu';
import audios from './BS_BUUXbKq5.mp3';
import { Departamento } from 'util/User';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    let ticketss = useSelector((state) => state.menu.tickets)

    let usedispatch = useDispatch()


    async function Tickets() {
        let tickets = JSON.parse(localStorage.getItem("ticktes"))
        let { data } = await Listar_tickets();
        //console.log(tickets);
        let nuevos = [];
        if (data.success && data.data.tickets.length > 0) {
            let numeros = tickets != null ? [...tickets] : [];
            // console.log([...tickets], [...tickets].length);

            if ([...numeros].length == 0 && tickets == undefined) {
                console.log("use", data.data.tickets);
                usedispatch(setSoporte({ soporte: [...data.data.lista] }))
                usedispatch(setTickets({ tickets: [...data.data.tickets] }));
                localStorage.setItem("ticktes", JSON.stringify([...data.data.tickets]))

                setTimeout(function () {
                    console.log('Ejecutando función cada 5 segundos');
                    //https://api.ticketsecuador.ec/store/img/bs_buuxbkq5.mp3
                    const audio = new Audio("https://api.ticketsecuador.ec/store/img/bs_buuxbkq5.mp3");
                    audio.play();
                    setTimeout(function () {
                        audio.pause();
                    }, 1500)
                }, 5500)

                //playAudiosSequentially(data.data.tickets);
            } else {
                let tickelist = JSON.parse(localStorage.getItem("ticktes"))
               // if (tickelist != undefined)
                //     console.log(tickelist, data.data.tickets);
                    //  [...tickelist].forEach(e => {
                    let valida = ([...data.data.tickets][0].id > [...tickelist][0].id);
               //   console.log(valida);
                if (valida) {
                    console.log("Se ecnontro ")
                    nuevos.push({ ...[...data.data.tickets][0] });
                }
                // });
                usedispatch(setSoporte({ soporte: [...data.data.lista] }))
                usedispatch(setTickets({ tickets: [...data.data.tickets] }));
                localStorage.setItem("ticktes", JSON.stringify([...data.data.tickets]))
                //console.log("Total", nuevos.length)
                if (nuevos.length != 0) {
                    console.log("mayor a cero", nuevos)
                    setTimeout(function () {
                        let dp = nuevos[0]
                        let departamento =  "de " + dp.departamentos
                        const text = "Ticket nuevo " + departamento;
                        const message = new SpeechSynthesisUtterance(text);
                        speechSynthesis.speak(message);
                        setTimeout(function () {
                            speechSynthesis.cancel();
                        }, 3000)
                    }, 5500)
                }
            }
        }
        // console.log(data);
    }
    useEffect(() => {
        /*  const audio = new Audio('https://api.ticketsecuador.ec/store/img/bs_buuxbkq5.mp3');
          audio.play();*/
        // const audio = new Audio("https://manzdev.github.io/codevember2017/assets/eye-tiger.mp3");
        // audio.play();
        // setTimeout(function () {
        //      audio.pause(); 
        // }, 1500)
        const intervalo = setInterval(() => {
            Tickets()
        }, 10000);
        //Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalo);
    }, []);
    return useRoutes([MainRoutes, LoginRoutes]);
}
