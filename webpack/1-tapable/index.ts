import {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} from "tapable";

class Compiler {
  hooks = {
    // 同步顺序执行tap
    syncHook: new SyncHook(["string"]),
    // 同步顺序执行tap，tap返回值非undefined则中断
    syncBailHook: new SyncBailHook(["string"]),
    // 同步顺序执行tap，tap返回值作为下一个tap参数
    syncWaterfallHook: new SyncWaterfallHook(["string"]),
    // 同步顺序执行tap，tap返回非undefined则重复执行
    syncLoopHook: new SyncLoopHook(["string"]),

    // 异步并发执行tap
    asyncParallelHook: new AsyncParallelHook(["string"]),
    // 异步并发执行tap，tap里面第一个返回值非undefined则执行callAsync回调，其他tap仍然执行
    asyncParallelBailHook: new AsyncParallelBailHook(["string"]),
    // 异步串行执行tap
    asyncSeriesHook: new AsyncSeriesHook(["string"]),
    // 异步串行执行tap，tap返回值非undefined则中断
    asyncSeriesBailHook: new AsyncSeriesBailHook(["string"]),
    // 异步串行执行tap，tap返回值作为下一个tap参数
    asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(["string"]),
  };

  run() {
    this.hooks.syncHook.call("arg1");
    this.hooks.syncWaterfallHook.call("arg2");
    this.hooks.syncLoopHook.call("arg3");
    this.hooks.syncBailHook.call("arg4");
    // callAsync也同步执行，但是可以使用回调函数
    this.hooks.syncHook.callAsync("arg1", () => {
      console.log("callAsync syncHook");
    });

    console.log("====================");

    this.hooks.asyncParallelHook.callAsync("arg1", () => {
      console.log("callAsync asyncParallelHook");
    });
    this.hooks.asyncParallelBailHook.callAsync("arg2", (...args) => {
      console.log("callAsync asyncParallelBailHook", ...args);
    });
    this.hooks.asyncSeriesHook.callAsync("arg3", (...args) => {
      console.log("callAsync asyncSeriesHook", ...args);
    });
    this.hooks.asyncSeriesWaterfallHook.callAsync("arg4", (...args) => {
      console.log("callAsync asyncSeriesWaterfallHook", ...args);
    });
    this.hooks.asyncSeriesBailHook.callAsync("arg5", (...args) => {
      console.log("callAsync asyncSeriesBailHook", ...args);
    });
  }
}

class Synctaps {
  apply(compiler: Compiler) {
    compiler.hooks.syncHook.tap("tap1", (...args) => {
      console.log("syncHook tap1", ...args);
      return true;
    });

    compiler.hooks.syncHook.tap("tap2", (...args) => {
      console.log("syncHook tap2", ...args);
      return true;
    });

    compiler.hooks.syncWaterfallHook.tap("tap3", (...args) => {
      console.log("syncWaterfallHook tap3", ...args);
      return true;
    });

    compiler.hooks.syncWaterfallHook.tap("tap4", (...args) => {
      console.log("syncWaterfallHook tap4 参数应该为true", ...args);
      return true;
    });

    let count = 2;

    compiler.hooks.syncLoopHook.tap("tap5", (...args) => {
      console.log("syncLoopHook tap5", ...args);
      return count-- ? true : undefined;
    });

    compiler.hooks.syncBailHook.tap("tap6", (...args) => {
      console.log("syncBailHook tap6", ...args);
      return true;
    });

    compiler.hooks.syncBailHook.tap("tap7", (...args) => {
      console.log("syncBailHook tap7 不会执行", ...args);
      return true;
    });
  }
}

class Asynctaps {
  apply(compiler: Compiler) {
    const sleep = (ms = 1000) => {
      let timer: NodeJS.Timeout | undefined;

      return new Promise((resolve) => {
        timer = setTimeout(() => {
          resolve("res");
          clearTimeout(timer);
        }, ms);
      });
    };

    compiler.hooks.asyncParallelHook.tapPromise("tap1", async (...args) => {
      await sleep(1000);
      console.log("asyncParallelHook tap1", ...args);
    });

    compiler.hooks.asyncParallelHook.tapPromise("tap2", async (...args) => {
      await sleep(1000);
      console.log("asyncParallelHook tap2", ...args);
    });

    compiler.hooks.asyncParallelBailHook.tapPromise("tap3", async (...args) => {
      await sleep(2000);
      console.log("asyncParallelBailHook tap3", ...args);
      return true;
    });

    compiler.hooks.asyncParallelBailHook.tapPromise("tap4", async (...args) => {
      await sleep(2000);
      console.log("asyncParallelBailHook tap4 会在callAsync后执行", ...args);
      return true;
    });

    compiler.hooks.asyncSeriesHook.tapPromise("tap5", async (...args) => {
      await sleep(3000);
      console.log("asyncSeriesHook tap5", ...args);
    });

    compiler.hooks.asyncSeriesHook.tapPromise("tap6", async (...args) => {
      await sleep(3000);
      console.log("asyncSeriesHook tap6", ...args);
    });

    compiler.hooks.asyncSeriesWaterfallHook.tapPromise(
      "tap7",
      async (...args) => {
        await sleep(7000);
        console.log("asyncSeriesWaterfallHook tap7", ...args);
        return true;
      }
    );

    compiler.hooks.asyncSeriesWaterfallHook.tapPromise(
      "tap8",
      async (...args) => {
        await sleep(7000);
        console.log("asyncSeriesWaterfallHook tap8 参数应该为true", ...args);
        return true;
      }
    );

    compiler.hooks.asyncSeriesBailHook.tapPromise("tap9", async (...args) => {
      await sleep(15000);
      console.log("asyncSeriesBailHook tap9", ...args);
      return true;
    });

    compiler.hooks.asyncSeriesBailHook.tapPromise("tap10", async (...args) => {
      await sleep(15000);
      console.log("asyncSeriesBailHook tap10 不会执行", ...args);
      return true;
    });
  }
}

function createCompiler() {
  const compiler = new Compiler();

  const taps = [new Synctaps(), new Asynctaps()];

  for (const tap of taps) {
    tap.apply(compiler);
  }

  return compiler;
}

createCompiler().run();
