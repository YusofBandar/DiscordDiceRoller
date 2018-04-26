/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'NDMxNzc3MjEyOTMzNjAzMzMw.DajzOw.OLc43g0sOAaftut_n1nP9Dq5Bo4';

//require file structure
const fs = require('fs');

//collection of commands
commands = [];

//array of files
const commandFiles = fs.readdirSync('./commands');

//get each command file and add it to the collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    commands.push({
        name: command.name,
        command: command
    })
}

var ActiveGames;

fs.readFile('ActiveGame.json', 'utf8', (err,data)=>{
    ActiveGames=JSON.parse(data);
});

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    jsonGame = JSON.stringify(ActiveGames); //convert it back to json
    fs.writeFile('ActiveGame.json', jsonGame, 'utf8', function(){});
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('Dice Roller is ready');
});

// Create an event listener for messages
client.on('message', message => {
    
    if(message.content.startsWith("!roll")){
        message.delete();

        var args = argsExtractor(message);

        commands.forEach(element => {
            if(message.content.startsWith(element.command.command)){
                element.command.execute(client, message,args,ActiveGames);
            }
        });

        if(message.content.startsWith("!rollhelp")){
            commands.forEach(element => {
               message.reply(element.name);
               message.reply("-----command: " + element.command.command);
               message.reply("-----description: " + element.command.description);
               message.reply("-----example: " + element.command.example);
               message.reply("------------------------");
            });
        }
    }
});


function argsExtractor(message){
    var args = message.content.split("-");
        
    if(args[1] != null){
        args = args[1].split(" ");
    }

    return args;
}





// Log our bot in
client.login(token)