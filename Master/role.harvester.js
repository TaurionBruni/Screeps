const roleBuilder = {

    run: function (creep) {
        if(creep.memory.harvest && creep.carry.energy === 0){
            creep.memory.harvest = false;
            creep.say("🔄 harvest");
        }
        if(!creep.memory.harvest && creep.carry.energy === creep.carryCapacity){
            creep.memory.harvest = true;
            creep.say('🛠️ moving');
        }
        if(creep.memory.harvest){
            //find a construction site and start building
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0]);
                }
            }
            else{
                //todo add to spawn
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
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