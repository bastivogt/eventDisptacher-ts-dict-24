import { Counter, CounterEvent } from "./counter.js";

const c = new Counter();

c.on(CounterEvent.COUNTER_STARTED, (e: CounterEvent) => {
    console.log(e.type, (e.sender as Counter).count, e.params.count);
});

c.on(CounterEvent.COUNTER_CHANGED, (e: CounterEvent) => {
    console.log(e.type, (e.sender as Counter).count, e.params);
});

c.on(CounterEvent.COUNTER_FINISHED, (e: CounterEvent) => {
    console.log(e.type, (e.sender as Counter).count, e.params);
});

//c.off(CounterEvent.COUNTER_CHANGED);
c.run();

console.log("APP");
