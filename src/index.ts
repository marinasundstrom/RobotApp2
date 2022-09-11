import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import World from './world.js';
import Point from './point.js';
import Robot, { Instruction, Direction } from "./robot.js";

/*
const rl = readline.createInterface({ input, output });

const answer = await rl.question('What do you think of Node.js? ');

console.log(`Thank you for your valuable feedback: ${answer}`);

rl.close();
*/

const world = new World(5, 5);
const robot = new Robot(world, new Point(0, 0), Direction.east);

let result = robot.receiveCommand(
    Instruction.right,
    Instruction.forward,
    Instruction.left,
    Instruction.forward,
    Instruction.forward,
    Instruction.left,
    Instruction.right,
    Instruction.forward
);

console.log(result);