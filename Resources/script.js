var Wolf = function(vic){
    let w = generateBaseEnemy("Wolf", 10, 10);
    w.boost = 0;
    w.scratch = 1;
    w.heal = 3;
    w.boostNum = 1;
    w.bite = 3;
    w.performCombat = function(){
        let me = this;
        let choice = getRandom(1,10);
        if(me.health < 0){
            me.isAlive = false;
            return;
        }
        else if(me.health < 3){
            game.print("The wolf does not look to be having a good time");
        }
        else if(me.health < 7){
            game.print("The wolf looks ready");
        }
        else{
            game.print("The wolf looks energetic");
        }
        if(me.boost > 0){
            choice = 3;
        }
        if(choice < 8){
            game.print("The wolf lunges forwards with a growl!");
            choice = getRandom(1,7);
            let ammount = me.boost
            if(choice == 1){
                if(getRandom(1,2) == 1)game.print("You duck aside just in time!");
                else game.print("The wolf stumbles on a tree branch and goes just wide");
                ammount = 0;
            }
            else if(choice < 5){
                ammount += me.scratch;
                game.print("It claws at you, drawing some blood, doing "+parseInt(ammount)+" damage");
            }
            else{
                ammount +=me.bite;
                game.print("It fastens its jaws around your arm and bites down, you take "+parseInt(ammount)+" damage!");
            }
            player.health -= ammount;
            me.boost = 0;
        }
        else if(choice < 10){
            game.print("The wolf bares its teeth and snarls at you");
            game.print("It crouches down in anticipation");
            me.boost = 1;
        }
        else{
            game.print("The wolf tilts its head back and lets out a gutteral howl.");
            me.boost = me.boostNum;
            me.health += me.heal;
            if(me.health > me.maxHealth){
                me.health = me.maxHealth;
            }
        }
    }

    w.victorySpeech = vic;
    return w;
}

var Spicy_Wolf = function(vic){
    let sw = Wolf(vic);
    sw.health = 18;
    sw.maxHealth = 18;
    sw.scratch = 3;
    sw.bite = 7;
    sw.heal = 5;
    sw.boostNum = 2;
    return sw;
}

var seenGoblinFire = false;
var heardGlenRumor = false;
var swordUpgradeLevel = 0;

var i_betterSword = Tools.makeItem("Better sword",30,"A more... reliable looking weapon than your first, with less dents in it",
function(){
    if(player.gold < 30){
        game.print("The merchent scoffs as he informs you you don't have enough gold. Thats embaressing");
        return;
    }
    if(swordUpgradeLevel >1){
        game.print("You consider buying the blade, but then remember you already have a <i>much</i> better one on hand");
        return;
    }
    player.melee.min = 3;
    player.melee.max = 5;
    player.meleeBase.min = 3;
    player.meleeBase.max = 5;
    player.gold -= 30;
    let me = this;
    me.inShop = false;
},
function(){
    alert("How the fuck did you manage to use a sword as an item..?");
});
var i_healthGlen = Tools.makeItem("Glenden health potion",20,"A foul, brown looking brew, but the merchent assures you\
that it works (6 health)",
function(){
    if(player.gold <20){
        game.print("The merchant informs you that the potion is for wounds, not eyesight, as he points out the price tag\
        on the bottle. You blush sheepishly, deciding to be a little more careful");
        return;
    }
    player.gold -= 20;
    let me = this;
    player.items.push(me);
    me.inShop = false;
},
function(){
    game.print("You choke down the brown mix. At first you wonder if it 'heals' you by making you forget how\
    badly your bleeding due to your desire to cut off your own tongue, but soon realise such fears are unfounded.\
    Not the fear of it tasting bad though, this is still horrific");
    game.print("Recovered 6 health");
    player.health += 6;
    if(player.health > player.max.health){
        player.health = player.max.health;
    }
    for(let i = 0 ; i < player.items ; i++){
        if(player.items[i].name === "Glenden health potion"){
            player.items.splice(i,1);
            i-=1;
        }
    }
    player.endTurn();
});

var Goblin_Scout = function(vic){
    let g = generateBaseEnemy("Goblin Scout", 5, 3);
    g.performCombat = function(){
        let me = this;
        if(me.health < 0){
            me.isAlive = false;
            return;
        }
        let choice = getRandom(1,7);
        if(choice <= 5){
            game.print("The goblin scout flails about with their club randomly");
            let dmg = getRandom(0, 2);
            if(dmg === 0){
                game.print("You deflect its blows harmlessly away");
            }
            else{
                game.print("It connects with a thud doing "+parseInt(dmg)+" damage!");
                player.health -= dmg;
            }
        }
        else{
            game.print("In its incoherent babbling and flailing you make out the incantation for firebolt!");
            game.print("The goblin looks as confused as you do at the jet of flame that shoots towards you.");
            seenGoblinFire = true;
            let dmg = getRandom(4,6);
            game.print("You took "+parseInt(dmg)+" damage!");
            player.health -= dmg;
        }
    }
    g.victorySpeech = vic;
    return g;
}

var setup = function(){
    game_description = document.getElementById("description");
    game_options = document.getElementById("options");

    Tools.makeLocation("The start", "Here you are at your start of your adventures journey.\
    You believe your first order of business should be to go to the nearby town of Glenbrook, as it should have more oportunities for you than\
    the village you have been staying in. As you touch the trusty sword at your side you feel ready for anything...",["Ah, a wolf","Glenbrook Outskirts"],
    ["Begin your quest!", "Debug tp Glenbrook"]);

    Tools.makeEnemyEncounter("Ah, a wolf","No sooner have you stepped into the forest when suddenly a wolf steps in front of your path\
    While you have spent a long time slaying mighty dragons in your head but now that there is an enemy in front of you the whole\
    afair seems somewhat more... dangerous. 'Well, so be it! Thats how adventure is!' you tell yourself as you unsheath your worn\
    sword, trying to suppress your shaking hands...",Wolf(function(){
        game.print("The wolf sinks to the ground with a small yelp, panting with fleks of blood covering its flank.");
        game.print("You lean against a tree, panting heavily. This may be harder than you thought.");
    }),"Glenway Forest");

    Tools.makeLocation("Glenway Forest", "You are in the forest seperating Farthing village to Glenbrook, and the light making its\
    way through the trees carrys with it a glow of green from the foliage all around. You hear a river in the distance, which you\
    decide is probably the Glen Brook, and distant sounds of the forests inhebitants. Wolves to sure, and you think you have\
    heard of goblins making their home here as well",["Glen_Encounter","Glenbrook Outskirts"],["Wonder about","Move to the river"]);

    Tools.makeProcess("Glen_Encounter",function(){
        let choice = getRandom(1,2);
        if(choice === 1){
            switchLocation("Another wolf...");
        }
        else{
            switchLocation("A goblin scout jumps out");
        }
    });

    Tools.makeEnemyEncounter("Another wolf...","As you wonder about gormlessly, you are compleatly oblivious to a shape stalking\
    you through the trees. That is until it growls at you. Its hard to miss that. You ready yourself for another fight.",Wolf(function(){
        game.print("'That looks to be another wolf down' you think to yourself. You are getting pretty good at killing them.");
        game.print("But tales are never sung about a hero who only slew overgrown dogs. You must strive higher!");
    }),"Glenway Forest");

    Tools.makeEnemyEncounter("A goblin scout jumps out","You are walking through the forest, wondering along down whatever\
    trails you may happen to spot. However, clearly if there are trails, someone had to have made them. This brainwave hits you\
    about the same time a cry comes out from the undergrowth ahead. A small, weedy looking goblin leaps forwards. While its\
    size may be laughable, the stone club its wielding definately is not", Goblin_Scout(function(){
        game.print("The goblin scout starts flailing about on the ground, gurgling horribly.");
        game.print("... ew");
    }),"Glenway Forest");

    Tools.makeLocation("Glenbrook Outskirts", "You finally arrive. You see before you a town built within a seemingly natural clearing\
    in the forest. The Glen Brook flows through the towns center, and the bustle of activity floats along into your ears.",
    ["Glenbrook","Glen_Recover", "Glenway Forest"],["Enter the town","Set up camp and rest", "Return to the forest"]);
    Tools.makeProcess("Glen_Recover",function(){
        game.print("You decide to set up camp near to the town, and quickly fall asleep");
        player.fullRecover();
        game_options.innerHTML = "";
        setTimeout(function(){game.getLocationByID("Glenbrook Outskirts").enter();},1000);
    });
    Tools.makeLocation("Glenbrook","The polished dark-wood bulidings rise up around you; you have never seen so many\
    buidlings with two stories before. You think you can even see one with three! The trickle of the Brook and attached\
    water wheels mingles with the bustle of the market center. Where do you want to try heading first?",
    ["The Laughing Wheel","Hunter's Arms & Apothecary","Woodhome Library", "Glenbrook Outskirts"],
    ["The local Inn","The general store", "The town's mage guild", "The town outskirts"]);

    Tools.makeLocation("The Laughing Wheel", "A dark room awaits you. You were ready for the kind of oppressive\
    atmosphere that you here about in the bard's stories, but thats not what you encounter at all. All\
    around you are pleasent town-goers who are excited to here of whats happening outside the forest. No one really\
    seems that impressed by your victory over the wolf, rather telling you that you should be more careful, or that you\
    are lucky you didn't get hurt. Not quite what you had envisioned. You <i>do</i> however overhear one of the locals\
    mention something about there being an <em>Orc Chief</em> about through the trail to the north...",["Laughing_Exit"],
    ["Hmm... interesting"]);
    Tools.makeProcess("Laughing_Exit",function(){
        if(heardGlenRumor === false){
            game.getLocationByID("Glenbrook Outskirts").transitions.push("Thirdpass Trail");
            game.getLocationByID("Glenbrook Outskirts").transitionDiologue.push("Onwards to glory!");
            heardGlenRumor = true;
        }
        switchLocation("Glenbrook");
    });
    Tools.makeShop("Hunter's Arms & Apothecary", "The man behind the counter seemed... amused... to see you\
    enter the shop. You elect to not think to deeply about it. Behind the counter is a variety of trinkets.\
    You always here in the tales of the hero with only their trusty sword, but after your first fight, the whole\
    idea of not being as well equipt as possible sounds kind of silly.",
    ["Better sword","Healing potion","Glenbrook"],["New sword","Healing potion","Exit"],
    [function(){
        i_betterSword.onBuy();
        storage.output = "While the merchant counts through your counts, you decide you will get rid of your old sword\
        somewhere else;\
        it would not do well for your reputation to be pawning off such garbage here.\
        You look down at your new sword though, in its new scabard by your waist, and feel\
        an odd sense of acomplishment"
        game.getLocationByID("Hunter's Arms & Apothecary").reEnter();
    },
    function(){
        i_healthGlen.onBuy();

        game.getLocationByID("Hunter's Arms & Apothecary").reEnter();
    },
    function(){
        game.print("You hear a 'Goodbye, good luck' from the merchant as you leave");
        setTimeout(function(){switchLocation("Glenbrook");},1200);
    }],
    [i_betterSword, i_healthGlen]
    );


    game.currentLocation = game.getLocationByID("The start");
    game.currentLocation.announce();
    game.currentLocation.enter();
}