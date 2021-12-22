//inicio servidor
require('dotenv').config()
//antes de ejecutar cualquier cosa, llamara a variables 

const app = require('./app')
require('./database')


async function main() {
    await app.listen(app.get('port'))
    console.log('Server on port', app.get('port'))
}

main()