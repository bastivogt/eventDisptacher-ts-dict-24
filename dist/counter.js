import { Event, EventDispatcher } from "./sevo/events.js";
export class CounterEvent extends Event {
    constructor(type, sender, params = {}) {
        super(type, sender, params);
    }
}
CounterEvent.COUNTER_STARTED = "counterStarted";
CounterEvent.COUNTER_CHANGED = "counterChanged";
CounterEvent.COUNTER_FINISHED = "counterFinished";
export class Counter extends EventDispatcher {
    constructor(start = 0, stop = 10, step = 1) {
        super();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }
    get count() {
        return this._count;
    }
    run() {
        this._count = this._start;
        this.dispatch(new CounterEvent(CounterEvent.COUNTER_STARTED, this, {
            count: this._count,
        }));
        for (; this._count < this._stop; this._count += this._step) {
            this.dispatch(new CounterEvent(CounterEvent.COUNTER_CHANGED, this, {
                count: this._count,
            }));
        }
        this.dispatch(new CounterEvent(CounterEvent.COUNTER_FINISHED, this, {
            count: this._count,
        }));
    }
}
export class Counter2 {
    constructor(start = 0, stop = 10, step = 1) {
        this._ed = EventDispatcher.initialize();
        this._start = start;
        this._stop = stop;
        this._step = step;
        this._count = this._start;
    }
    get eventDispatcher() {
        return this._ed;
    }
    get count() {
        return this._count;
    }
    run() {
        this._count = this._start;
        this._ed.dispatch(new CounterEvent(CounterEvent.COUNTER_STARTED, this, {
            count: this._count,
        }));
        for (; this._count < this._stop; this._count += this._step) {
            this._ed.dispatch(new CounterEvent(CounterEvent.COUNTER_CHANGED, this, {
                count: this._count,
            }));
        }
        this._ed.dispatch(new CounterEvent(CounterEvent.COUNTER_FINISHED, this, {
            count: this._count,
        }));
    }
}
