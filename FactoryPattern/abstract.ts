/**
 * 原料抽象类
 */
abstract class Ingredient {
    name: string;
}

class NormalWater extends Ingredient {
    constructor() {
        super();
        this.name = 'normal-water';
    }
}

class PureWater extends Ingredient {
    constructor() {
        super();
        this.name = 'pure-water'
    }
}

class GoatMilk extends Ingredient {
    constructor() {
        super();
        this.name = 'goat-milk';
    }
}

class CowMilk extends Ingredient {
    constructor() {
        super();
        this.name = 'cow-milk'
    }
}

/**
 * 原料工厂抽象接口
 */
interface IngredientFactory {
    createWater(): Ingredient;

    createMilk(): Ingredient;
}

class Factory1 implements IngredientFactory {
    createWater(): Ingredient {
        let water = new PureWater();
        console.log('create', water.name);
        return water;
    }

    createMilk(): Ingredient {
        let milk = new GoatMilk();
        console.log('create', milk.name);
        return milk;
    }
}

class Factory2 implements IngredientFactory {
    createWater(): Ingredient {
        let water = new NormalWater();
        console.log('create', water.name);
        return water;
    }

    createMilk() {
        let milk = new CowMilk();
        console.log('create', milk.name);
        return milk;
    }
}


/**
 * 饮料抽象类
 */
abstract class ADrink {
    name: string;
    water: Ingredient;
    factory: IngredientFactory;

    abstract prepare();
}

/**
 * 饮料1
 */
class Drink1 extends ADrink {
    constructor(factory: IngredientFactory) {
        super();
        this.factory = factory;
    }

    prepare() {
        this.factory.createWater();
        this.factory.createMilk();
    }
}

/**
 * 饮料1
 */
class Drink2 extends ADrink {
    //notice:把工程的实例传递给子类，这样主逻辑不需要考虑工厂的变化
    constructor(factory: IngredientFactory) {
        super();
        this.factory = factory;
    }

    prepare() {
        this.factory.createWater();
        this.factory.createMilk();
    }
}

/**
 * 饮料店抽象类
 */
abstract class DrinkStore {
    abstract createDrink(): ADrink;

    factory: IngredientFactory;

    //饮料店初始化的时候，就绑定原料工厂，后续饮料就根据自己的工厂去获取对应的原料，把工厂抽象出来后，就可以避免影响到主的生产逻辑
    //因为饮料并不关心是哪个工厂，只要有工厂可以拿到原料即可
    protected constructor(factory: IngredientFactory) {
        this.factory = factory;
    }
}

/**
 * 饮料店1
 */
class DrinkStore1 extends DrinkStore {
    constructor(factory: IngredientFactory) {
        super(factory);
    }

    createDrink() {
        let drink: ADrink = new Drink1(this.factory);
        drink.prepare();
        return drink;
    }
}

/**
 * 饮料店2
 */
class DrinkStore2 extends DrinkStore {
    constructor(factory: IngredientFactory) {
        super(factory);
    }

    createDrink() {
        let drink: ADrink = new Drink2(this.factory);
        drink.prepare();
        return drink;
    }
}

function abMain() {
    let store1: DrinkStore1 = new DrinkStore1(new Factory1());
    let store2: DrinkStore2 = new DrinkStore1(new Factory2());
    store1.createDrink();
    store2.createDrink();

}

abMain();


