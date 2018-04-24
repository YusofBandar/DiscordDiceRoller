module.exports = {
    name: 'Life Keeper',
    command: '!rolllife',
    description: 'Maintains Life',
    example: '!rolllife set20 => member life to 20',
    execute(client, message, args) {

        var fs = require('fs');


        var gameObj = function(gameName){
            this.name = gameName;
            this.members = [];
        }

        var memberObj = function(memberName,memberLife,admin){
            this.memberName = memberName;
            this.memberLife = memberLife;
            this.admin = admin;
        }

        var command = message.content.split(" ")
        //start new game
        if (command[1].startsWith("newGame")) {
            var gameName;
            if(command[2] === undefined){
                gameName = "Game"
            }else{
                gameName = command[2];
            }
            var game = new gameObj(gameName);
            var member = new memberObj(message.author.username,20,true);
            game.members.push(member);
        
            fs.readFile('ActiveGame.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                    message.reply(gameName + " could not be created");
                    message.reply("Data could not be found")
                } else {
               
                    var ActiveGames = JSON.parse(data);
                    ActiveGames.Games.push(game);

                    jsonGames = JSON.stringify(ActiveGames); 
                    fs.writeFile('ActiveGame.json', jsonGames, 'utf8', function writeFileCallback(err, data){

                    });
            }});

           

            
           
        
           
        }
        //add to author life 
        else if (command[1].startsWith("addMember")) {
            console.log("ADD MEMBER");
            var mentions = Array.from(message.mentions.users);
            var index = -1;

           

            mentions.forEach(user => {
                //console.log(user[1].username);
            });
        }
        //minus from authors life 
        else if (command[1].startsWith("minus")) {

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