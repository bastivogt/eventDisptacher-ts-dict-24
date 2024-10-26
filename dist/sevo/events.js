export class Event {
    constructor(type, sender, params = {}) {
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
    constructor() {
        this._listeners = {};
    }
    get listeners() {
        return this._listeners;
    }
    hasListener(type) {
        return type in this._listeners;
    }
    on(type, listener) {
        if (!this.hasListener(type)) {
            this._listeners[type] = listener;
            return true;
        }
        return false;
    }
    Off(type) {
        if (this.hasListener(type)) {
            delete this._listeners[type];
            return true;
        }
        return false;
    }
    dispatch(event) {
        if (this.hasListener(event.type)) {
            this._listeners[event.type](event);
            return true;
        }
        return false;
    }
}
