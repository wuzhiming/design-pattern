enum FruitType {
    apple,
    blueberry,
    pear,
    strawberry
}


abstract class Fruit {
    type: FruitType;

    abstract toString(): string;
}

class BlueBerry extends Fruit {
    constructor() {
        super();
        this.type = FruitType.blueberry;
    }

    toString(): string {
        return 'blueberry';
    }
}

class Apple extends Fruit {
    constructor() {
        super();
        this.type = FruitType.apple;
    }

    toString(): string {
        return 'apple';
    }
}

class Pear extends Fruit {
    constructor() {
        super();
        this.type = FruitType.pear;
    }

    toString(): string {
        return 'pear';
    }
}

class StrawBerry extends Fruit {
    constructor() {
        super();
        this.type = FruitType.strawberry;
    }

    toString(): string {
        return 'strawberry';
    }
}

/**
 * 简单工厂，虽然他不算是设计模式，但是还是很经常被用来抽离代码
 */
class SimpleFactory {
    public createFruit(type): Fruit {
        let fruit: Fruit;
        switch (type) {
            case FruitType.apple:
                fruit = new Apple();
                break;
            case FruitType.blueberry:
                fruit = new BlueBerry();
                break;
            case FruitType.pear:
                fruit = new Pear();
                break;
            case FruitType.strawberry:
                fruit = new StrawBerry();
                break;
            default:
                fruit = new Apple();
        }
        return fruit;
    }
}

class Drink {
    fruits: Fruit[] = [];

    constructor(fruit: Fruit[]) {
        this.fruits = fruit;
    }

    public description(): string {
        let str: string = '';
        this.fruits.forEach((item: Fruit) => {
            str += item.toString() + ',';
        });
        return str;
    }
}

abstract class Store {
    drink: Drink;

    public abstract genJuice(type: FruitType): Drink;
}

class XiamenStore extends Store {
    public genJuice(type: FruitType): Drink {
        switch (type) {
            case FruitType.apple:
                this.drink = new Drink([new BlueBerry(), new Pear(), new Apple()]);
                break;
            case FruitType.blueberry:
                this.drink = new Drink([new StrawBerry(), new BlueBerry()]);
                break;
            case FruitType.strawberry:
                this.drink = new Drink([new StrawBerry(), new Pear()]);
                break;
            case FruitType.pear:
                this.drink = new Drink([new StrawBerry(), new Apple()]);
                break;

        }
        return this.drink
    }
}

class ZhangzhouStore extends Store {
    public genJuice(type: FruitType): Drink {
        switch (type) {
            case FruitType.apple:
                this.drink = new Drink([new BlueBerry(), new Apple()]);
                break;
            case FruitType.blueberry:
                this.drink = new Drink([new Apple(), new StrawBerry(), new BlueBerry()]);
                break;
            case FruitType.strawberry:
                this.drink = new Drink([new StrawBerry(), new Pear(), new Apple()]);
                break;
            case FruitType.pear:
                this.drink = new Drink([new Apple(), new Pear()]);
                break;

        }
        return this.drink
    }
}

/**
 * 简单工厂示例
 * @constructor
 */
function SimpleFactoryMain() {
    let factory: SimpleFactory = new SimpleFactory();
    let fruit1: Fruit = factory.createFruit(FruitType.apple);
    let fruit2: Fruit = factory.createFruit(FruitType.blueberry);
}

SimpleFactoryMain();

function FactoryMethodMain() {
    let xmStore: Store = new XiamenStore();
    let zzStore: Store = new ZhangzhouStore();
    let xmDrink: Drink = xmStore.genJuice(FruitType.pear);
    let zzDrink: Drink = zzStore.genJuice(FruitType.pear);
    console.log(xmDrink.description());
    console.log(zzDrink.description());
}

FactoryMethodMain();
