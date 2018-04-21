module.exports = {
    name: 'Dice Roll',
    command: '!rolldice',
    description: 'Rolls either a die or number of dice for the user',
    example: '!rolldice D6 D20 => rolls 6 and a 20 sided dice',
    execute(client, message, args) {
        console.log("rolling dice")
        var startMessage = message.author + " is rolling: ";
        var resultMessage = message.author + " ";

        args.forEach(element => {
            if(element == "p"){
                startMessage = message.author.username + " is rolling: ";
                resultMessage = message.author.username + " dice: ";
            }
        });


        var matches = diceExtracter(message.toString());
        console.log(matches);
        
        if(matches.length > 0){
            for (var i = 0; i < matches.length; i++) {
                console.log("hit");
                startMessage += "D" + matches[i] + ", "
                resultMessage += getRandomInt(1, matches[i]) + " : ";
            }
    
            message.channel.send(startMessage);
            message.channel.send(resultMessage);
        }else{
            message.reply("Command Error, dice in wrong format");
        }
        

        function diceExtracter(message) {
            console.log(message);
            var statement = /[D]\d{1,3}/g;
            var match = true;
            var matches = [];

            while (match) {
                var result = statement.exec(message);
                if (result != null) {

                    matches.push(result[0].slice(1));
                } else {
                    match = false;
                }
            }

            return matches;

        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
};