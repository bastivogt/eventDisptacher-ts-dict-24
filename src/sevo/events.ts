interface IListeners {
    [key: string]: ListenerFunction;
}

type ListenerFunction = (event: Event) => void;

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

export class EventDispatcher {
    private _listeners: IListeners;

    constructor() {
        this._listeners = {};
    }

    get listeners() {
        return this._listeners;
    }

    hasListener(type: string) {
        return type in this._listeners;
    }

    on(type: string, listener: ListenerFunction): boolean {
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

    dispatch(event: Event): boolean {
        if (this.hasListener(event.type)) {
            this._listeners[event.type](event);
            return true;
        }
        return false;
    }
}
