require('dotenv').config();
const {inquirerMenu, inquirerPausa, leerInput, listadoLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async ()=>{
    let opt = 0;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.cuidad(termino);
                const id = await listadoLugares(lugares);
                if(id === 0) continue;
                const lugarSeleccionado = lugares.find(lugar=> lugar.id === id);
                const{nombre, lat, lng} = lugarSeleccionado;
                busquedas.agregarHistorial(nombre);
                const clima = await busquedas.climaLugar(lat,lng);

                console.log('\nInformacion de la ciudad\n'.green);
                console.log(`Ciudad: ${nombre}`);
                console.log(`Lat: ${lat}` );
                console.log(`Lng: ${lng}`);
                console.log(`Temperatura: ${clima.temp}`);
                console.log(`Min: ${clima.min}`);
                console.log(`Max: ${clima.max}`);
                console.log(`Como esta el clima: ${clima.desc}`);
                break;
            case 2:
                busquedas.historial.map((lugar,i)=>{
                    const idx = `${i+1}.`.green;
                    const sitio = `${lugar}`.green;
                    console.log(`${idx} ${sitio}`);
                });
                break;
        }
        if(opt !== 0) await inquirerPausa();
    }while (opt !== 0)
};

main();