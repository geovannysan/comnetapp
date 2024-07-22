import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import { Listar_tickets } from 'util/Queryportal';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets } from 'store/reducers/menu';
import audios from './BS_BUUXbKq5.mp3';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    let ticketss = useSelector((state) => state.menu.tickets)
    let tickets = JSON.parse(localStorage.getItem("ticktes"))
    let usedispatch = useDispatch()


    async function Tickets() {
        let { data } = await Listar_tickets();
        console.log(tickets);
        let nuevos = [];
        if (data.success) {
            let numeros = [...tickets];
            console.log([...tickets], [...tickets].length);
            if ([...numeros].length == 0 && tickets == undefined) {
                console.log("use", data.data.tickets);
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
                }, 2500)

                //playAudiosSequentially(data.data.tickets);
            } else {
                let tickelist = JSON.parse(localStorage.getItem("ticktes"))
                if (tickelist != undefined)
                    [...data.data.tickets].forEach(e => {
                        let valida = [...tickelist].find(f => e.id == f.id);
                        //console.log(valida);
                        if (valida == undefined) {
                            console.log("Se ecnontro ")
                            nuevos.push({ ...valida });
                        }
                    });
                usedispatch(setTickets({ tickets: [...data.data.tickets] }));
                localStorage.setItem("ticktes", JSON.stringify([...data.data.tickets]))
                console.log("Total", nuevos.length)
                if (nuevos.length != 0) {
                    console.log("mayor a cero")
                    setTimeout(function () {
                        console.log('Ejecutando función cada 5 segundos');
                        //https://api.ticketsecuador.ec/store/img/bs_buuxbkq5.mp3
                        const audio = new Audio("https://api.ticketsecuador.ec/store/img/whatsapp-incoming_1635131788_(mp3cut.net).mp3");
                        audio.play();
                        setTimeout(function () {
                            audio.pause();
                        }, 1500)
                    }, 2500)
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
