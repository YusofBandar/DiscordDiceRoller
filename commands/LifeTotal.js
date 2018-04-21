module.exports = {
    name: 'Life Keeper',
    command: '!rolllife',
    description: 'Maintains Life',
    example: '!rolllife set20 => member life to 20',
    execute(client, message, args) {

        var gameObj = {
            Name: "",
            Members: []
        }

        var command = message.content.split(" ")
        //set author life
        if (command[1].startsWith("newGame")) {
            var life = lifeExtractor(command[1]);
            console.log(life[0]);
    
        }
        //add to author life 
        else if (command[1].startsWith("add")) {
        
        }
        //minus from authors life 
        else if (command[1].startsWith("minus")) {

        }

        message.reply(" life is ");

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