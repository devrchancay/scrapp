import fs from 'fs';

const ejecutivos = [{
    nombre: 'MARIA ANTONIETA MALDONADO GONZAGA',
    telefono: '0984450712',
    email: 'mamaldonado@cedenocabanilla.com'
},{
    nombre: 'CARLOS JULIO SAAVEDRA',
    telefono: '0997227351',
    email: 'cjsaavedra@cedenocabanilla.com'
},{
    nombre: 'LORENA MARTILLO ALVARADO',
    telefono: '0988720124',
    email: 'ldesaavedra@cedenocabanilla.com'
},{
    nombre: 'LOURDES MOSQUERA VALDEZ',
    telefono: '0993909302',
    email: 'lmosquera@cedenocabanilla.com'
},{
    nombre: 'PATRICIA OLIVES FEBRES CORDERO',
    telefono: '-',
    email: 'polivesfc@cedenocabanilla.com'
},{
    nombre: 'ISABEL VELEZ PROAÑO',
    telefono: '0987847049',
    email: 'iterranova@cedenocabanilla.com'
},{
    nombre: 'CECILIA RODRÍGUEZ',
    telefono: '0989768142',
    email: 'crodriguez@cedenocabanilla.com'
}];


const propiedades = './propiedades.json';

const file = fs.readFileSync(propiedades,'utf8');
const propiedad = JSON.parse(file);

const format = (description) => {
    description = description.replace(/(\r\n|\n|\r)/gm,"");
    return description.trim();
};

const testName = (description) => {

    const result = ejecutivos.reduce((prev, next) => {
        // console.log(prev, next.nombre);
        if(description.includes(next.nombre)){
            prev = {
                telefono: next.telefono,
                email: next.email,
                agente: next.nombre
            }
            return prev;
        }
        return prev;
    },{});

    return result;

};



const imp = propiedad.map(item => {
    const description = format(item.descripcion);
    let agent = testName(description);
    if(Object.keys(agent).length === 0){
        agent = {
            telefono: '',
            email: '',
            agente: ''
        };
    }

    const newItem = Object.assign({},item, agent);
    return newItem;
});

const result = './result.json';
const rr = JSON.stringify(imp);

fs.writeFileSync(result, rr);

