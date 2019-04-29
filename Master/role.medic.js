const roleMedic = {
    run: function (creep) {
        if(creep.memory.repair && creep.carry.energy === 0){
            creep.memory.repair = false;
            creep.say("🔄 harvest");
        }
        if(!creep.memory.repair && creep.carry.energy === creep.carryCapacity){
            creep.memory.repair = true;
            creep.say("repair");
        }
        if(creep.memory.repair){
            const repairSite = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.hits < structure.hitsMax}});
            if(repairSite){
                if(creep.repair(repairSite[0]) === ERR_NOT_IN_RANGE){
                    creep.moveTo(repairSite[0]);
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
module.exports = roleMedic;
