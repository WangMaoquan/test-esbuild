const { transform, transformSync } = require('esbuild');

async function runTransform() {
  // 第一个参数是代码字符串，第二个参数为编译配置
  const content = await transform(
    'const isNull = (str: string): boolean => str.length > 0;',
    {
      sourcemap: true,
      loader: 'tsx',
    },
  );
  console.log(content);
}

/**
 * 不过由于同步的 API 会使 Esbuild 丧失并发任务处理的优势（Build API的部分已经分析过
 * 我同样也不推荐大家使用transformSync。出于性能考虑
 * Vite 的底层实现也是采用 transform这个异步的 API 进行 TS 及 JSX 的单文件转译的
 */

function runTransformSync() {
  /* 参数和 transform 相同 */
  const content = transformSync(
    'const isNull = (str: string): boolean => str.length > 0;',
    {
      sourcemap: true,
      loader: 'tsx',
    },
  );
  console.log(content);
}

runTransform();
