const { build, buildSync } = require('esbuild');

async function runBuild() {
  // 异步方法，返回一个 Promise
  /**
   * buildSync 只需要把build 替换为buildSync
   * 但我并不推荐大家使用 buildSync 这种同步的 API，它们会导致两方面不良后果
   * 一方面容易使 Esbuild 在当前线程阻塞，丧失并发任务处理的优势
   * 另一方面，Esbuild 所有插件中都不能使用任何异步操作，这给插件开发增加了限制
   */
  const result = await build({
    // ----  如下是一些常见的配置  ---
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为一个数组
    entryPoints: ['./src/index.jsx'],
    // 打包产物目录
    outdir: 'dist',
    // 是否需要打包，一般设为 true
    bundle: true,
    // 模块格式，包括`esm`、`commonjs`和`iife`
    format: 'esm',
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true, // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      '.png': 'base64',
    },
  });
  console.log(result);
}

runBuild();
