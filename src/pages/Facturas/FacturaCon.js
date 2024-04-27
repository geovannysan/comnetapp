import MainCard from "components/MainCard"
import {
    Form,
    Select,
    Input,
    Space,
    Button
} from "antd"
import { Tabs } from 'antd';
import { Cargar_factura } from "util/Querireport"
import { useState } from "react"
import Lsita_de_Factura from "./Tablasfacturas";
import "./index.css"
import { userlog } from "util/User";
const FacturasCon = () => {
    let [transacion, setTransacion] = useState({
        "pagadas": [],
        "nopagadas": [],
        "registradas": [],
        "noseencvio": [],
        "arreglos": 0
    })
    let [forma, setForma] = useState("")
    let [spiner, setSpiner] = useState(false)
    const CambiarMes = async () => {
        let meses = document.getElementById("date").value
        console.log(meses)
        if (meses == "" && forma == "") {
            return
        }
        try {
            setSpiner(true)
            let data = await Cargar_factura(
                {
                    "forma": "" + forma,
                    "inicio": "" + meses,
                    "fin": "" + meses
                }
            )
            setTransacion(data)
            console.log(data, {
                "forma": "" + forma,
                "inicio": "" + meses,
                "fin": "" + meses
            });
            setSpiner(false)
        }
        catch (error) {
            setSpiner(error)
            alert("Hubo un error inesperado")
            console.log(error)
        }
    }
    const GenerarFactura = async () => {
        let numfactura = document.getElementById("comprobante").value
        let factura = document.getElementById("prefactura").value
        try {
            let user = userlog()
            let dato = {
                "comprobante": "" + numfactura,
                "factura": "" + factura,
                "oper": user.Id
            }
            console.log(dato)

        } catch (error) {
            console.log(error);
        }
    }
    let [tab, setTabs] = useState(1)
    const onChange = (key) => {
        setTabs(key);
    };

    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            {spiner ? <div className="  d-flex flex-column" id="superpuesto">
                <div className="loader">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="3363.000000pt" height="1192.000000pt"
                        viewBox="0 0 3363.000000 1192.000000" preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,1192.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                            <path d="M6443 8936 c-1068 -304 -1976 -565 -2017 -580 -211 -77 -406 -258
      -518 -481 -101 -200 -134 -458 -83 -650 60 -231 232 -395 460 -439 52 -11 242
      -23 545 -36 256 -11 771 -34 1145 -50 374 -16 707 -30 740 -31 46 0 55 -3 40
      -10 -17 -8 -519 -151 -1908 -546 -108 -31 -200 -54 -202 -51 -3 3 6 112 20
      243 14 132 25 248 25 259 0 10 -109 -143 -243 -340 -554 -818 -948 -1406 -945
      -1409 4 -4 3661 1035 3996 1136 235 71 318 116 456 248 97 94 152 170 211 292
      70 146 97 265 98 429 0 216 -47 350 -167 477 -78 83 -162 134 -264 162 -84 23
      -77 22 -1754 93 -427 18 -776 33 -774 35 7 7 1925 553 1944 553 10 0 12 -12 8
      -42 -7 -50 -32 -300 -41 -408 l-7 -75 154 228 c84 125 351 520 593 879 242
      358 442 655 443 660 2 4 0 8 -5 7 -4 0 -882 -249 -1950 -553z m1207 208 c0
      -28 -20 -54 -42 -54 -8 0 -20 -9 -28 -20 -8 -11 -22 -20 -32 -20 -10 0 -18 -4
      -18 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10 -20 -10 -11 0
      -20 -4 -20 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10 -20 -10
      -11 0 -20 -4 -20 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10
      -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5
      -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -13 -10 -30 -10 -16 0 -30 -4 -30
      -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -16 -10 -35 -10 -50 0
      -105 55 -105 105 0 19 5 35 10 35 6 0 10 7 10 16 0 23 25 44 54 44 14 0 26 5
      26 10 0 6 18 10 40 10 22 0 40 5 40 10 0 6 18 10 40 10 22 0 40 5 40 10 0 6
      18 10 40 10 22 0 40 5 40 10 0 6 18 10 40 10 22 0 40 5 40 10 0 6 18 10 40 10
      22 0 40 5 40 10 0 6 18 10 40 10 22 0 40 5 40 10 0 6 23 10 50 10 47 0 50 -2
      50 -26z m-3195 -969 c33 -33 48 -85 25 -85 -5 0 -10 -7 -10 -16 0 -20 -24 -44
      -44 -44 -9 0 -16 -4 -16 -10 0 -5 -8 -10 -18 -10 -10 0 -24 -9 -32 -20 -8 -11
      -20 -20 -27 -20 -17 0 -103 -86 -103 -103 0 -7 -9 -19 -20 -27 -11 -8 -20 -21
      -20 -30 0 -9 -9 -22 -20 -30 -11 -8 -20 -21 -20 -30 0 -9 -9 -22 -20 -30 -11
      -8 -20 -22 -20 -32 0 -10 -4 -18 -10 -18 -5 0 -10 -7 -10 -15 0 -18 -44 -65
      -60 -65 -27 0 -40 30 -40 94 0 37 4 66 10 66 6 0 10 23 10 50 0 28 5 50 10 50
      6 0 10 9 10 20 0 11 5 20 10 20 6 0 10 14 10 30 0 17 5 30 10 30 6 0 10 9 10
      20 0 11 5 20 10 20 6 0 10 7 10 15 0 20 145 165 165 165 8 0 15 5 15 10 0 6
      14 10 30 10 17 0 30 5 30 10 0 6 20 10 45 10 39 0 51 -5 80 -35z m3440 -1020
      c30 -30 55 -61 55 -70 0 -8 5 -15 10 -15 6 0 10 -9 10 -20 0 -11 5 -20 10 -20
      6 0 10 -18 10 -40 0 -22 5 -40 10 -40 6 0 10 -40 10 -100 0 -60 -4 -100 -10
      -100 -5 0 -10 -18 -10 -40 0 -22 -4 -40 -10 -40 -5 0 -10 -9 -10 -20 0 -11 -4
      -20 -10 -20 -5 0 -10 -13 -10 -30 0 -16 -4 -30 -10 -30 -5 0 -10 -8 -10 -18 0
      -10 -9 -24 -20 -32 -11 -8 -20 -21 -20 -28 0 -8 -13 -27 -30 -42 -16 -15 -30
      -35 -30 -44 0 -9 -8 -16 -20 -16 -11 0 -20 -4 -20 -10 0 -15 -49 -12 -66 4
      -16 17 -19 46 -4 46 6 0 10 9 10 20 0 11 5 20 10 20 6 0 10 14 10 30 0 17 5
      30 10 30 6 0 10 9 10 20 0 11 5 20 10 20 6 0 10 18 10 40 0 22 5 40 10 40 6 0
      10 27 10 60 0 33 4 60 10 60 6 0 10 23 10 50 0 28 -4 50 -10 50 -5 0 -10 18
      -10 40 0 22 -4 40 -10 40 -5 0 -10 8 -10 18 0 10 -9 24 -20 32 -11 8 -20 21
      -20 30 0 9 -9 22 -20 30 -15 11 -20 26 -20 58 0 59 30 91 88 91 38 1 48 -4 97
      -54z m-3650 -1570 c20 -19 25 -34 25 -76 0 -44 -4 -55 -30 -79 -16 -15 -30
      -33 -30 -40 0 -6 -22 -33 -50 -60 -27 -27 -50 -56 -50 -64 0 -9 -7 -16 -16
      -16 -18 0 -44 -23 -44 -40 0 -15 -107 -120 -123 -120 -7 0 -19 -9 -27 -20 -8
      -11 -22 -20 -32 -20 -10 0 -18 -4 -18 -10 0 -5 -13 -10 -30 -10 -28 0 -30 2
      -30 40 0 22 5 40 10 40 6 0 10 8 10 18 0 10 9 24 20 32 11 8 20 22 20 32 0 10
      5 18 10 18 6 0 10 8 10 18 0 10 9 24 20 32 11 8 20 21 20 30 0 9 9 22 20 30
      11 8 20 21 20 30 0 9 9 22 20 30 11 8 20 21 20 30 0 9 9 22 20 30 11 8 20 21
      20 30 0 9 9 22 20 30 11 8 20 20 20 27 0 8 15 29 33 48 42 44 104 49 142 10z" />
                            <path d="M1625 9393 c3 -10 426 -801 939 -1758 513 -957 939 -1750 945 -1763
      12 -22 22 -9 180 225 l167 248 -50 32 c-142 88 -272 209 -353 328 -352 520
      -254 1294 229 1800 155 162 309 270 509 356 56 25 427 135 972 290 485 137
      887 252 892 254 6 2 -991 4 -2214 4 -2113 1 -2223 0 -2216 -16z" />
                            <path d="M8825 9114 c-110 -162 -316 -466 -457 -675 -142 -209 -258 -381 -258
      -384 0 -2 42 -26 92 -52 321 -165 536 -465 604 -841 19 -105 21 -335 4 -447
      -10 -71 -47 -235 -65 -290 -4 -11 7 3 23 30 38 64 1582 2943 1582 2950 0 3
      -298 5 -662 5 l-663 0 -200 -296z" />
                            <path d="M12667 7499 c-310 -36 -591 -267 -692 -570 -87 -261 -24 -505 166
      -639 67 -47 113 -63 1067 -382 l997 -333 -929 -3 c-511 -1 -931 0 -934 2 -2 3
      32 96 76 208 44 112 78 204 77 206 -2 2 -315 -259 -695 -580 l-693 -583 1844
      -3 c1655 -2 1851 -1 1916 13 334 74 607 368 653 704 31 229 -60 419 -255 532
      -42 24 -354 132 -1030 354 l-970 320 427 3 c236 1 621 1 857 0 l429 -3 -83
      -208 c-46 -114 -78 -204 -72 -200 16 9 1335 1119 1367 1149 l25 24 -1740 -1
      c-957 -1 -1771 -5 -1808 -10z" />
                            <path d="M16486 7493 c-10 -35 -796 -3305 -796 -3314 0 -43 326 71 645 225
      339 164 676 362 695 409 5 12 111 450 236 972 124 523 228 953 231 958 2 4
      327 7 722 7 l718 0 21 -23 c12 -13 22 -32 22 -43 0 -10 -18 -95 -40 -189 -37
      -159 -42 -172 -75 -202 l-35 -33 -588 0 -587 0 -79 -322 c-44 -178 -85 -347
      -92 -376 l-12 -52 1146 2 1147 3 47 27 c55 33 109 93 125 140 6 18 91 366 188
      773 154 644 176 748 172 800 -5 74 -32 129 -87 179 -86 78 94 71 -1917 74
      -1714 2 -1802 1 -1807 -15z" />
                            <path d="M20736 7493 c-2 -10 -140 -583 -306 -1273 -166 -690 -310 -1288 -320
      -1328 l-18 -72 1806 2 1806 3 88 355 c48 195 87 365 87 378 l1 22 -1200 0
      c-660 0 -1200 3 -1200 8 1 4 11 50 23 102 l23 95 911 3 c857 2 912 3 917 20 8
      28 176 720 176 726 0 3 -409 6 -910 6 l-909 0 5 28 c3 15 13 61 23 102 l17 75
      1205 3 1205 2 88 363 c48 199 90 370 92 380 5 16 -85 17 -1800 17 -1710 0
      -1805 -1 -1810 -17z" />
                            <path d="M24446 6188 c-175 -728 -320 -1333 -323 -1345 l-5 -23 1805 0 1805 0
      16 68 c8 37 49 206 91 375 41 170 75 310 75 313 0 2 -542 5 -1204 6 l-1203 3
      18 80 c11 44 21 90 24 102 l5 23 912 2 912 3 92 373 91 372 -912 0 -912 0 18
      83 c11 45 21 92 24 105 l5 22 1205 0 c1138 0 1204 1 1209 18 11 38 176 725
      176 733 0 5 -736 9 -1803 9 l-1803 0 -318 -1322z" />
                            <path d="M28717 7408 c-14 -57 -161 -656 -327 -1333 -165 -676 -303 -1236
      -305 -1243 -4 -10 342 -12 1753 -10 l1757 3 71 38 c138 74 277 203 371 343 30
      46 51 123 248 939 118 489 215 907 215 929 -1 146 -123 352 -245 411 -39 20
      -78 20 -1776 23 l-1736 2 -26 -102z m2306 -674 c66 -22 132 -97 147 -167 12
      -51 9 -66 -82 -444 -107 -441 -116 -464 -201 -513 l-52 -30 -687 0 c-379 0
      -688 2 -688 3 0 7 270 1142 275 1155 3 9 137 12 623 12 539 0 624 -2 665 -16z" />
                            <path d="M8452 5910 c-73 -92 -186 -195 -297 -270 -151 -102 -371 -190 -770
      -310 -942 -282 -3078 -929 -3081 -933 -5 -6 1672 -3120 1680 -3119 5 0 557
      1024 1228 2274 670 1250 1239 2310 1264 2356 24 45 43 82 42 82 -2 0 -31 -36
      -66 -80z" />
                            <path d="M21106 4081 c-20 -32 -36 -61 -36 -65 0 -3 15 -6 33 -6 27 1 38 9 75
      59 23 32 42 61 42 65 0 3 -18 6 -39 6 -37 0 -41 -3 -75 -59z" />
                            <path d="M32092 4020 c-57 -12 -138 -57 -169 -95 -71 -83 -98 -212 -69 -325
      41 -161 148 -243 317 -244 77 0 93 3 152 32 72 36 113 80 149 159 18 38 22 67
      23 144 0 90 -2 100 -35 165 -38 75 -102 132 -170 153 -54 16 -148 21 -198 11z
      m205 -88 c82 -42 133 -135 133 -243 0 -150 -93 -255 -234 -266 -90 -8 -152 15
      -210 76 -132 142 -84 382 90 447 55 20 167 13 221 -14z" />
                            <path d="M30670 3685 l0 -327 168 4 c152 3 171 5 216 27 64 32 113 82 144 150
      21 45 26 71 27 136 0 144 -58 245 -173 302 -54 27 -65 28 -219 32 l-163 3 0
      -327z m346 231 c84 -39 144 -135 144 -231 0 -60 -30 -135 -71 -180 -58 -63
      -110 -80 -239 -80 l-105 0 -3 258 -2 257 112 0 c98 0 120 -3 164 -24z" />
                            <path d="M28778 3768 c-3 -218 -4 -236 -25 -274 -69 -128 -264 -122 -324 10
      -16 36 -19 69 -19 264 l0 222 -35 0 -35 0 0 -218 c0 -243 8 -291 60 -354 99
      -119 322 -107 402 22 41 67 47 122 41 353 l-6 207 -28 0 -28 0 -3 -232z" />
                            <path d="M29500 3675 l0 -325 35 0 35 0 2 246 3 247 203 -247 c137 -165 210
      -246 223 -246 22 0 23 20 12 408 l-6 242 -31 0 -31 0 3 -246 c2 -164 0 -244
      -7 -240 -5 4 -99 114 -207 246 -127 155 -204 240 -216 240 -17 0 -18 -16 -18
      -325z" />
                            <path d="M27062 3663 l3 -328 32 -3 33 -3 2 267 3 267 110 -166 c83 -127 115
      -166 129 -165 12 2 57 62 125 168 l106 165 3 -263 2 -262 35 0 35 0 0 325 0
      325 -39 0 -39 0 -112 -175 c-61 -96 -115 -175 -119 -175 -4 0 -60 79 -124 175
      -115 171 -118 175 -152 175 l-35 0 2 -327z" />
                            <path d="M25232 3653 l3 -328 210 0 210 0 3 33 3 32 -180 0 -181 0 0 295 0
      295 -35 0 -35 0 2 -327z" />
                            <path d="M24251 3943 c-38 -82 -271 -614 -271 -618 0 -3 16 -5 35 -5 34 0 37
      2 70 75 l34 75 181 0 181 0 34 -75 c33 -73 36 -75 70 -75 19 0 35 4 35 8 0 5
      -65 150 -144 323 l-143 314 -35 3 c-29 3 -36 -1 -47 -25z m125 -235 l73 -163
      -146 -3 c-80 -1 -147 -1 -150 1 -2 2 29 79 69 170 39 92 74 165 76 162 3 -2
      38 -78 78 -167z" />
                            <path d="M21005 3947 c-97 -32 -152 -80 -194 -167 -23 -48 -26 -68 -26 -155 0
      -89 3 -106 28 -157 38 -77 113 -143 185 -164 85 -25 202 -16 270 21 89 48 139
      120 162 229 32 154 -38 309 -167 372 -66 33 -191 43 -258 21z m245 -91 c186
      -123 146 -431 -64 -491 -180 -52 -336 73 -336 269 0 87 42 172 107 215 40 27
      63 35 133 44 39 6 125 -14 160 -37z" />
                            <path d="M22075 3951 c-3 -6 -2 -154 1 -331 l7 -321 31 3 31 3 -3 248 c-2 136
      -1 247 2 247 2 0 96 -110 207 -245 131 -160 208 -245 220 -245 18 0 19 15 19
      325 l0 325 -35 0 -35 0 -2 -247 -3 -247 -203 247 c-112 136 -210 247 -217 247
      -8 0 -16 -4 -20 -9z" />
                            <path d="M18920 3928 c0 -7 48 -79 105 -160 l105 -148 -115 -162 c-66 -92
      -111 -166 -106 -171 5 -5 23 -5 42 0 29 8 47 28 117 129 46 65 89 125 96 132
      11 11 30 -11 110 -122 97 -135 98 -136 137 -136 21 0 39 2 39 5 0 3 -52 76
      -115 163 -63 86 -113 163 -110 170 3 7 50 78 105 157 55 79 100 146 100 149 0
      3 -17 6 -37 6 -37 -1 -40 -4 -127 -130 -49 -71 -92 -128 -96 -125 -3 2 -46 60
      -95 129 -83 118 -91 126 -122 126 -20 0 -33 -5 -33 -12z" />
                            <path d="M20060 3615 l0 -325 35 0 35 0 0 294 c0 161 -3 308 -6 325 -6 26 -11
      31 -35 31 l-29 0 0 -325z" />
                            <path d="M15590 3915 c-131 -37 -210 -137 -226 -286 -16 -158 73 -310 208
      -355 56 -18 166 -21 224 -5 55 15 126 64 157 109 51 72 61 110 61 217 1 89 -3
      106 -27 157 -32 65 -90 122 -154 150 -60 27 -172 32 -243 13z m191 -67 c22 -6
      57 -27 79 -46 59 -50 82 -102 88 -195 4 -72 2 -82 -28 -143 -37 -76 -85 -116
      -161 -134 -210 -51 -379 140 -314 356 40 135 189 207 336 162z" />
                            <path d="M17103 3914 c-3 -9 -3 -121 0 -250 3 -129 4 -234 2 -234 -2 0 -95
      110 -206 245 -133 161 -208 245 -220 245 -18 0 -19 -14 -19 -325 l0 -325 35 0
      35 0 2 247 3 246 204 -246 c112 -136 210 -247 217 -247 12 0 14 59 14 330 l0
      330 -30 0 c-19 0 -33 -6 -37 -16z" />
                            <path d="M17833 3733 c4 -108 7 -254 7 -325 l0 -128 230 0 230 0 0 35 0 35
      -195 0 -194 0 -6 33 c-3 17 -5 68 -3 112 l3 80 183 3 182 2 0 30 0 30 -185 0
      -186 0 3 113 3 112 193 3 192 2 0 30 0 30 -232 0 -231 0 6 -197z" />
                            <path d="M14410 3905 c-151 -42 -238 -173 -228 -344 8 -130 68 -225 176 -278
      50 -24 69 -28 147 -28 82 0 97 3 156 32 36 18 73 41 82 51 16 17 16 20 -8 42
      l-25 23 -22 -21 c-63 -58 -187 -79 -279 -47 -95 34 -159 132 -159 246 0 84 21
      144 68 193 52 54 103 76 183 76 79 0 121 -13 171 -51 l37 -29 27 23 27 24 -35
      26 c-88 68 -210 91 -318 62z" />
                            <path d="M12260 3682 c0 -265 8 -304 79 -372 51 -50 102 -70 176 -70 74 0 125
      20 176 70 70 67 79 109 79 349 0 108 -3 206 -6 219 -5 16 -14 22 -35 22 l-29
      0 0 -222 c0 -249 -7 -278 -69 -331 -28 -23 -86 -47 -116 -47 -30 0 -88 24
      -116 47 -62 53 -69 82 -69 331 l0 222 -35 0 -35 0 0 -218z" />
                            <path d="M11100 3860 l0 -30 115 0 115 0 0 -295 0 -295 35 0 35 0 0 295 0 295
      115 0 115 0 0 30 0 30 -265 0 -265 0 0 -30z" />
                        </g>
                    </svg>
                    <span></span>
                </div>
                <p>Cargando</p>
            </div> : ""}
            <MainCard contentSX={{ p: 2 }} className="mb-2">
                <div className="row">
                    <div className=" container col-12 col-sm-6 text-center">
                        <Form.Item label="" name="permiso"
                            rules={[
                                {
                                    message: 'Seleccione un perfil',
                                },
                            ]} >
                            <Select placeholder="Forma de pago" plac onChange={(e) => setForma(e)} value={forma}>
                                <Select.Option value=''>Todos</Select.Option>
                                <Select.Option value="SpeedMan BANCO PICHINCHA EMP">SpeedMan BANCO PICHINCHA EMP</Select.Option>
                                <Select.Option value="SpeedMan BANCO PACIFICO EMP">SpeedMan BANCO PACIFICO EMP</Select.Option>
                                <Select.Option value="SpeedMan BANCO GUAYAQUIL EMP">SpeedMan BANCO GUAYAQUIL EMP</Select.Option>
                                <Select.Option value="SpeedMan BANCO PRODUBANCO">SpeedMan BANCO PRODUBANCO</Select.Option>
                                <Select.Option value="CALL BANCO PICHINCHA EMP">CALL BANCO PICHINCHA EMP</Select.Option>
                                <Select.Option value="CALL BANCO PACIFICO EMP">CALL BANCO PACIFICO EMP</Select.Option>
                                <Select.Option value="CALL BANCO GUAYAQUIL EMP">CALL BANCO GUAYAQUIL EMP</Select.Option>
                                <Select.Option value="CALL BANCO PRODUBANCO">CALL BANCO PRODUBANCO</Select.Option>
                            </Select>
                        </Form.Item>
                        <h5>Día de Factura</h5>
                        <input id="date" className=" ant-input css-dev-only-do-not-override-17a39f8 text-center" type="date"></input>
                        <button className=" btn btn-sm btn-primary m-1 mt-1 " onClick={CambiarMes}>CONSULTAR</button>
                    </div>
                    <div className="container col-12 col-sm-6 text-end">
                        <Form.Item label="" name="cedula"
                            rules={[
                                {
                                    true: false,
                                    message: 'Complete la cédula',
                                },
                            ]}
                        >
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    id="comprobante"
                                    placeholder="Comprobante" />
                                <Input
                                    id="prefactura"
                                    placeholder="Número de Prefactura"
                                    onChange={e => setInputValue(e.target.value)} />

                                <Button onClick={GenerarFactura} type="primary">GENERAR</Button>
                            </Space.Compact>
                        </Form.Item>
                    </div>
                </div>
            </MainCard>
            <MainCard contentSX={{}}>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Emitida ' + transacion["registradas"].length,
                            key: '1',
                            children: '',
                        },
                        {
                            label: 'generadas ' + transacion["pagadas"].length,
                            key: '2',
                            children: '',
                        },
                        {
                            label: 'noenviadas ' + transacion["noseencvio"].length,
                            key: '3',
                            children: '',
                        },
                    ]}
                    onChange={onChange}
                />

                <div className="tab-content" id="pills-tabContent">
                    <div id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className={!(tab == 1) ? "d-none" : "tab-pane fade show active"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                            {transacion["registradas"].length > 0 ?
                                <Lsita_de_Factura
                                    nombre={"doc"}
                                    transacion={transacion["registradas"]}
                                /> : ""}
                        </div>
                        <div className={!(tab == 2) ? "d-none" : "tab-pane fade show active"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            {transacion["pagadas"].length == 0 ? "" :
                                <Lsita_de_Factura
                                    nombre={"doc2"}
                                    transacion={transacion["pagadas"]}
                                />
                            }
                        </div>

                    </div>

                </div>
            </MainCard>
        </div>
    )

}
export default FacturasCon