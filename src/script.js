import { createRequire } from "module";
const require = createRequire(import.meta.url);

import * as fs from 'fs';
import dotenv from "dotenv";
dotenv.config();
const { BOT_TOKEN, BOT_ID } = process.env;

import { Client, GatewayIntentBits } from 'discord.js';

import * as path from 'path';
import { fileURLToPath } from 'url';
global.appRoot = path.resolve( path.dirname( fileURLToPath( import.meta.url ) ) );


const client = new Client({
    intents: [
        // GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// client.on('ready', () => {
//     console.log("LETS GOOOOO!");
// });

//TODO: fetch from db
const response_arr = {
    'test1': 'answwer1',
    'test 2': 'answer 3'
};

client.on('messageCreate', ( message ) => {
    if( BOT_ID === message.author.id )
        return;

    if( response_arr[message.content] )
        client.channels.fetch( message.channelId )
            .then( channel => channel.send( response_arr[message.content] ) )
            .catch( console.error );
});

// import( appRoot + '/src/functions/methods.js' )
//     .then( methods => {
//         methods( client );
//         console.log("methods");
//     });
const FOLDER_PATH_FUNCTIONS = appRoot + '/' + 'functions';
for( const folder of fs.readdirSync( FOLDER_PATH_FUNCTIONS, { withFileTypes: true } ).filter( dir => dir.isDirectory() ).map( dir => dir.name ) )
{
    const functionFiles = fs
        .readdirSync( `${FOLDER_PATH_FUNCTIONS}/${folder}` )
        .filter( file => file.endsWith('.js') );

    for( const file of functionFiles )
        import( `${FOLDER_PATH_FUNCTIONS}/${folder}/${file}` ).then( module => {
            // console.log('mo', module)
            module.default( client )
        } );
}

// client.handleEvents();

client.login(BOT_TOKEN);

// TODO:
// command to clear channel messages