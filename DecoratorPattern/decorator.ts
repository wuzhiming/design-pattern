/**
 * 原料抽象类
 */
abstract class Beverage {
    description: string = 'drink';

    public getDescription(): string {
        return this.description;
    }

    public abstract cost(): number
}

/**
 * 浓缩咖啡原料
 */
class Espresso extends Beverage {
    constructor() {
        super();
        this.description = 'Espresso coffee';
    }

    public cost(): number {
        return 1.5;
    }
}

/**
 * 浓缩咖啡原料
 */
class HouseBlend extends Beverage {
    constructor() {
        super();
        this.description = 'HouseBlend coffee';
    }

    public cost(): number {
        return 1.5;
    }
}

/**
 * 配料抽象类
 */
abstract class CondimentDecorator extends Beverage {
    beverage: Beverage;
    public drink;

    public abstract getDescription(): string;
}

/**
 * 配料 牛奶
 */
class Milk extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    cost(): number {
        return 0.5 + this.beverage.cost();
    }

    public getDescription(): string {
        return this.beverage.getDescription() + ',Milk'
    }

}

/**
 * 配料 糖
 *
 */
class Sugar extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    cost(): number {
        return 0.4 + this.beverage.cost();
    }

    public getDescription(): string {
        return this.beverage.getDescription() + ',Sugar'
    }

}

/**
 * 配料 豆浆
 */
class Whip extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    cost(): number {
        return 0.2 + this.beverage.cost();
    }

    public getDescription(): string {
        return this.beverage.getDescription() + ',Whip'
    }

}

/**
 * 配料 摩卡
 */
class Mocha extends CondimentDecorator {
    beverage: Beverage;

    constructor(beverage: Beverage) {
        super();
        this.beverage = beverage;
    }

    cost(): number {
        return 0.8 + this.beverage.cost();
    }

    getDescription(): string {
        return this.beverage.getDescription() + ',Mocha';
    }
}


function dmain(): void {
    let drink: Beverage = new Espresso();
    console.log(drink.getDescription(), '$', drink.cost());

    //通过配料来装饰一层层的实例，到最后我们只需要调用最外层的cost就能通过这一层层的装饰，计算到最终的价格
    let mocha: Espresso = new Espresso();
    mocha = new Sugar(mocha);
    mocha = new Milk(mocha);
    mocha = new Mocha(mocha);
    console.log(mocha.getDescription(), '$', mocha.cost())
}

dmain();