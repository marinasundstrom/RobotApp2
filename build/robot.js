import Point from "./point.js";
export default class Robot {
    world;
    position;
    direction;
    constructor(world, position, direction) {
        this.world = world;
        this.position = position;
        this.direction = direction;
    }
    receiveCommand(...instructions) {
        for (let instruction of instructions) {
            this.interpretInstruction(instruction);
        }
        return {
            position: this.position,
            direction: this.direction
        };
    }
    interpretInstruction(instruction) {
        switch (instruction) {
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
        switch (currentDirection) {
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
        switch (currentDirection) {
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
        switch (currentDirection) {
            case Direction.north:
                if (currentPosition.y - 1 < 0) {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x, this.position.y - 1);
                break;
            case Direction.east:
                if (currentPosition.x + 1 >= this.world.width) {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x + 1, this.position.y);
                break;
            case Direction.south:
                if (currentPosition.y + 1 >= this.world.depth) {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x, this.position.y + 1);
                break;
            case Direction.west:
                if (currentPosition.x - 1 < 0) {
                    throw new Error("Invalid operation");
                }
                this.position = new Point(this.position.x - 1, this.position.y);
                break;
        }
    }
}
export var Direction;
(function (Direction) {
    Direction[Direction["north"] = 1] = "north";
    Direction[Direction["east"] = 2] = "east";
    Direction[Direction["south"] = 3] = "south";
    Direction[Direction["west"] = 4] = "west";
})(Direction || (Direction = {}));
export var Instruction;
(function (Instruction) {
    Instruction[Instruction["forward"] = 1] = "forward";
    Instruction[Instruction["right"] = 2] = "right";
    Instruction[Instruction["left"] = 3] = "left";
})(Instruction || (Instruction = {}));
//# sourceMappingURL=robot.js.map