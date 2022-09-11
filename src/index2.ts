import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import World from './world.js';
import Point from './point.js';
import Robot, { Instruction, Direction } from "./robot.js";

const rl = readline.createInterface({ input, output });

const worldSetup = await rl.question('World:');
const worldParts = worldSetup.split(' ');
const width = parseInt(worldParts[0]);
const depth = parseInt(worldParts[1]);

const world = new World(width, depth);

const robotSetup = await rl.question('Robot:');
const robotParts = robotSetup.split(' ');
const x = parseInt(robotParts[0]);
const y = parseInt(robotParts[1]);
const d = robotParts[2];

let direction: Direction = undefined;
switch(d) {
    case "N": direction = Direction.north; break;
    case "E": direction = Direction.east; break;
    case "S": direction = Direction.south; break;
    case "W": direction = Direction.west; break;
}

const robot = new Robot(world, new Point(x, y), direction);

while(true) {
    const instructionSetup = await rl.question('Command:');
    const instructions = Array.from(instructionSetup)

    for(let instruction of instructions) {
        let instr: Instruction = undefined;
        switch(instruction) {
            case 'R': instr = Instruction.right; break;
            case 'L': instr = Instruction.left; break;
            case 'F': instr = Instruction.forward; break;
        }

        try {
            robot.receiveCommand(instr);
        } catch(error) {
            console.log(error);
            break;
        }
    }
    
    console.log(`Report: ${robot.position.x} ${robot.position.y} ${Direction[robot.direction][0].toUpperCase()}`);
}

rl.close();