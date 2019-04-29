const rolecarry = {

    run: function (creep) {
        if(creep.memory.building && creep.carry.energy === 0){
            creep.memory.building = false;
            creep.say("🔄 to container");
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity){
            creep.memory.building = true;
            creep.say('🛠️ spawn');
        }
        if(creep.memory.building){
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                //upgrade controller if spawn is full
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
module.exports = rolecarry;