const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMedic = require('role.medic');
const harvesters_max = 2;
const upgraders_max = 1;
const builders_max = 2;
const medic_max = 1;
module.exports.loop = function () {

    let newName;
    for(const n in Memory.creeps) {
        if(!Game.creeps[n]) {
            delete Memory.creeps[n];
            console.log('Clearing non-existing creep memory:', n);
        }
    }

    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    const medics = _.filter(Game.creeps, (creep) => creep.memory.role === 'medic');
    if(harvesters.length < harvesters_max) {
        newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    else {
        if (upgraders.length < upgraders_max) {
            newName = "Upgrader" + Game.time;
            console.log('Spawning new Upgrader ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                {memory: {role: 'upgrader'}});
        } else {
            if (builders.length < builders_max) {
                newName = "Builder" + Game.time;
                console.log('Spawning new Builder ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                    {memory: {role: 'builder'}});
            }
            else{
                if (medics.length < medic_max){
                    newName = "Medic" + Game.time;
                    console.log('Spawning new Medic ' + newName);
                    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'medic'}});
                }
            }
        }
    }

    if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

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
    }
};
