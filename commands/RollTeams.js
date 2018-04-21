module.exports = {
    name: 'Teams Allocator',
    command: '!rollteam',
    description: 'Allocates all members to specified number of teams',
    example: '!rollteam 2 => allocates all online members to two teams',
    execute(client, message, args) {

        var privateMessage = "";
        var presence = "online";

        args.forEach(element => {
            if (element == "p") {
                privateMessage = message.author;
            } else if (element == "e") {
                presence = "";
            } else if (element == "i") {
                presence = "optIn";
            }
        });

        var users = Array.from(client.users);
        var userNames = []
    

        for (var i = 2; i < users.length; i++) {
            console.log(users[i][1].presence.status);

            if (presence == "") {
                userNames.push(users[i][1].username);

            } else if (users[i][1].presence.status == "online") {
                userNames.push(users[i][1].username);
            }
        }

        teamSend(userNames);


        function teamSend(userNames) {
            var matches = teamExtractor(message.toString()).toString();
            if (matches <= userNames.length) {
                var teams = teamAllocate(matches, userNames);

                message.channel.send(privateMessage + "===== TEAMS ALLOCATED =====")
                for (var i = 0; i < teams.length; i++) {
                    message.channel.send(privateMessage + "Team: " + (i + 1) + "  " + teams[i].members);
                }
                message.channel.send(privateMessage + "==========================")
            } else {
                message.reply("Too many teams for too few members");
            }
        }

        function teamAllocate(teamSize, members) {
            var teams = [];

            for (var j = 0; j < teamSize; j++) {
                teams.push({
                    members: []
                });
            }

            members = arrayShuffle(members);
            var teamNumber = 0;
            for (var i = 0; i < members.length; i++) {

                teams[teamNumber].members.push(members[i]);
                teamNumber = ++teamNumber % teamSize;
            }

            return teams;
        }

        function arrayShuffle(array) {
            var i = 0;
            var j = 0;
            var temp = null;

            for (i = array.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1));
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array;
        }


        function teamExtractor(message) {
            var regex = /\b\d{1,2}/g;
            var groups = regex.exec(message);

            if (groups == null) {
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