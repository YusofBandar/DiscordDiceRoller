module.exports = {
    name: 'Life Keeper',
    command: '!rollgame',
    description: 'Maintains Life',
    example: '!rollgame set20 => member life to 20',
    execute(client, message, args) {

        var fs = require('fs');


        var gameObj = function (gameName) {
            this.name = gameName;
            this.members = [];
        }

        var memberObj = function (memberName, memberLife, admin) {
            this.memberName = memberName;
            this.memberLife = memberLife;
            this.admin = admin;
        }

        var command = message.content.split(" ")
        //start new game
        if (command[1].startsWith("newGame")) {
            var gameName;
            if (command[2] === undefined) {
                gameName = "Game"
            } else {
                gameName = command[2];
            }
            var game = new gameObj(gameName);
            var member = new memberObj(message.author.username, 20, true);
            game.members.push(member);

            fs.readFile('ActiveGame.json', 'utf8',newGame);
        }
        //add to author life 
        else if (command[1].startsWith("addMember")) {
            console.log("ADD MEMBER");
            var mentions = Array.from(message.mentions.users);

            fs.readFile('ActiveGame.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    message.reply(gameName + " could not be created");
                    message.reply("Data could not be found")
                } else {

                    var ActiveGames = JSON.parse(data);

                    for (var i = 0; i < ActiveGames.Games.length; i++) {
                        var name = ActiveGames.Games[i].name;
                        if (name == ActiveGames.ActiveGame) {
                            //console.log(user[1].username);
                            addMembers(ActiveGames.Games[i], mentions);
                            break;
                        }

                        if (name == command[2]) {
                            addMembers(ActiveGames.Games[i], mentions);
                            break;
                        }
                    }

                    writeToJSON(ActiveGames);

                    

                }
            });


        }
        //minus from authors life 
        else if (command[1].startsWith("minus")) {

        } else if (command[1].startsWith("active")) {
            fs.readFile('ActiveGame.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                    message.reply(gameName + " could not be created");
                    message.reply("Data could not be found")
                } else {

                    var ActiveGames = JSON.parse(data);
                    var found = false;
                    for (var i = 0; i < ActiveGames.Games.length; i++) {
                        if (command[2] === ActiveGames.Games[i].name) {
                            ActiveGames.ActiveGame = command[2];
                            found = true;
                            break;
                        }
                    }

                    writeToJSON(ActiveGames);

                    if (found) {
                        message.reply(command[2] + " is now the active game");
                    } else {
                        message.reply("game could not be found");
                    }

                }
            });
        }

        function newGame(err,data){
            if (err) {
                console.log(err);
                message.reply(gameName + " could not be created");
                message.reply("Data could not be found")
            } else {

                var ActiveGames = JSON.parse(data);
                ActiveGames.Games.push(game);
                ActiveGames.ActiveGame = gameName;
                
                writeToJSON(ActiveGames)

                message.reply(gameName + " has been created")
            }
        }

        function writeToJSON(JsonFile) {
            json = JSON.stringify(JsonFile);
            fs.writeFile('ActiveGame.json', json, 'utf8', function writeFileCallback(err, data) {});

        }

        function addMembers(game, mentions) {
            mentions.forEach(user => {
                //console.log(user[1].username);
                game.members.push(new memberObj(user[1].username, 20, false));
            });
        }


        function lifeExtractor(message) {
            var regex = /\d{1,3}/g;
            var life = [];
            life = regex.exec(message);

            if (life == null) {
                life = [];
                life.push(20);
            }

            return life;

        }
    }
}