import { Counter, CounterEvent } from "./counter.js";
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
//c.Off(CounterEvent.COUNTER_CHANGED);
c.run();
console.log("APP");
