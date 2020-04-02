/**
 * 飞行接口
 */
interface FlyBehavior {
    fly();
}

class FlyWithWings implements FlyBehavior {
    fly() {
        console.log('fly with wings');
    }
}

class FlyNotWay implements FlyBehavior {
    fly() {
        console.log('can not fly');
    }
}

/**
 * 叫声接口
 */
interface QuackBehavior {
    quack();
}

class Quack implements QuackBehavior {
    quack() {
        console.log('quack...');
    }
}

class Squeak implements QuackBehavior {
    quack() {
        console.log('squeak....')
    }
}

/**
 * 鸭子抽象类
 */
abstract class Duck {
    flyBehavior: FlyBehavior;
    quackBehavior: QuackBehavior;

    public display(): void {
        console.log('I am a model duck~~');
    }

    public performFly(): void {
        this.flyBehavior.fly();
    }

    public performQuack(): void {
        this.quackBehavior.quack();
    }

    setFlyBehavior(bef: FlyBehavior):void {
        this.flyBehavior = bef;
    }

    setQuackBehavior(quack: QuackBehavior):void {
        this.quackBehavior = quack;
    }

}

/**
 * 绿头鸭类
 */
class MallardDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyNotWay();
        this.quackBehavior = new Squeak();
    }

    display() {
        console.log('I am a MallardDuck');
    }
}

/**
 * 红头鸭类
 */
class RedHeadDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyWithWings();
        this.quackBehavior = new Quack();
    }

    display() {
        console.log('I am a ReadHeadDuck');
    }
}


/**
 * 新鸭子的飞行类
 */
class FlyWithRocket implements FlyBehavior {
    fly() {
        console.log('fly with rocket');
    }
}

class NewQuack implements QuackBehavior {
    quack() {
        console.log('quack with speaker');
    }
}

class NewDuck extends Duck {
    constructor() {
        super();
        this.flyBehavior = new FlyWithRocket();
        this.quackBehavior = new NewQuack();
    }

    display() {
        console.log('I am a new duck');
    }
}

/**
 * 执行函数
 */
function main() {
    let mallardDuck: Duck = new MallardDuck();
    let redHeadDuck: Duck = new RedHeadDuck();

    //红头鸭的鸣叫和飞行特征
    mallardDuck.display();
    mallardDuck.performFly();
    mallardDuck.performQuack();

    //绿头鸭的鸣叫和飞行特征
    redHeadDuck.display();
    redHeadDuck.performFly();
    redHeadDuck.performQuack();
    redHeadDuck.setFlyBehavior(new FlyNotWay());
    redHeadDuck.performFly();


    //新鸭子
    let newDuck: Duck = new NewDuck();
    newDuck.display();
    newDuck.performFly();
    newDuck.performQuack();
}

main();
