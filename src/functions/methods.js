// import fs from "fs";
//
// export default ( client )
// {
//     const FOLDER_PATH_FUNCTIONS = appRoot + '/' + 'functions';
//     for( const folder of fs.readdirSync( FOLDER_PATH_FUNCTIONS ) )
//     {
//         const functionFiles = fs
//             .readdirSync( `${FOLDER_PATH_FUNCTIONS}/${folder}` )
//             .filter( file => file.endsWith('.js') );
//
//         for( const file of functionFiles )
//             import( `${FOLDER_PATH_FUNCTIONS}/${folder}/${file}` ).then( module => {
//                 console.log('mo', module)
//                 module.default( client )
//             } );
//
//
//     }
// }