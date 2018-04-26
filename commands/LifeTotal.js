module.exports = {
    name: 'Life Keeper',
    command: '!rollgame',
    description: 'Maintains Life',
    example: '!rollgame set20 => member life to 20',
    execute(client, message, args, ActiveGames) {

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
        if (command[1].startsWith("new")) {
            newGame(command, ActiveGames);
            console.log(ActiveGames);
        }
        //add to author life 
        else if (command[1].startsWith("addMember")) {
            console.log("ADD MEMBER");
            var mentions = Array.from(message.mentions.users);

            addMember(command, ActiveGames, mentions);


        } else if (command[1].startsWith("add")) {

        }
        //minus from authors life 
        else if (command[1].startsWith("minus")) {

        } else if (command[1].startsWith("view")) {
            viewGame(command, ActiveGames);

        } else if (command[1].startsWith("active")) {
            changeActiveGame(command, ActiveGames);
        }

        function viewGame(command, ActiveGames) {

            if (command[2] == null) {
                if (ActiveGames.ActiveGame != null) {
                    command[2] = ActiveGames.ActiveGame;
                } else {
                    message.reply("There is no active game");
                    return;
                }
            }


            ActiveGames.Games.some(function (game) {
                if (command[2] == game.name) {
                    message.channel.send("==========" + game.name + "==========");

                    game.members.forEach(function (member) {
                        message.channel.send(" " + member.memberName + ": " + member.memberLife);
                    })

                    message.channel.send("==========================")
                    return true;
                }
            })



        }


        function changeActiveGame(command, ActiveGames) {
            var found = false;

            ActiveGames.Games.some(function (game) {
                if (command[2] == game.name) {
                    ActiveGames.ActiveGame = game.name;
                    found = true;
                    return true;
                }
            })

            if (found) {
                message.reply(command[2] + " is now the active game");
            } else {
                message.reply("game could not be found");
            }

            

        }


        function addMember(command, ActiveGames, mentions) {
            console.log(command[2]);
            if (command[2].startsWith("<@")) {
                command[2] = ActiveGames.ActiveGame;
                console.log(command[2]);
            }

            ActiveGames.Games.forEach(function (game) {
                if (game.name == command[2]) {
                    addMembers(game, mentions);
                }
            })


            message.reply("members were added to " + command[2]);
        }


        function addMembers(game, mentions) {
            mentions.forEach(user => {
                //console.log(user[1].username);
                game.members.push(new memberObj(user[1].username, 20, false));
            });
        }

        function newGame(command, ActiveGames) {
            var gameName;
            if (command[2] === undefined) {
                gameName = "Game"
            } else {
                gameName = command[2];
            }
            var game = new gameObj(gameName);
            var member = new memberObj(message.author.username, 20, true);
            game.members.push(member);


            ActiveGames.Games.push(game);
            ActiveGames.ActiveGame = gameName;

            message.reply(gameName + " has been created");
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