//const endpoint = 'http://www.cedenocabanilla.com/es/inmuebles?offset=432&borden=precio_asc';

import xray from 'x-ray';

const x = xray({
    filters: {
        trim: (value) => typeof value === 'string' ? value.trim() : value
    }
});

const endpoint = 'http://www.cedenocabanilla.com/es/inmuebles';

const link = '.property-row-title > a@href';

x(endpoint, '.property-row', [{
    enlace: link,
}])
.paginate('.pagination > .active + li > a@href')
.limit(38)
.write('enlaces.json')