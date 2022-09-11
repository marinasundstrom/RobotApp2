import path from 'node:path';

import express from 'express';
const app = express();
import * as http from 'node:http';

import World from './world.js';
import Point from './point.js';
import Robot, { Instruction, Direction } from "./robot.js";

const server = http.createServer(app);

import { Server } from 'socket.io';

const io = new Server(server);

let world: World = undefined;
let robot: Robot = undefined;

app.use(express.static('public'))

/*
app.get('/', (req, res) => {
  res.sendFile(path.resolve() + '/public/index.html');
});
*/

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('initWorld', (w) => {
    world = new World(w.width, w.depth);

    socket.emit("update");
  });

  socket.on('initRobot', (r) => {
    let direction = undefined;
    switch(r.direction) {
        case "N": direction = Direction.north; break;
        case "E": direction = Direction.east; break;
        case "S": direction = Direction.south; break;
        case "W": direction = Direction.west; break;
    }

    robot = new Robot(world, new Point(r.position.x, r.position.y), direction);

    socket.emit("update", { position: { x: robot.position.x, y: robot.position.y }, direction: Direction[robot.direction] });
  });

  socket.on('command', (instruction) => {
    let instr: Instruction = undefined;
    switch(instruction) {
        case 'R': instr = Instruction.right; break;
        case 'L': instr = Instruction.left; break;
        case 'F': instr = Instruction.forward; break;
    }

    try {
        robot.receiveCommand(instr);
        socket.emit("update", { position: { x: robot.position.x, y: robot.position.y }, direction: Direction[robot.direction] });
    } catch (error) {
        socket.emit("error", "Cannot go outside the bounds of the world.");
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});