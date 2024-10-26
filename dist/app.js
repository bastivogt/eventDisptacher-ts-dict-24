import { Counter, CounterEvent, Counter2 } from "./counter.js";
import { Event } from "./sevo/events.js";
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
// handler function
// function c2_counterChangedHandler(e: CounterEvent) {
//     const sender = e.sender as Counter;
//     console.log(e.type, sender.count, e.params.count);
// }
const c2_counterChangedHandler = (e) => {
    const sender = e.sender;
    console.log(e.type, sender.count, e.params.count);
};
c2.eventDispatcher.on(CounterEvent.COUNTER_STARTED, (e) => {
    console.log(e.type, e.params.count);
});
/* c2.eventDispatcher.on(CounterEvent.COUNTER_CHANGED, (e: CounterEvent) => {
    console.log(e.type, e.params.count);
}); */
c2.eventDispatcher.on(CounterEvent.COUNTER_CHANGED, c2_counterChangedHandler);
c2.eventDispatcher.on(CounterEvent.COUNTER_FINISHED, (e) => {
    console.log(e.type, e.params.count);
    const sender = e.sender;
    setTimeout(() => {
        sender.eventDispatcher.dispatch(new Event("counterComplete", sender, { count: sender.count }));
    }, 2000);
});
c2.eventDispatcher.on("counterComplete", (e) => {
    console.log("COMPLETE", e.sender.count, e.params.count);
});
c2.eventDispatcher.off(CounterEvent.COUNTER_CHANGED);
// c2.eventDispatcher.clear();
c2.run();
console.log(c2.eventDispatcher.listeners);
