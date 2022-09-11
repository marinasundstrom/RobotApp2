import World from './world.js';
import Point from './point.js';
import Robot, { Instruction, Direction } from "./robot.js";
const world = new World(5, 5);
const robot = new Robot(world, new Point(0, 0), Direction.east);
let result = robot.receiveCommand(Instruction.right, Instruction.forward, Instruction.left, Instruction.forward, Instruction.forward, Instruction.left, Instruction.right, Instruction.forward);
console.log(result);
//# sourceMappingURL=index.js.map