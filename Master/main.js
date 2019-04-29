const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMedic = require('role.medic');
const roleCarry = require('role.carry');

//Controll number of screeps
const harvesters_max = 1;
const upgraders_max = 1;
const builders_max = 2;
const medic_max = 1;
const carry_max = 1;


function spawn(body, type){
    const newName = '' + type + Game.time;
    Game.spawns['Spawn1'].spawnCreep(body,newName, {memory: {role: type}})

}


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
    const medics = _.filter(Game.creeps, (creep) => creep.memory.role === 'medic');
    const carry = _.filter(Game.creeps, (creep) => creep.memory.role === 'carry');

    // Spawn More If needed
    switch (true) {
        case harvesters.length < harvesters_max:
            spawn([WORK,WORK,CARRY,MOVE],"harvester");
            break;
        case upgraders.length < upgraders_max:
            spawn([WORK,WORK,CARRY,CARRY,MOVE],"upgrader");
            break;
        case builders.length < builders_max:
            spawn([WORK,CARRY,MOVE], "builder");
            break;
        case medics.length < medic_max:
            spawn([WORK,CARRY,MOVE,MOVE], "medic");
            break;
        case carry.length < carry_max:
            spawn([CARRY,CARRY,MOVE,MOVE], 'carry');
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
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'medic'){
            roleMedic.run(creep);
        }
        if(creep.memory.role === 'carry'){
            roleCarry.run(creep);
        }
    }
};
