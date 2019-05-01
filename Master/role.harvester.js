const roleBuilder = {

    run: function (creep) {
        switch(true){
            case creep.memory.harvest && creep.carry.energy === 0:
                creep.memory.harvest = false;
                creep.say("🔄 harvest");
                break;
            case !creep.memory.harvest && creep.carry.energy === creep.carryCapacity:
                creep.memory.harvest = true;
                creep.say('🛠️ moving');
        }

        if(creep.memory.harvest){
            // Find closest container thats not full
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) &&
                        structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }
            });
            // If container is found, dump energy into it
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

            else {
                //find a construction site and start building
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
        else{
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleBuilder;