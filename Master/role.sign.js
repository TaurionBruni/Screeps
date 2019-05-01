const roleSign = {
 run: function (creep) {
     if(creep.room.controller) {
         if(creep.signController(creep.room.controller, "Property of A-aron") === ERR_NOT_IN_RANGE) {
             creep.moveTo(creep.room.controller);
         }
     }
 }
};
module.exports = roleSign;