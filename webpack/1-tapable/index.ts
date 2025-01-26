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
    // 同步顺序执行plugin
    syncHook: new SyncHook(["string"]),
    // 同步顺序执行plugin，plugin返回值非undefined则中断
    syncBailHook: new SyncBailHook(["string"]),
    // 同步顺序执行plugin，plugin返回值作为下一个plugin参数
    syncWaterfallHook: new SyncWaterfallHook(["string"]),
    // 同步顺序执行plugin，plugin返回非undefined则重复执行
    syncLoopHook: new SyncLoopHook(["string"]),

    // 异步并发执行plugin
    asyncParallelHook: new AsyncParallelHook(["string"]),
    // 异步并发执行plugin，plugin里面第一个返回值非undefined则执行callAsync回调，其他plugin仍然执行
    asyncParallelBailHook: new AsyncParallelBailHook(["string"]),
    // 异步串行执行plugin
    asyncSeriesHook: new AsyncSeriesHook(["string"]),
    // 异步串行执行plugin，plugin返回值非undefined则中断
    asyncSeriesBailHook: new AsyncSeriesBailHook(["string"]),
    // 异步串行执行plugin，plugin返回值作为下一个plugin参数
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

class SyncPlugins {
  apply(compiler: Compiler) {
    compiler.hooks.syncHook.tap("plugin1", (...args) => {
      console.log("syncHook plugin1", ...args);
      return true;
    });

    compiler.hooks.syncHook.tap("plugin2", (...args) => {
      console.log("syncHook plugin2", ...args);
      return true;
    });

    compiler.hooks.syncWaterfallHook.tap("plugin3", (...args) => {
      console.log("syncWaterfallHook plugin3", ...args);
      return true;
    });

    compiler.hooks.syncWaterfallHook.tap("plugin4", (...args) => {
      console.log("syncWaterfallHook plugin4 参数应该为true", ...args);
      return true;
    });

    let count = 2;

    compiler.hooks.syncLoopHook.tap("plugin5", (...args) => {
      console.log("syncLoopHook plugin5", ...args);
      return count-- ? true : undefined;
    });

    compiler.hooks.syncBailHook.tap("plugin6", (...args) => {
      console.log("syncBailHook plugin6", ...args);
      return true;
    });

    compiler.hooks.syncBailHook.tap("plugin7", (...args) => {
      console.log("syncBailHook plugin7 不会执行", ...args);
      return true;
    });
  }
}

class AsyncPlugins {
  apply(compiler: Compiler) {
    const sleep = (ms = 1000) => {
      let timer: number | undefined;

      return new Promise((resolve) => {
        timer = setTimeout(() => {
          resolve("res");
          clearTimeout(timer);
        }, ms);
      });
    };

    compiler.hooks.asyncParallelHook.tapPromise("plugin1", async (...args) => {
      await sleep(1000);
      console.log("asyncParallelHook plugin1", ...args);
    });

    compiler.hooks.asyncParallelHook.tapPromise("plugin2", async (...args) => {
      await sleep(1000);
      console.log("asyncParallelHook plugin2", ...args);
    });

    compiler.hooks.asyncParallelBailHook.tapPromise(
      "plugin3",
      async (...args) => {
        await sleep(2000);
        console.log("asyncParallelBailHook plugin3", ...args);
        return true;
      }
    );

    compiler.hooks.asyncParallelBailHook.tapPromise(
      "plugin4",
      async (...args) => {
        await sleep(2000);
        console.log(
          "asyncParallelBailHook plugin4 会在callAsync后执行",
          ...args
        );
        return true;
      }
    );

    compiler.hooks.asyncSeriesHook.tapPromise("plugin5", async (...args) => {
      await sleep(3000);
      console.log("asyncSeriesHook plugin5", ...args);
    });

    compiler.hooks.asyncSeriesHook.tapPromise("plugin6", async (...args) => {
      await sleep(3000);
      console.log("asyncSeriesHook plugin6", ...args);
    });

    compiler.hooks.asyncSeriesWaterfallHook.tapPromise(
      "plugin7",
      async (...args) => {
        await sleep(7000);
        console.log("asyncSeriesWaterfallHook plugin7", ...args);
        return true;
      }
    );

    compiler.hooks.asyncSeriesWaterfallHook.tapPromise(
      "plugin8",
      async (...args) => {
        await sleep(7000);
        console.log("asyncSeriesWaterfallHook plugin8 参数应该为true", ...args);
        return true;
      }
    );

    compiler.hooks.asyncSeriesBailHook.tapPromise(
      "plugin9",
      async (...args) => {
        await sleep(15000);
        console.log("asyncSeriesBailHook plugin9", ...args);
        return true;
      }
    );

    compiler.hooks.asyncSeriesBailHook.tapPromise(
      "plugin10",
      async (...args) => {
        await sleep(15000);
        console.log("asyncSeriesBailHook plugin10 不会执行", ...args);
        return true;
      }
    );
  }
}

function createCompiler() {
  const compiler = new Compiler();

  const plugins = [new SyncPlugins(), new AsyncPlugins()];

  for (const plugin of plugins) {
    plugin.apply(compiler);
  }

  return compiler;
}

createCompiler().run();
