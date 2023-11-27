import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IonButton, IonButtons, IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { chevronBack, ellipsisVerticalCircle } from 'ionicons/icons';

import './index.css'
import mapaicon from "../../imagen/PUNTO DE PAGO_Mesa de trabajo 1.png"
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const openGoogleMapsNavigation = (e) => {
    const latitude = e[0]; // Latitud
    const longitude = e[1]; // Longitud
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    window.open(url, '_system'); // Abre la URL en el sistema del dispositivo
};
function LocationMarker() {
    const [position, setPosition] = useState(null)
    const customIcon = new L.Icon({
        iconUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c64cfe3-bb3b-4ae8-b5a6-d2f39d21ff87/d3jme6i-8c702ad4-4b7a-4763-9901-99f8b4f038b0.png/v1/fill/w_600,h_400/fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvOWM2NGNmZTMtYmIzYi00YWU4LWI1YTYtZDJmMzlkMjFmZjg3XC9kM2ptZTZpLThjNzAyYWQ0LTRiN2EtNDc2My05OTAxLTk5ZjhiNGYwMzhiMC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ymv-MHRcmXXpzmL3f0xZ0mCcyU85lCLnk0jbOnCO8Zg',
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto de anclaje del ícono
        popupAnchor: [0, -32], // Punto de anclaje del popup
    });
    const map = useMapEvent({
        click() {
            map.locate()
        },
        locationfound(e) {
            console.log(e.latlng)

            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position} icon={customIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
function LocationMarkers({ position }) {
    const [currentPosition, setCurrentPosition] = useState(position);

    const map = useMap();
    console.log(currentPosition)
    map.flyTo(currentPosition, map.getZoom()); // Centra el mapa en la posición proporcionada
    const customIcon = new L.Icon({
        iconUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9c64cfe3-bb3b-4ae8-b5a6-d2f39d21ff87/d3jme6i-8c702ad4-4b7a-4763-9901-99f8b4f038b0.png/v1/fill/w_600,h_400/fondo_transparente_png_by_imsnowbieber_d3jme6i-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvOWM2NGNmZTMtYmIzYi00YWU4LWI1YTYtZDJmMzlkMjFmZjg3XC9kM2ptZTZpLThjNzAyYWQ0LTRiN2EtNDc2My05OTAxLTk5ZjhiNGYwMzhiMC5wbmciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ymv-MHRcmXXpzmL3f0xZ0mCcyU85lCLnk0jbOnCO8Zg',
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto de anclaje del ícono
        popupAnchor: [0, -32], // Punto de anclaje del popup
    });
    useEffect(() => {
        setCurrentPosition(position)
    }, [position])
    return (
        <Marker position={currentPosition} icon={customIcon}>
            <Popup>
                tienda

            </Popup>
        </Marker>
    );
}
export function MapsVies() {
    const [anchorEl, setAnchorEl] = useState(null);
    let posicion = useSelector(state => state.usuario.positio)
    let history = useHistory()

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const markers = [
        /*{
            position: [-2.129304, -79.936441],
            info: 'Tenda tres nuevos datos',
        },*/
        {
            position: [-2.0798475, -80.0007646],
            info: 'Tienda Amarillas',
        },
        // Agrega más objetos de marcadores aquí
    ];
    const customIcon = new L.Icon({
        iconUrl: mapaicon,
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto de anclaje del ícono
        popupAnchor: [0, -32], // Punto de anclaje del popup
    });
    const [userLocation, setUserLocation] = useState(
        [-2.109304,
        -79.936441,]);
    const [locate, setLocate] = useState([
    ])
    const [zomm, setzomm] = useState(15)
    function Agregardat(e) {
        console.log([...e])
        setLocate(
            [...e]);
        setShowPopover({ showPopover: false, event: undefined });
    }
    function regregsar() {
        setShowPopover({ showPopover: false, event: undefined });
        history.goBack()
    }
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // const { latitude, longitude } = position.coords;
                    console.log(position)
                    setUserLocation([-2.129304, -79.936441,]);
                },
                (error) => {
                    console.error('Error getting user location:', error.message);
                }
            );
        } else {
            console.warn('Geolocation is not supported by this browser.');
        }


    }, []);
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

    const openPopover = (event) => {
        setShowPopover({ showPopover: true, event });
    };

    const closePopover = () => {
        setShowPopover({ showPopover: false, event: undefined });
    };
    return (
        <IonPage>
            <IonToolbar className='bg-blue-gradient'>
                <IonButtons slot='start'>
                    <IonButton onClick={() => history.goBack()}>
                        <IonIcon icon={chevronBack} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <MapContainer center={posicion} zoom={zomm} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker.position} icon={customIcon}>
                        <Popup className="d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-center">
                                <p>{marker.info}</p>
                                <IonButton onClick={() => openGoogleMapsNavigation(marker.position)} >ok</IonButton>

                            </div>
                        </Popup>
                    </Marker>
                ))}


                <LocationMarker />

                {locate.length > 0 ? <LocationMarkers
                    position={locate}
                /> : ""}


                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton onClick={openPopover}>
                        <ion-icon icon={ellipsisVerticalCircle}></ion-icon>
                    </IonFabButton>
                </IonFab>
                <IonPopover
                    isOpen={popoverState.showPopover}
                    event={popoverState.event}
                    onDidDismiss={closePopover}
                >
                    <IonList lines='none'>
                        {/* <IonItem button onClick={() => Agregardat([-2.080703, -79.999962])}>
                            <IonLabel>Sergio Toral </IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => Agregardat([-2.209304, -79.566441,])}>
                            <IonLabel>Balerio </IonLabel>
                        </IonItem>*/}
                        <IonItem button onClick={() => Agregardat([-2.080703, -79.999962])}>
                            <IonLabel>Ciudad de Díos</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => regregsar()}>
                            <IonLabel>Menú principal</IonLabel>
                        </IonItem>
                    </IonList>
                </IonPopover>
            </MapContainer>

        </IonPage>
    )
}