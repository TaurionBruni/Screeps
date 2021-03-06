const harvest = {
    run: function (creep) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};
module.exports = harvest;