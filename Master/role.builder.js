const roleBuilder = {

    run: function (creep) {
        if(creep.memory.building && creep.carry.energy === 0){
            creep.memory.building = false;
            creep.say("🔄 harvest");
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity){
            creep.memory.building = true;
            creep.say('🛠️ building');
        }
        if(creep.memory.building){
            //find a construction site and start building
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
            else{
                //upgrade controller if there are no construction sites
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }else{
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleBuilder;