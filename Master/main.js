const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMedic = require('role.mechanic');
const roleCarry = require('role.carry');
const roleTower = require('role.tower');
const roleSign  = require('role.sign');

//Control number of screeps
const harvesters_max = 4;
const upgraders_max = 3;
const builders_max = 2;
const mechanic_max = 1;
const carry_max = 1;

function spawn(body, type){
    const newName = '' + type + Game.time;
    console.log("Spawning " + newName);
    Game.spawns['Spawn1'].spawnCreep(body,newName, {memory: {role: type}})

}
//spawn([MOVE], "sign");

module.exports.loop = function () {
    // Delete Dead screeps
    for(const n in Memory.creeps) {
        if(!Game.creeps[n]) {
            delete Memory.creeps[n];
            console.log('Clearing non-existing creep memory:', n);
        }
    }
    // find all screep types
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const mechanic = _.filter(Game.creeps, (creep) => creep.memory.role === 'mechanic');
    const carry = _.filter(Game.creeps, (creep) => creep.memory.role === 'carry');
    const sign = _.filter(Game.creeps, (creep) => creep.memory.role === 'sign');

    // Spawn More If needed
    switch (!Game.spawns['Spawn1'].spawning) {
        case harvesters.length < harvesters_max:
            spawn([WORK,WORK,WORK,CARRY,CARRY,MOVE],"harvester");
            break;
        case upgraders.length < upgraders_max:
            spawn([CARRY,CARRY,WORK,MOVE,MOVE],"upgrader");
            break;
        case builders.length < builders_max:
            spawn([WORK,WORK,CARRY,MOVE,MOVE], "builder");
            break;
        case mechanic.length < mechanic_max:
            spawn([WORK,WORK,CARRY,MOVE], "mechanic");
            break;
        case carry.length < carry_max:
            spawn([CARRY,CARRY,CARRY,MOVE,MOVE], 'carry');
            break;
    }


    // Shows spawning screeps
    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    // Do things
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'mechanic':
                roleMedic.run(creep);
                break;
            case 'carry':
                roleCarry.run(creep);
                break;
            case 'sign':
                roleSign.run(creep);
                break;
        }
    }
    const towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for( const t in towers){
        roleTower.run(towers[t]);
    }
};
