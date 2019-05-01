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
            const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
            else{
                //upgrade controller if there are no construction sites
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }else{
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER ) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleBuilder;