module.exports = {
    name: 'Range Roll',
    command: '!rollrange',
    description: 'Generates random number between specified range, min is inclusive and max exclusive',
    example: '!rollrange 200:300 10:50 => generates two numbers between 200 to 300 and 10 to 50',
    execute(client,message, args) {
        console.log("Rolling Range");
        var startMessage = message.author + " is rolling: ";
        var resultMessage = message.author + " ";
        var inclusivity = 0;
    
        args.forEach(element => {
            if(element == "p"){
                startMessage = message.author.username + " is rolling: ";
                resultMessage = message.author.username + " results: ";
            }
            else if(element == 'i'){
                inclusivity= 1;
            }
        });

        
        
        matches = rangeExtractor(message.toString());
        console.log(matches);
        if(matches.length > 0){
            for (var i = 0; i < matches.length; i++) {
                startMessage += "between " + matches[i] + ", ";
                var str = matches[i];
                var lowerBound = str.slice(0, str.indexOf(":"));
                var upperBound = str.slice(str.indexOf(":")+1);
                console.log(lowerBound + "  " + Number(upperBound) + inclusivity);
                var number = getRandomInt(lowerBound,(Number(upperBound)+inclusivity));
                resultMessage += number + " : ";
            }
    
            message.channel.send(startMessage);
            message.channel.send(resultMessage);

        }else{
            message.reply("No range specifed");
        }

        function rangeExtractor(message) {
            var statement = /\d{1,3}[:]\d{1,3}/g;
            var match = true;
            var matches = [];
        
            while (match) {
                var result = statement.exec(message);
                if (result != null) {
                    matches.push(result[0]);
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

    },
};