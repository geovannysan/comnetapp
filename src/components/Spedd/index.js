import { useEffect, useState } from "react";
import "./Spedd.css"

export default function SpeddView(){
    
        const [downlink, setDownlink] = useState(null);

        useEffect(() => {
            const updateNetworkSpeed = () => {
                if (navigator.connection && navigator.connection.downlink) {
                    console.log(navigator.connection)
                    setDownlink(navigator.connection.downlink);
                }
            };

            updateNetworkSpeed();

            window.addEventListener('online', updateNetworkSpeed);
            window.addEventListener('offline', () => setDownlink(null));

            return () => {
                window.removeEventListener('online', updateNetworkSpeed);
                window.removeEventListener('offline', () => setDownlink(null));
            };
        }, []);
    return(
        <div>
            <div style={{textAlign:"right;"}}><div style={{minHeight:"360px"}}><div className="tes">
                <iframe className="speed" src="//openspeedtest.com/speedtest"></iframe></div></div></div>
        </div>
    )
}