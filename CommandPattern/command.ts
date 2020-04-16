interface Command {
    execute(): void;

    undo(): void;
}

class Light {
    description: string;

    constructor(desc: string) {
        this.description = desc;
    }

    on(): void {
        console.log('turn on', this.description);
    }

    off(): void {
        console.log('turn off', this.description);
    }
}

class LightOnCommand implements Command {
    light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.on();
    }

    undo(): void {
        this.light.off();
    }
}

class LightOffCommand implements Command {
    light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.off();
    }

    undo(): void {
        this.light.on();
    }
}

/**
 * 假定一个控制器有2对开关按钮，按下按钮要做对操作
 */
class RemoteControl {
    onCommand: Command[] = [];
    offCommand: Command[] = [];
    curCommand: Command;

    /*constructor() {
        this.onCommand = [];
        this.offCommand = [];
    }*/
    setCommand(index: number, on: Command, off: Command) {
        this.onCommand[index] = on;
        this.offCommand[index] = off;
    }

    onButtonPushed(index: number): void {
        if (!this.onCommand[index]) {
            console.log('no command');
            return;
        }

        this.onCommand[index].execute();
        this.curCommand = this.onCommand[index];
    }

    offButtonPushed(index: number): void {
        if (!this.offCommand[index]) {
            console.log('no command');
            return;
        }

        this.offCommand[index].execute();
        this.curCommand = this.offCommand[index];
    }

    undo(): void {
        if (this.curCommand) {
            this.curCommand.undo();
            return;
        }
        console.log('can not undo');
    }


}

function CommandMain(): void {
    let light1: Light = new Light('light1');
    let light1OnCommand: Command = new LightOnCommand(light1);
    let light1OffCommand: Command = new LightOffCommand(light1);

    let light2: Light = new Light('light2');
    let light2OnCommand: Command = new LightOnCommand(light2);
    let light2OffCommand: Command = new LightOffCommand(light2);

    let remoteControl: RemoteControl = new RemoteControl();

    remoteControl.setCommand(0, light1OnCommand, light1OffCommand);
    remoteControl.setCommand(1, light2OnCommand, light2OffCommand);

    remoteControl.onButtonPushed(0);
    remoteControl.onButtonPushed(1);
    remoteControl.offButtonPushed(0);
    remoteControl.offButtonPushed(1);

    remoteControl.undo();
}

CommandMain();