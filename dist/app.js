import { Counter, CounterEvent, Counter2 } from "./counter.js";
const c = new Counter();
c.on(CounterEvent.COUNTER_STARTED, (e) => {
    console.log(e.type, e.sender.count, e.params.count);
});
c.on(CounterEvent.COUNTER_CHANGED, (e) => {
    console.log(e.type, e.sender.count, e.params);
});
c.on(CounterEvent.COUNTER_FINISHED, (e) => {
    console.log(e.type, e.sender.count, e.params);
});
// c.off(CounterEvent.COUNTER_CHANGED);
c.run();
console.log(c.listeners);
console.log("-------------------------------------");
const c2 = new Counter2(100, 200, 10);
c2.eventDispatcher.on(CounterEvent.COUNTER_STARTED, (e) => {
    console.log(e.type, e.params.count);
});
c2.eventDispatcher.on(CounterEvent.COUNTER_CHANGED, (e) => {
    console.log(e.type, e.params.count);
});
c2.eventDispatcher.on(CounterEvent.COUNTER_FINISHED, (e) => {
    console.log(e.type, e.params.count);
});
c2.eventDispatcher.off(CounterEvent.COUNTER_CHANGED);
c2.run();
console.log(c2.eventDispatcher.listeners);
