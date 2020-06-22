
Tools.makeLocation("Exit_Glenbrook","And that is as far as I have programmed this for now. Probably will do a bit more later but \
this is probably about 40% of what this will be. This isn't supposed to be a big thing. \
It would be bigger I suppose if you went through everything here, tbh most of what I made here is optional. It can be speed \
ran in like 1 minute.</p><p>This is actually sort of \
inspired by the first <i>ever</i> game I made in javascript, which is why its perhaps not the most.. complicated thing in \
the world. This part is already like 5 times longer than what I first made though, which only had three sequential fights, with \
1 strange encounter type thing between each. This one also allows you to interact via website as oppossed to via pop ups. \
</p><br><p>Well, that about wraps it up! Cya!",[],[]);

var setup = function(){
    game_description = document.getElementById("description");
    game_options = document.getElementById("options");

    game.currentLocation = game.getLocationByID("The start");
    game.currentLocation.announce();
    game.currentLocation.enter();
}