
/*Tools.makeLocation("Exit_Glenbrook","And that is as far as I have programmed this for now. Probably will do a bit more later but \
this is probably about 40% of what this will be. This isn't supposed to be a big thing. \
It would be bigger I suppose if you went through everything here, tbh most of what I made here is optional. It can be speed \
ran in like 1 minute.</p><p>This is actually sort of \
inspired by the first <i>ever</i> game I made in javascript, which is why its perhaps not the most.. complicated thing in \
the world. This part is already like 5 times longer than what I first made though, which only had three sequential fights, with \
1 strange encounter type thing between each. This one also allows you to interact via website as oppossed to via pop ups. \
</p><br><p>Well, that about wraps it up! Cya!",[],[]);*/

var Gorskith = function(vic){
    let g = generateBaseEnemy("Gorskith", 20, 14);
    
    g.performCombat = function(){
        let me = this;
        alert("Not yet implimented");
        me.isAlive = false;
    }

    g.victorySpeech = vic;

    return g;
}

Tools.makeProcess("Exit_Glenbrook",function(){
    switchLocation("Thirdpeak trail");
});
Tools.makeLocation("Thirdpeak trail","This path through the forest heads along the river briefly, before making its \
way up to the mountain where the Orc Chief supposidly is living. You aren't quite sure where you are along the path, but it \
shouldn't be much further... you hope. You know that there are some wolves up on the mountain but none in this part of the \
woods... so thats something you guess",["riverEncounter1"],["Along the river!"]);

Tools.makeEnemyEncounter("A Goblin Scout from the river!","You are following the rivers path... when a strange yabbering \
emerges from the river. You look around for anywhere to hide yourself, but its too late. The Goblin Scout \
charges up from the bank, ragged club flailing wildly",Goblin_Scout(
    "The dead body of the scout behind you, you walk down to the river to wash yourself and your sword off. Who \
    knew goblin blood smelt so damn bad?"
),"Should be changed by processes");

Tools.makeEnemyEncounter("A Gorskith emerges from a stream!", "A strange mix of a water and rock elemental, and commonly \
spotted where the two elements would meet. This is all you learnt about the Gorskith from the folks at the in in Glenbrook. \
You probably should have asked more about them, such as how to run away from them, given that something matching their description \
just formed out from a nearby puddle...", Gorskith(
    "The water that was tightly wrapped around the rocky form splashes down to the ground, forming a puddle, as the \
    rock itself begins to melt into mud. You decide not to stick around long enough to see if this puddle will turn \
    hostile as well"
), "Should be changed by processes")

var riverEncounters = function(loc){
    let choice = getRandom(1,5);
    if(choice <= 2){
        game.getLocationByID("A Goblin Scout from the river!").endLocation = loc;
        switchLocation("A Goblin Scout from the river!");
    }
    else{
        game.getLocationByID("A Gorskith emerges from a stream!").endLocation = loc;
        switchLocation("A Gorskith emerges from a stream!");
    }
}

Tools.makeProcess("riverEncounter1",
    function(){
        riverEncounters("You see the distant trail");
    }
);

Tools.makeProcess("riverEncounter2",
    function(){
        riverEncounters("The mountain looms ahead...");
    }
);

Tools.makeProcess("riverEncounter1_Reverse",
    function(){
        riverEncounters("Thirdpeak trail");
    }
);

Tools.makeProcess("riverEncounter2_Reverse",
function(){
    riverEncounters("You see the distant trail");
});

Tools.makeLocation("You see the distant trail", "Occassionaly through the trees you now spot the mountain ahead, \
but as you look at it now from this small marshy clearing you see a small streak of colour going up it. It must be the trail! \
Or, you hope it is. After all, your boots were more form over function, all the <i>look</i> of great adventuring gear, with \
none of the padding or support. Your feet are killing you. But, probably no more than the nearby Gorskith if you don't keep going",
["riverEncounter2","riverEncounter1_Reverse"],
["Onwards!","Back towards Glenbrook"])

Tools.makeLocation("The mountain looms ahead...", "The river flows down into a very, <i>very</i> small looking cave. \
Chances are, you don't want to be going down there, and <i>probably</i> have already missed the exit you were going for. \
Welp, follow the river and then go up the mountain. These were the instructions you were given, and the mountain is here, \
so up you go then. Further up you see the trail you think you were suppossed to get to.</p><p> \
 The climb looks pretty sheer, however, so you probably won't be able to come back down again.",
 ["Mountain pass", "riverEncounter2_Reverse"],
 ["Climb up the mountain","Turn back for now"]);

var setup = function(){
    game_description = document.getElementById("description");
    game_options = document.getElementById("options");

    game.currentLocation = game.getLocationByID("The start");
    game.currentLocation.announce();
    game.currentLocation.enter();
}