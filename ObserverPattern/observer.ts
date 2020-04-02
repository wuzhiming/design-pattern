type ObserverMap = Record<string, [(...args: any) => void]>;

/**
 * 普通使用callback的观察者
 */
class ObserverNormal {
    private clients: ObserverMap = {};

    public addEventListener(event: string, callback: (...args: any) => void): void {
        if (!this.clients[event]) {
            this.clients[event] = [callback];
        } else {
            this.clients[event].push(callback);
        }
    }

    public removeEventListener(event: string, callback: (...args: any) => void): void {
        for (let k in this.clients) {
            let cl: [(...args: any) => void] = this.clients[k];
            let cb = cl.find((item: (...args: any) => void) => {
                return item === callback;
            });
            if (cb) {
                cl.splice(cl.indexOf(cb), 1);
            }
        }
    }

    public emit(event: string, ...args: any): void {
        let cbs: [(...args: any) => void] = this.clients[event];
        if (cbs) {
            cbs.forEach((cb: (...args: any) => void) => {
                cb(...args);
            });
        }
    }
}

//在ts中，我们可以用interface来决定每个接口的作用，而不是用通用的 callback 来实现

/**
 * 使用明确的interface来定义Observer
 */
class ObserverFunc {
    private cryList: CryInterface[] = [];
    private smileList: SmileInterface[] = [];

    public listenToCry(cry: CryInterface): void {
        if (!this.cryList.find((item: CryInterface) => {
            return item === cry;
        })) {
            this.cryList.push(cry);
        }
    }

    public removeCry(cry: CryInterface) {
        if (this.cryList.find((item: CryInterface) => {
            return cry === item;
        })) {
            this.cryList.splice(this.cryList.indexOf(cry), 1);
        }
    }

    public listenToSmile(smile: SmileInterface): void {
        if (!this.smileList.find((item: SmileInterface) => {
            return item === smile;
        })) {
            this.smileList.push(smile);
        }
    }

    public removeSmile(smile: SmileInterface) {
        if (this.smileList.find((item: SmileInterface) => {
            return smile === item;
        })) {
            this.smileList.splice(this.smileList.indexOf(smile), 1);
        }
    }


    public emitCry(...args: any): void {
        this.cryList.forEach((cb: CryInterface) => {
            cb.cry(...args);
        });
    }

    public emitSmile(...args: any): void {
        this.smileList.forEach((cb: SmileInterface) => {
            cb.smile(...args);
        });
    }
}

interface CryInterface {
    cry: (...args: any) => void,
}

interface SmileInterface {
    smile: (...args: any) => void,
}

class Mood implements CryInterface, SmileInterface {
    cry(...args): void {
        console.log('cry output', ...args);
    }

    smile(...args): void {
        console.log('smile output', ...args);
    }
}

function obs(): void {
    let observer: ObserverNormal = new ObserverNormal();
    let a = {
        event1: (...args: any) => {
            console.log('event1 output', ...args);
        },
        event2: (...args: any) => {
            console.log('event2 output', ...args);
        }
    };

    observer.addEventListener('event1', a.event1);
    observer.addEventListener('event2', a.event2);

    observer.emit('event1', 'yes', 'is event', '1');
    observer.emit('event2', 'no', 'is event', '2');

    observer.removeEventListener('event1', a.event1);
    observer.emit('event1', 'yes', 'is event', '1');
    observer.emit('event2', 'no', 'is event', '2');


    //使用interface来明确每个接口的作用
    let mood: Mood = new Mood();
    let observerFunc: ObserverFunc = new ObserverFunc();
    observerFunc.listenToCry(mood);
    observerFunc.listenToSmile(mood);

    observerFunc.emitCry('yes', 'crying...');
    observerFunc.emitSmile('no', 'smiling...');

    observerFunc.removeCry(mood);
    observerFunc.emitCry('yes', 'crying...');
    observerFunc.emitSmile('no', 'smiling...');
}

obs();