import xray from 'x-ray';
import fs from 'fs';


const x = xray({
    filters: {
        trim: (value) => typeof value === 'string' ? value.trim() : value
    }
});

function fetchPage(url){
    return new Promise( (resolve, reject) => {
        x(url,'body', [{
            titulo: '.page-header | trim',
            ['Tipo de Operacion']: '.module-content.vertical-align > .col-md-6 > span',
            precio: '.module-content.vertical-align > .col-md-6 > .precio_detalle | trim',
            descripcion:  '.mb30 > .text | trim',
            imagen: '.property-gallery-preview > a@href | trim',
            ['Tipo de Aviso']:  '.property-list > dl > dd',
            zona:  '.property-list > dl > dd  ~ dd',
            barrio:  '.property-list > dl > dd  ~ dd',
            ciudad:  '.property-list > dl > dd ~ dd ~ dd ',
            provincia:  '.property-list > dl > dd ~ dd ~ dd ~ dd',
            codigo:  '.property-list > dl > dd ~ dd ~ dd ~ dd ~ dd',
            ['Area terreno']:  '.property-list > dl > dd ~ dd ~ dd ~ dd ~ dd ~ dd',
        }])
        (function(err, obj){
            if(err){
                reject(err);
            }
            resolve(obj[0]);
        });

    });

}

const enlaces = require('./enlaces.json');
const propiedades = './propiedades.json';


const agregarPropiedad = (result) =>{
    
    const file = fs.readFileSync(propiedades,'utf8');

    if(file.length > 0){
        const propiedad = JSON.parse(file);
        const nuevaPropiedad = JSON.stringify(propiedad.concat(result));
        fs.writeFileSync(propiedades,nuevaPropiedad);
    }
    else{
        const nuevaPropiedad = JSON.stringify(result);
        fs.writeFileSync(propiedades, `[${nuevaPropiedad}]`);
    }
};

const agregarError = () =>{

};





enlaces.map( item => {
    fetchPage(item.enlace)
        .then(agregarPropiedad)
        .catch(err => {
            console.log(err);
        });
});



