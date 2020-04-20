interface Bird {
    quack();

    fly();
}

class BlackDuck implements Bird {
    quack() {
        console.log('BlackDuck,quack');
    }

    fly() {
        console.log('BlackDuck,fly');
    }
}

class Cat {
    jump(): void {
        console.log('cat,jump');
    }

    mew(): void {
        console.log('cat,mew');
    }

}

class CatAdapter implements Bird {
    cat: Cat;

    constructor(cat: Cat) {
        this.cat = cat;
    }

    fly(): void {
        for (let i = 0; i < 5; i++) {
            this.cat.jump();
        }
    }

    quack(): void {
        this.cat.mew();
    }

}


interface MediaOperation {
    leaveHome(): void;

    goHome(): void;
}

class BrightLight {
    turnOn(): void {
        console.log('turn on BrightLight');
    }

    turnOff(): void {
        console.log('off on BrightLight');
    }
}

class TV {
    volume: number;

    turnOn(): void {
        console.log('turn on TV');
    }

    turnOff(): void {
        console.log('off on TV');
    }

    setVolume(volume: number): void {
        this.volume = volume;
        console.log('set tv volume to', volume);
    }
}

class GaoJIMedia implements MediaOperation {
    tv: TV;
    bLight: BrightLight;

    constructor(tv: TV, bLight: BrightLight) {
        this.tv = tv;
        this.bLight = bLight;
    }

    goHome(): void {
        console.log('go home...');
        this.bLight.turnOn();
        this.tv.turnOn();
        this.tv.setVolume(15);
    }

    leaveHome(): void {
        console.log('leave home...');
        this.tv.turnOff();
        this.bLight.turnOff();
    }

}

function AdapterMain() {
    //适配器模式
    let blackDuck: BlackDuck = new BlackDuck();
    let cat: Cat = new Cat();
    let catAdapter: CatAdapter = new CatAdapter(cat);

    blackDuck.fly();
    blackDuck.quack();

    catAdapter.fly();
    catAdapter.quack();

    //外观模式
    let tv = new TV();
    let bLight = new BrightLight();
    let gaoJIMedia: GaoJIMedia = new GaoJIMedia(tv, bLight);

    gaoJIMedia.goHome();
    gaoJIMedia.leaveHome();
}

AdapterMain();