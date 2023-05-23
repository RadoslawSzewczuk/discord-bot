import * as fs from 'fs';
export default ( client ) => {
    const FOLDER_PATH = appRoot + '/events';

    client.handleEvents = async () => {

        for( const file of fs.readdirSync( FOLDER_PATH ).filter( file => file.endsWith( '.js' ) ) )
        {
            import( FOLDER_PATH + '/' + file ).then(
                event => {
                    event = event.default;
                    event.once
                        ? client.once( event.name, ( ...args ) => event.execute( ...args, client ) )
                        : client.on( event.name, ( ...args ) => event.execute( ...args, client ) )
                }
            );
        }
        // for( const folder of fs.readdirSync( FOLDER_PATH ) )
        // {
        //     console.log("oh hi1", folder);
        //     for( const file of fs.readdirSync( FOLDER_PATH + '/' + folder ).filter( file => file.endsWith( '.js' ) ) )
        //     {
        //         console.log("oh hi2", file);
        //         import( FOLDER_PATH + '/' + file ).then(
        //             event => {
        //                 console.log("event", event);
        //                 event.once
        //                     ? client.once( event.name, ( ...args ) => event.execute( ...args, client ) )
        //                     : client.on( event.name, ( ...args ) => event.execute( ...args, client ) )
        //             }
        //         );
        //     }
        // }
    }

    client.handleEvents();
}