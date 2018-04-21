module.exports = {
    name: 'Range Roll',
    command: '!rollpicker',
    description: 'Picks a member of the channel',
    example: '!rollpicker  => sends a message to a member',
    execute(client,message, args) {
        var startMessage = message.author + "You have been picked";
        var presence = "online";
        var membersPick = 1;
        args.forEach(element => {
           
            if(element == "e"){
                presence = "";
            }
        });

        var users = Array.from(client.users);
        var userNames = []

        var matches = teamExtractor(message.toString()).toString();

        if(matches > 1){
            membersPick = matches;
        }

        for (var i = 2; i < users.length; i++) {
            if(presence != ""){
                if (users[i][1].presence.status == "online") {
                    userNames.push(users[i][1]);
                }
            }else{
                userNames.push(users[i][1]);
            }
        }
 
        if(matches > userNames.length){
            message.reply(" not enough people to pick")
        }else{
            for(var j=0;j<membersPick;j++){
                var member = getRandomInt(j,userNames.length);
                var temp = userNames[member];
                userNames[member] = userNames[j];
                userNames[j] = temp;
            }
    
            for(var z=0;z<membersPick;z++){
                var memberID = "<@" + userNames[z].id +">";
                message.channel.send(memberID + " you have been picked");
            }    

        }
       
        function teamExtractor(message) {
            var regex = /\b\d{1,2}/g;
            var groups = regex.exec(message);

            if(groups == null){
                groups = 1;
            }

            return groups;

        }


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

    },
};