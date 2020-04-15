class Singleton {
    static singleton;

    constructor() {
    }

    static getInstance(): Singleton {
        if (!this.singleton) {
            console.log('create singleton');
            this.singleton = new Singleton();
        }
        return this.singleton;
    }
}

/**
 * 多次调用返回同一个对象
 */
function sMain() {
    Singleton.getInstance();
    Singleton.getInstance();
    Singleton.getInstance();
}

sMain();