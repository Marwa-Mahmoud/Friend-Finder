var friends = require('../data/friends.json');
var jsonfile = require('jsonfile');


module.exports = function(app,path){

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });

    app.post('/api/mydata', function(req, res){

        var newFriend = req.body;
        var newFriendScore = newFriend.scores;
        var totalDifArray = [];
    
    ///Compare the scores to get the match
        for (var person in friends) {
            var totalDifference = 0;
            var friendScore = friends[person].scores;
            for (var i = 0;  i < friendScore.length ; i++) {
                totalDifference +=  Math.abs(newFriendScore[i] - friendScore[i]);
             }
             totalDifArray.push(totalDifference);
        }
        var leastDiff = Math.min.apply(Math, totalDifArray);
        res.json(friends[totalDifArray.indexOf(leastDiff)]); 


    ///Update the file with the new entry 
    index = friends.findIndex(x => x.name==newFriend.name);
    console.log(index);

        if(index){
            console.log("This person already exists");
        }
        else{    
            friends.push(newFriend);
            jsonfile.writeFile('app/data/friends.json', friends, function(err){
                if(err) throw err;
                console.log("Friends array updated");
            });
        }
        
    });
}