const roleMechanic = {
    run: function (creep) {
        if(creep.memory.energize && creep.carry.energy === 0){
            creep.memory.energize = false;
            creep.say("🔄 harvest");
        }
        if(!creep.memory.energize && creep.carry.energy === creep.carryCapacity){
            creep.memory.energize = true;
            creep.say("energize");
        }
        if(creep.memory.energize){
            const energizeSite = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return structure.energy < structure.energyCapacity}});
            if(energizeSite !== ''){
                if(creep.transfer(energizeSite, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                    creep.moveTo(energizeSite);
                }
            }
            else{
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER ) &&
                            structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
                // If container is found, dump energy into it

                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else{
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source,{visualizePathStyle: {stroke: '#2bff4d'}})
            }
        }
    }
};
module.exports = roleMechanic;
