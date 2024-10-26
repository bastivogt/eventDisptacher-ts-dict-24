import { Event, EventDispatcher } from "./sevo/events.js";

export class CounterEvent extends Event {
    static COUNTER_STARTED: string = "counterStarted";
    static COUNTER_CHANGED: string = "counterChanged";
    static COUNTER_FINISHED: string = "counterFinished";

    constructor(type: string, sender: object, params: any = {}) {
        super(type, sender, params);
    }
}

export class Counter extends EventDispatcher {
    private _start: number;
    private _stop: number;
    private _step: number;
    private _count: number;

    constructor(start: number = 0, stop: number = 10, step: number = 1) {
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

        this.dispatch(
            new CounterEvent(CounterEvent.COUNTER_STARTED, this, {
                count: this._count,
            })
        );
        for (; this._count < this._stop; this._count += this._step) {
            this.dispatch(
                new CounterEvent(CounterEvent.COUNTER_CHANGED, this, {
                    count: this._count,
                })
            );
        }
        this.dispatch(
            new CounterEvent(CounterEvent.COUNTER_FINISHED, this, {
                count: this._count,
            })
        );
    }
}
