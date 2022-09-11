import assert from 'node:assert';
import World from '../build/world.js';
import Point from '../build/point.js';
import Robot, { Instruction, Direction } from "../build/robot.js";

describe('Robot', function () {
    it('Example2', function () {
        const world = new World(5, 5);
        const robot = new Robot(world, new Point(1, 2), Direction.north);
        let result = robot.receiveCommand(
            Instruction.right,
            Instruction.forward,
            Instruction.right,
            Instruction.forward,
            Instruction.forward,
            Instruction.right,
            Instruction.forward,
            Instruction.right,
            Instruction.forward);

      assert.equal(result.position.x, 1);
      assert.equal(result.position.y, 3);
      assert.equal(result.direction, Direction.north);
    });

    it('Example3', function () {
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
            Instruction.forward);

      assert.equal(result.position.x, 3);
      assert.equal(result.position.y, 1);
      assert.equal(result.direction, Direction.east);
    });
});