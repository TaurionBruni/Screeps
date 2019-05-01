const roleTower = {
    run: function (tower) {
        //Should attack hostile creeps first, then heal units
        const hostiles = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(hostiles){
            var username = hostiles[0].owner.username;
            Game.notify('User ${username} spotted in your room!');
            tower.attack(tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS));
        }
        else{
            //use only half of total energy to repair things
            if(tower.energy > (tower.energyCapacity / 2)){
                var damaged = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
                });
                if(damaged){
                    tower.repair(damaged);
                }
            }
        }


    }
};
module.exports = roleTower;