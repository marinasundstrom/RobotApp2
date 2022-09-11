import World from "./world.js";
import Point from "./point.js";

export default class Robot {
    world: World;
    position: Point;
    direction: Direction;
    
    constructor(world: World, position: Point, direction: Direction) {
        this.world = world;
        this.position = position;
        this.direction = direction;
    }

    receiveCommand(...instructions: Instruction[]): CommandResult {
        for(let instruction of instructions) {
            this.interpretInstruction(instruction);
        }
        return { 
            position: this.position, 
            direction: this.direction 
        };
    }

    interpretInstruction(instruction: Instruction) {
        switch(instruction) {
            case Instruction.right:
                this.rotateRight();
                break;

            case Instruction.left:
                this.rotateLeft();
                break;

            case Instruction.forward:
                this.moveForward();
                break;
        }
    }

    rotateRight() {
        const currentDirection = this.direction;

        switch(currentDirection) {
            case Direction.north:
                this.direction = Direction.east;
                break;

            case Direction.east:
                this.direction = Direction.south;
                break;

            case Direction.south:
                this.direction = Direction.west;
                break;

            case Direction.west:
                this.direction = Direction.north;
                break;
        }
    }

    rotateLeft() {
        const currentDirection = this.direction;

        switch(currentDirection) {
            case Direction.north:
                this.direction = Direction.west;
                break;

            case Direction.west:
                this.direction = Direction.south;
                break;

            case Direction.south:
                this.direction = Direction.east;
                break;

            case Direction.east:
                this.direction = Direction.north;
                break;
        }
    }

    moveForward() {
        const currentDirection = this.direction;
        const currentPosition = this.position;

        switch(currentDirection) {
            case Direction.north:
                if (currentPosition.y - 1 < 0)
                {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x, this.position.y - 1);
                break;

            case Direction.east:
                if (currentPosition.x + 1 >= this.world.width)
                {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x + 1, this.position.y);
                break;

            case Direction.south:
                if (currentPosition.y + 1 >= this.world.depth)
                {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x, this.position.y + 1);
                break;

            case Direction.west:
                if (currentPosition.x - 1 < 0)
                {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x - 1, this.position.y);
                break;
        }
    }
}

export interface CommandResult {
    position: Point;
    direction: Direction;
}

export enum Direction {
    north = 1,
    east = 2,
    south = 3,
    west = 4
}

export enum Instruction {
    forward = 1,
    right = 2,
    left = 3
}