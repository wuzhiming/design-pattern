abstract class CaffeineBeverage {
    //这边控制好主体流程算法，子类无法修改，只能通过我们提供的钩子来影响部分的步骤。
    prepareRecipe(): void {
        this.boilWater();
        this.brew();
        this.pourInCup();
        //钩子 hook
        if (this.needCondiments()) {
            this.addCondiments();
        }
    }

    abstract brew(): void;

    abstract addCondiments(): void;

    abstract needCondiments(): boolean;


    boilWater(): void {
        console.log('boilWater');
    }

    pourInCup(): void {
        console.log('pourInCup');

    }
}

class Tea extends CaffeineBeverage {
    addCondiments(): void {
        console.log('add lemon');
    }

    brew(): void {
        console.log('brew tea');
    }

    needCondiments(): boolean {
        return false;
    }

}

class Coffee extends CaffeineBeverage {
    addCondiments(): void {
        console.log('add sugar and milk');
    }

    brew(): void {
        console.log('brew coffee');
    }

    needCondiments(): boolean {
        return true;
    }
}

function TemplateMain() {
    let coffee: Coffee = new Coffee();
    let tea: Tea = new Tea();
    coffee.prepareRecipe();
    tea.prepareRecipe();
}

TemplateMain();