

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, LayersControl, LayerGroup, Marker, useMap, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { icon } from 'leaflet';
import mapaicon from './satelite_2.png'
import mapamaker from './satelite.png'
import {
    OutlinedInput,
    FormControl, InputAdornment,
    Button
} from '@mui/material';
import route from './router2.png'
import './index.css'
import { Spin, notification, Popover, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { autenticar } from "util/Queryportal";
const CoverturaMap = () => {
    const [visible, setVisible] = useState(false);
    const [opcione, setOpcion] = useState("")
    const [infocliente, setCliente] = useState({});
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, mensaje, description) => {
        api[type]({
            message: "" + mensaje,
            description:
                "" + description,
            placement: 'bottom'
        });
    };
    const [polyline, setLineas] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [markercliente, setMarkerClinete] = useState([]);
    const [markers, setMarkers] = useState([]);

    const [locate, setLocate] = useState([])
    const [locateCli, setLocateClie] = useState([])
    const [layerControl, setLayerControl] = useState([]);
    const [mapCenter, setMapCenter] = useState([-2.128085, -79.935903]);
    const groupMarkersByCategory = (data) => {
        return data.reduce((acc, marker) => {
            if (!acc[marker.category]) {
                acc[marker.category] = [];
            }
            acc[marker.category].push(marker);
            return acc;
        }, {});
    };
    const handleLayerChangedos = (category) => {
        setMapCenter(['-2.113870', '-79.983448']);
        setMarkerClinete([])
        console.log(category)
        const newLayerControls = { ...layerControl };
        Object.keys(newLayerControls).forEach((key) => {
            newLayerControls[key] = false;
        });
        console.log(newLayerControls)
        setLayerControl({
            ...newLayerControls,
            [category]: true,
        });


        if (markers[category] && markers[category].length > 0) {
            const firstMarker = markers[category][0];
            const categoryMarkers = markers[category];
            setLocate([firstMarker.coordenadas[0], firstMarker.coordenadas[1]]);

        } else {
            setLocate([])
            setLocateClie([])
        }
    };
    const handleLayerChangeClie = (category) => {
        //setMapCenter(['-2.113870', '-79.983448']);
        let datos = markers[Object.keys(layerControl).filter(key => layerControl[key])]
        console.log(category)
        console.log(datos.filter(f => f.nombre == category))
        setLocateClie(datos.filter(f => f.nombre == category)[0].coordenadas)
        setMarkerClinete([])
        /* const newLayerControls = { ...layerControl };
        / Object.keys(newLayerControls).forEach((key) => {
             newLayerControls[key] = false;
         });
         console.log(newLayerControls)
         setLayerControl({
             ...newLayerControls,
             [category]: true,
         });
 
 
         if (markers[category] && markers[category].length > 0) {
             const firstMarker = markers[category][0];
             const categoryMarkers = markers[category];
             const centerCoordinates = calculateCenterCoordinates(categoryMarkers);
             setLocate([firstMarker.coordenadas[0], firstMarker.coordenadas[1]]);
 
         } else {
             setLocate([])
         }*/
    };
    let [cedula, setCedul] = useState("")
    let [cordenada, setCordenada] = useState("")
    const [position, setPosition] = useState([]);
    const markerRef = useRef(null);
    const handleDrag = () => {
        setLocateClie([]);
        const marker = markerRef.current;
        if (marker != null) {
            console.log(marker._latlng)
            setPosition([marker._latlng.lat, marker._latlng.lng]);
            setLocateClie([marker._latlng.lat, marker._latlng.lng])
            let cordenadasList = [].concat(...Object.values(markers))
            const resultado = coordenadaMasCercana(cordenadasList, [marker._latlng.lat, marker._latlng.lng]);
            console.log(resultado)
            let grupo = resultado.coordenada
            let category = grupo.category
            const newLayerControls = { ...layerControl };
            Object.keys(newLayerControls).forEach((key) => {
                newLayerControls[key] = false;
            });
            console.log(newLayerControls)
            setLayerControl({
                ...newLayerControls,
                [category]: true,
            });
            setLineas([{
                cordenada1: grupo.coordenadas,
                cordenada2: [marker._latlng.lat, marker._latlng.lng]
            }])
            setOpcion("mapa")
        }
    };
    const handleKeyPressCordenada = () => {
        if (cordenada != "") {
            if (validarCoordenadas(cordenada)) {
                let cordenadasList = [].concat(...Object.values(markers))
                const resultado = coordenadaMasCercana(cordenadasList, [cordenada.split(",")[0], cordenada.split(",")[1]]);
                let grupo = resultado.coordenada
                let category = grupo.category
                const newLayerControls = { ...layerControl };
                Object.keys(newLayerControls).forEach((key) => {
                    newLayerControls[key] = false;
                });
                console.log(newLayerControls)
                setLayerControl({
                    ...newLayerControls,
                    [category]: true,
                });
                setLocateClie([cordenada.split(",")[0], cordenada.split(",")[1]]);
                setPosition([cordenada.split(",")[0], cordenada.split(",")[1]])
                
                setLineas([{
                    cordenada1: grupo.coordenadas,
                    cordenada2: [cordenada.split(",")[0], cordenada.split(",")[1]]
                }])
                setOpcion("mapa")
                
            }
        }
    }
    const handleKeyPress = (event) => {
        console.log(event.key)
        if (event.key === 'Enter' ) {
            if (cedula == "") return
            console.log(cedula)
            setLocateClie([]);
            setMarkerClinete([])
            setPosition([])
            autenticar(cedula).then(res => {
                if (res.estado == "exito") {
                    let cordenadasList = [].concat(...Object.values(markers))
                    setCliente(res.datos[0])
                    setOpcion("cliente")
                    openNotificationWithIcon('success', "Alerta", "Cliente  encontrado")
                    if (res.datos[0].servicios[0].idnap != 0) {
                        let filtro = cordenadasList.filter(e => e.id == res.datos[0].servicios[0].idnap)[0]
                        let gruposelecionado = filtro
                        console.log(gruposelecionado)
                        const newLayerControls = { ...layerControl };
                        Object.keys(newLayerControls).forEach((key) => {
                            newLayerControls[key] = false;
                        });
                        console.log(newLayerControls)
                        setLocateClie(gruposelecionado.coordenadas);
                        setLayerControl({
                            ...newLayerControls,
                            [gruposelecionado.category]: true,
                        });
                        return
                    } else if (res.datos[0].servicios[0].coordenadas != "") {
                        const coordenadaEspecifica = [String(res.datos[0].servicios[0].coordenadas).split(",")[0], String(res.datos[0].servicios[0].coordenadas).split(",")[1]]; // Coordenada de ejemplo
                        const resultado = coordenadaMasCercana(cordenadasList, coordenadaEspecifica);
                        let grupo = resultado.coordenada
                        let infocerca = {
                            Caja: "Cercana",
                            ...grupo
                        }
                        setCliente({ ...res.datos[0], Ubicacion: { ...infocerca } })
                        console.log({ ...res.datos[0], Ubicacion: { ...infocerca } })
                        let category = grupo.category
                        const newLayerControls = { ...layerControl };
                        Object.keys(newLayerControls).forEach((key) => {
                            newLayerControls[key] = false;
                        });
                        console.log(newLayerControls)
                        setLayerControl({
                            ...newLayerControls,
                            [category]: true,
                        });
                        let markerClientes = {
                            nombre: res.datos[0].nombre,
                            estado: res.datos[0].estado,
                            cordenadas: coordenadaEspecifica,
                        }
                        setMarkerClinete([markerClientes])
                        if (markers[category] && markers[category].length > 0) {
                            const firstMarker = markers[category][0];
                            const categoryMarkers = markers[category];
                            setLocateClie(coordenadaEspecifica);
                        } else {
                            setLocate([])
                            setLocateClie([])
                        }
                    }//console.log("El objeto más cercano a", coordenadaEspecifica, "es");
                    //console.log("La distancia es:", resultado.distancia);
                } else {
                    openNotificationWithIcon('error', "Alerta", "Cliente no encontrado")
                }
            }).catch(error => {
                console.log(error)

            })
        }
    };
    function distancia(coord1, coord2) {
        const lat1 = parseFloat(coord1.coordenadas[0]);
        const lon1 = parseFloat(coord1.coordenadas[1]);
        const lat2 = parseFloat(coord2[0]);
        const lon2 = parseFloat(coord2[1]);
       
        return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
    }
    function distanciaEnKilometros(coord1, coord2) {
        const earthRadiusKm = 6371; // Radio de la Tierra en kilómetros
        const lat1Rad = toRadians(coord1[0]);
        const lat2Rad = toRadians(coord2[0]);
        const deltaLatRad = toRadians(coord2[0] - coord1[0]);
        const deltaLonRad = toRadians(coord2[1] - coord1[1]);

        const a = Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusKm * c;
    }
    function coordenadaMasCercana(listaCoords, coord) {
        let minDist = Infinity;
        let closestCoord = null;
        let distKm = Infinity

        for (let c of listaCoords) {
            const dist = distancia(c, coord);
            //console.log((c[0], c[1], coord[0], coord[1]))
            distKm = calcularDistancia(c.coordenadas[0], c.coordenadas[1], coord[0], coord[1])

            if (dist < minDist) {
                minDist = dist;
                closestCoord = c;
            }
        }

        return { coordenada: closestCoord, distancia: distKm };
    }
    

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }



    const fetchData = async () => {
        try {
            let { data } = await axios.get("https://api.t-ickets.com/mikrotiv2/api/cajas_nat")
            var marcadores = data.data.map(function (item) {
                if (String(item.coordenadas).includes(",")) {
                    var nombre = item.descripcion.replace(/-[A-Z0-9]+$/, '');
                    const customIcon = new L.Icon({
                        iconUrl: mapaicon,
                        iconSize: [32, 32], // Tamaño del ícono
                        iconAnchor: [16, 32], // Punto de anclaje del ícono
                        popupAnchor: [0, -32], // Punto de anclaje del popup
                    });
                    return {
                        nombre: item.descripcion,
                        coordenadas: [item.coordenadas.split(",")[0], item.coordenadas.split(",")[1]],
                        category: nombre.replace(" ", ""),
                        id: item.id,
                        icon: customIcon,
                        puertos: item.puertos,
                        usados: item.usados,
                        info: item
                    };
                }
            }).filter(e => e != undefined);
            console.log(marcadores);
            // setMarkersdo(marcadores);
            const groupedMarkers = groupMarkersByCategory(marcadores);
            setMarkers(groupedMarkers);
            console.log(groupedMarkers);
            setLayerControl(Object.keys(groupedMarkers).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {}));

        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
    function validarCoordenadas(coordenadas) {
        var patron = /^[-+]?\d*\.\d+,\s*[-+]?\d*\.\d+$/;
        if (patron.test(coordenadas)) return true;
        return false;
    }
    async function obtener_Puertos(e, puer, usa) {
        setSelectedCategory(null)
        setLocate([]);
        setLocateClie([])
        let data = JSON.stringify({
            "idnat": e
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.t-ickets.com/mikrotiv2/api/puerto_nat',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            let { data } = await axios.request(config)

            console.log(data)
            setOpcion("info")

            if (data.success) {
                let nuevos = data.data.filter(e => e.portnap != 0 && e.coordenadas != "" && e.coordenadas != undefined)
                console.log(nuevos)
                setSelectedCategory({ ...puer, mapa: data.data.filter(e => e.portnap != 0), coor: nuevos });
                //setMarkersdo(data.data)
            } else {
                setSelectedCategory({ ...puer, mapa: [], coor: [] })
            }
        } catch (error) {
            console.log(error)
        }
    }
    function GeneraPuertos(e) {
        let datos = selectedCategory.mapa
        console.log(datos)
        const renderedItems = [];
        for (let i = 0; i < selectedCategory.puertos; i++) {
            let idex = i + 1
            let info = datos.filter((e) => e.portnap == idex)
            if (info.length > 0) {
                renderedItems.push(
                    <Popover content={(
                        <div>
                            <p className=" text-uppercase">Nombre {String(info[0].nombre).toLocaleLowerCase()} </p>
                            <p>Ip: {info[0].ip} <br></br> Cordenada: {info[0].coordenadas} </p>

                        </div>
                    )} title="">
                        <button key={i} className="btn btn-danger border-1 rounded-2  m-2" style={{
                            height: '40px',
                            width: '40px',
                            fontSize: '13px'
                        }}>

                            <span className="text-white">{i + 1}</span>

                        </button>
                    </Popover>
                );
            } else {
                renderedItems.push(

                    <button key={i}


                        disabled={true} className="btn btn-success border-1 rounded-2  m-2" data-bs-toggle="popover" title="Popover Header" data-bs-content="Some content inside the popover" style={{
                            height: '40px',
                            width: '40px',
                            fontSize: '13px'
                        }}>
                        <span>{i + 1}
                        </span>
                    </button>

                );
            }
        }
        return renderedItems;
    }
    function cerrar() {
        setOpcion("")
        setSelectedCategory(null)
    }
    useEffect(() => {
        fetchData()
    }, [])
    function calcularDistancia(lat1, lon1, lat2, lon2) {
        var radioTierraMetros = 6371000;
        var toRadians = function (valor) {
            return valor * Math.PI / 180;
        };
        var deltaLat = toRadians(lat2 - lat1);
        var deltaLon = toRadians(lon2 - lon1);
        var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distancia = radioTierraMetros * c;
       // console.log(distancia)
        if (distancia < 2000) {
            return distancia.toFixed(2) + " metros";
        } else {
            return (distancia / 1000).toFixed(2) + " kilómetros";
        }
    }



    
    return (
        <div className=" flex justify-content-center">
            {contextHolder}
            <div className="pb-3">
                <div className=" row">
                    <div className="col-md-6 ">

                        <div class="col-12">
                            <select className=" form-select d-none" id="ubicacion" onChange={(e) => handleLayerChangedos(e.target.value)}>
                                <option value=''

                                >Seleccione una opción</option>
                                {Object.keys(layerControl).map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <Select

                                size="large"
                                placeholder="Selecione Sector"
                                showSearch
                                optionFilterProp="children"
                                onChange={(e) => handleLayerChangedos(e)}
                                onSearch={(e) => handleLayerChangedos(e)}
                                style={{ width: '100%', margin: '5px' }}
                                options={
                                    Object.keys(layerControl).map((item) => {
                                        return { value: item, label: item }
                                    })}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                            />
                        </div>
                        <div class="col-12">
                            {Object.keys(layerControl).filter(key => layerControl[key]).length > 0 ?
                                <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
                                    <Select
                                        size="large"
                                        placeholder="Selecione Caja"
                                        options={
                                            markers[Object.keys(layerControl).filter(key => layerControl[key])[0]].map((item) => {
                                                return { value: item.nombre, label: item.nombre }
                                            })}
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e) => handleLayerChangeClie(e)}
                                        onSearch={(e) => handleLayerChangeClie(e)}
                                        sx={{ mr: -0.5 }}
                                        style={{ width: '100%', margin: '5px' }}
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                    /> </FormControl> : ""}
                        </div>
                    </div>
                    <div className=" col-md-6">
                        <div className="col-12 py-2">
                            <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
                                <OutlinedInput
                                    size="large"
                                    id="header-search"
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </InputAdornment>
                                    }
                                    onKeyPress={handleKeyPress}
                                    onChange={(e) => setCedul(e.target.value)}

                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}

                                    endAdornment={
                                        <Button
                                            onClick={handleKeyPress}
                                            position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </Button>
                                    }
                                    placeholder="cédula"
                                />
                            </FormControl>
                        </div>
                        <div className="col-12">
                            <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
                                <OutlinedInput
                                    size="large"
                                    id="header-search"
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </InputAdornment>
                                    }
                                    onKeyPress={handleKeyPressCordenada}
                                    onChange={(e) => setCordenada(e.target.value)}

                                    aria-describedby="header-search-text"
                                    inputProps={{
                                        'aria-label': 'weight'
                                    }}

                                    endAdornment={
                                        <Button
                                            onClick={handleKeyPressCordenada}
                                            position="start" sx={{ mr: -0.5 }}>
                                            <SearchOutlined />
                                        </Button>
                                    }
                                    placeholder="Cordenadas"
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className={"col-7"}>
                    <MapContainer center={mapCenter} zoom={18} style={{ height: '80vh', width: '100%' }}>
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Base Layer">
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            </LayersControl.BaseLayer>
                            {Object.keys(markers).map((category, index) => (
                                <LayersControl.Overlay
                                    key={index}
                                    checked={layerControl[category]}
                                    name={category}

                                >
                                    <LayerGroup>
                                        {layerControl[category] ?
                                            markers[category].map((marker, index) => (
                                                <Marker key={index} position={[marker.coordenadas[0], marker.coordenadas[1]]}
                                                    icon={
                                                        marker.icon
                                                    } >

                                                    <Popup>
                                                        <div className=" d-flex  flex-column">
                                                            {marker.nombre}
                                                            <br>
                                                            </br>
                                                            <span># Puertos 		: {marker.puertos}</span>
                                                            <span>Asociados : {marker.usados}</span>
                                                            <span>Map : {marker.coordenadas}</span>
                                                            <div className=" btn-group">
                                                                <button className=" btn btn-sm btn-light " onClick={() => obtener_Puertos(marker.id, marker.info)} ><i className=" fa fa-eye"></i> </button>
                                                            </div>
                                                        </div>
                                                    </Popup>
                                                </Marker>
                                            )) : null
                                        }
                                    </LayerGroup>
                                </LayersControl.Overlay>
                            ))}
                        </LayersControl>
                        {locate.length > 0 ? <LocationMarkers
                            position={locate}
                        /> : ""}
                        {locateCli.length > 0 ? <LocationMarkersCaja
                            position={locateCli}
                        /> : ""}
                        {
                            (markercliente) ?
                                markercliente.map((elm, id) => {
                                    const customIcon = new L.Icon({
                                        iconUrl: route,
                                        iconSize: [32, 32], // Tamaño del ícono
                                        iconAnchor: [16, 32], // Punto de anclaje del ícono
                                        popupAnchor: [0, -32], // Punto de anclaje del popup
                                    });
                                    return (
                                        <Marker key={id} position={elm.cordenadas}
                                            icon={
                                                customIcon
                                            } >
                                            <Popup>
                                                <div className=" d-flex  flex-column">
                                                    {elm.nombre}
                                                    <br>
                                                    </br>
                                                    <span>Estado : {elm.estado}</span>

                                                </div>
                                            </Popup>
                                        </Marker>

                                    )
                                }
                                )
                                : ""
                        }
                        {
                            /**
                             * Marcador  de ubicación
                             * arrastrable 
                             */
                            position.length > 0 ?
                                <Marker
                                    draggable
                                    eventHandlers={{
                                        dragend: handleDrag,
                                    }}
                                    icon={
                                        new L.Icon({
                                            iconUrl: mapamaker,
                                            iconSize: [32, 32], // Tamaño del ícono
                                            iconAnchor: [16, 30], // Punto de anclaje del ícono
                                            popupAnchor: [0, -32], // Punto de anclaje del popup
                                        })
                                    }
                                    position={position}
                                    ref={markerRef}
                                >
                                    <Popup>Arrastra este marcador</Popup>
                                </Marker>
                                : ""
                        }
                        
                     {polyline.length>0?
                     polyline.map(item=>{
                         console.log(Object.values(item))
                        return(
                         <Polyline pathOptions={{ color: 'blue' }} positions={Object.values(item)} />)
                     })
                        :""}
                           



                        
                    </MapContainer>
                </div>
                {opcione == "info" && selectedCategory != null ? <div className="col-5">
                    <div className=" card h-100">
                        <div className=" text-end">
                            <button className="btn close" onClick={cerrar}> X</button>
                        </div>
                        <div className="m-2">
                            <div className="card-body">
                                <h5 className="card-title">CAJA: {selectedCategory.descripcion}</h5>
                                <p>ID Caja :{selectedCategory.id}</p>
                                <p className="card-text">Sector: {selectedCategory.ubicacion}</p>

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"># Puertos {selectedCategory.puertos}</li>
                                <li className="list-group-item">#  Asociados {selectedCategory.usados}</li>
                                <li className="list-group-item">#  Usados {parseInt(selectedCategory.mapa.length)}</li>
                                <li className="list-group-item">Ubicacion {selectedCategory.coordenadas} </li>
                            </ul>

                        </div>

                        <div className=" d-flex justify-content-center">
                            <div className="d-flex  flex-wrap ">



                                <GeneraPuertos
                                    nume={8}
                                />
                            </div>

                        </div>

                        <div className=" d-flex justify-content-center d-none">
                            {selectedCategory.mapa.length > 0 ? <button className="btn btn-primary">Ver Ubicacion </button> : ""}
                        </div>

                    </div>

                </div> : ""}
                {opcione == "cliente" ?
                 <div className="col-5">
                    <div className=" card h-100">
                        <div className=" text-end">
                            <button className="btn close" onClick={cerrar}> X</button>
                        </div>
                        <div className="m-2">
                            <div className="card-body row">
                                <h5 className="card-title">Cliente: {infocliente.nombre || ''} </h5>
                                <div>
                                    {infocliente.estado == "ACTIVO" ? <span className=" badge badge-success ">{infocliente.estado}</span> : <span className=" badge badge-danger ">{infocliente.estado}</span>}
                                </div>
                                <div className="col-4">

                                    <p>ID caja : {infocliente.servicios[0].idnap || 'No asociado'}</p>
                                    <p>Puerto: {infocliente.servicios[0].portnap || 'No asociado'} </p>
                                    <p className="card-text d-none">Inteface_GPON: {infocliente.Inteface_GPON || 'No identitificada'}</p>
                                </div>
                                {infocliente.Ubicacion ? <div className="col-8">
                                    {infocliente.Ubicacion.Caja == "Cercana" ?
                                        <p className="card-title">Mas cercana: {infocliente.Ubicacion.nombre + " Id:" + infocliente.Ubicacion.id || ''} </p> :
                                        <p className="card-title">Caja: {infocliente.Ubicacion.nombre || ''} </p>


                                    }
                                    <p className="card-title"># Puertos: {infocliente.Ubicacion.puertos || ''} </p>
                                    <p className="card-title">Usados: {infocliente.Ubicacion.usados || ''} </p>
                                </div> : ""}

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Modelo: {infocliente.MODELO_DE_EQUIPO || "No identificado"}</li>
                                <li className="list-group-item">Ip:  {infocliente.servicios[0].ip || 'No Asignada'}</li>
                                <li className=" list-group-item">Dirección: {infocliente.servicios[0].direccion || 'No Asignada'}</li>
                                <li className="list-group-item">Ubicacion: {infocliente.servicios[0].coordenadas || 'No Asignada'} </li>
                            </ul>

                        </div>

                        <div className=" d-flex justify-content-center">
                            <div className="d-flex  flex-wrap ">

                            </div>

                        </div>

                        <div className=" d-flex justify-content-center d-none">
                            {<button className="btn btn-primary">Ver Ubicacion </button>}
                        </div>

                    </div>

                </div> : ""}
                {opcione == "mapa"  ? <div className="col-5">
                    <div className=" card h-100">
                        <div className=" text-end">
                            <button className="btn close" onClick={cerrar}> X</button>
                        </div>
                        <div className="m-2">
                            <div className="card-body">
                                <h5 className="card-title">Distancias : </h5>
                               
                               

                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                   <div></div> # Caja
                                    
                                     </li>
                                <li className="list-group-item">#  Asociados </li>
                                <li className="list-group-item">#  Usados</li>
                                <li className="list-group-item">Ubicacion</li>
                            </ul>

                        </div>

                       


                    </div>

                </div> : ""}
                
            </div>
        </div>
    );
}
function LocationMarkers({ position }) {
    const [currentPosition, setCurrentPosition] = useState(position);

    const map = useMap();

    map.flyTo(currentPosition, 15); // Centra el mapa en la posición proporcionada

    useEffect(() => {
        setCurrentPosition(position)
    }, [position])

}
function LocationMarkersCaja({ position }) {
    const [currentPosition, setCurrentPosition] = useState(position);
    const map = useMap();
    map.flyTo(currentPosition, 18);
    useEffect(() => {
        setCurrentPosition(position)
    }, [position]);
}


export default CoverturaMap;