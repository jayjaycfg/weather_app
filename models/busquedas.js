const fs = require('fs');
const axios = require('axios');
class Busquedas{
    historial = [];
    dbpath = `./db/database.json`;
    constructor() {
        this.leerDB();
    }

    get paramsMapbox (){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        };
    }


    async cuidad(lugar = ''){
        try {
            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const response = await instance.get();
            return response.data.features.map(lugar=>{
                return{
                    id : lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
                }
            });
        }catch (e) {
            return []
        }
    }

    get paramsWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric'
        }
    };

    async climaLugar(lat,lon){
        try{
          const intance = axios.create({
              baseURL:`https://api.openweathermap.org/data/2.5/weather`,
              params: {...this.paramsWeather,lat,lon}
          });
          const response = await intance.get();
          const {main, weather} = response.data;
          return {
              desc: weather[0].description,
              min: main.temp_min,
              max: main.temp_max,
              temp: main.temp
          };
        }catch (e) {
            throw e
        }
    };

    agregarHistorial(lugar=''){
        //TODO prevenir duplicados
        if(!this.historial.includes(lugar)){
            this.historial = this.historial.splice(0,5);
            this.historial.unshift(lugar);
            this.grabarDB();
        }
        return true;
    };

    grabarDB(){
        const payload = { historial : this.historial};
        fs.writeFileSync(this.dbpath,JSON.stringify(payload));
    };

    leerDB(){
        if( !fs.existsSync(this.dbpath)) return;
        const info = fs.readFileSync(this.dbpath,{encoding : "utf-8"});
        const data = JSON.parse(info);
        this.historial = data.historial;
    };
}

module.exports = Busquedas;