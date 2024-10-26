interface IListeners<E extends Event> {
    [key: string]: ListenerFunction<E>;
}

export type ListenerFunction<E extends Event> = (event: E) => void;

// export interface ListenerFunction<E extends Event> {
//     (event: E): void;
// }

export class Event {
    private _type: string;
    private _sender: object;
    private _params: any;
    constructor(type: string, sender: object, params: any = {}) {
        this._type = type;
        this._sender = sender;
        this._params = params;
    }

    get type() {
        return this._type;
    }

    get sender() {
        return this._sender;
    }

    get params() {
        return this._params;
    }
}

export class EventDispatcher<E extends Event> {
    private _listeners: IListeners<E>;

    static initialize<T extends Event>() {
        return new EventDispatcher<T>();
    }

    constructor() {
        this._listeners = {};
    }

    get listeners() {
        return this._listeners;
    }

    hasListener(type: string) {
        return type in this._listeners;
    }

    on(type: string, listener: ListenerFunction<E>): boolean {
        if (!this.hasListener(type)) {
            this._listeners[type] = listener;
            return true;
        }
        return false;
    }

    off(type: string): boolean {
        if (this.hasListener(type)) {
            delete this._listeners[type];
            return true;
        }
        return false;
    }

    dispatch(event: E): boolean {
        if (this.hasListener(event.type)) {
            this._listeners[event.type](event);
            return true;
        }
        return false;
    }

    clear() {
        this._listeners = {};
    }
}
