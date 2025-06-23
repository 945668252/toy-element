// build/vite.es.config.ts
import { defineConfig } from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/vite@5.4.19_@types+node@20.19.0_terser@5.41.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_81cb4b2291e43412c9794ca10eabe6c1/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/vite-plugin-dts@4.5.4_@type_bf2615b48daa897617300aeee3102f5d/node_modules/vite-plugin-dts/dist/index.mjs";
import { includes, filter, map } from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import { readdirSync, readdir } from "fs";
import shell2 from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
import { defer, delay } from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";

// hooksPlugin.ts
import { each, isFunction } from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  afterBuild,
  beforeBuild
}) {
  return {
    name: "custom-hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// build/vite.es.config.ts
import terser from "file:///D:/coding/vue3-component/toy-element/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.42.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\coding\\vue3-component\\toy-element\\packages\\core\\build";
var TRY_MOVE_STYLES_DELAY = 750;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell2.mv("./dist/es/theme", "./dist"));
  });
}
var COMP_NAMES = [
  "Alert",
  "Button",
  "Icon",
  "Input",
  "InputNumber",
  "Radio",
  "Checkbox",
  "Select",
  "Switch",
  "Slider",
  "Table",
  "Tag",
  "Progress",
  "Pagination",
  "Tree",
  "Dropdown",
  "Badge",
  "Card",
  "Collapse",
  "Timeline",
  "Carousel",
  "Modal"
];
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    //显式导入当前 Vite 的 Plugin 类型,版本不兼容，强制转换
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    })
  ],
  build: {
    outDir: "dist/es",
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "../index.ts"),
      name: "toy-element",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";
          if (includes(id, "/packages/hooks")) return "hooks";
          if (includes(id, "/packages/utils") || includes(id, "plugin-vue:export-helper"))
            return "utils";
          for (const item of COMP_NAMES) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYnVpbGQvdml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RpbmdcXFxcdnVlMy1jb21wb25lbnRcXFxcdG95LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kaW5nXFxcXHZ1ZTMtY29tcG9uZW50XFxcXHRveS1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcYnVpbGRcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGluZy92dWUzLWNvbXBvbmVudC90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL2J1aWxkL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQge2luY2x1ZGVzLGZpbHRlcixtYXB9IGZyb20gJ2xvZGFzaC1lcyc7XHJcbmltcG9ydCB7IHJlYWRkaXJTeW5jLCByZWFkZGlyIH0gZnJvbSBcImZzXCI7XHJcbmltcG9ydCAgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcclxuaW1wb3J0IHtkZWZlciwgZGVsYXl9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuaW1wb3J0ICBob29rcyAgZnJvbSBcIi4uL2hvb2tzUGx1Z2luLnRzXCI7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xyXG5cclxuY29uc3QgVFJZX01PVkVfU1RZTEVTX0RFTEFZID0gNzUwIGFzIGNvbnN0O1xyXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiO1xyXG5cclxuZnVuY3Rpb24gbW92ZVN0eWxlcygpIHtcclxuICByZWFkZGlyKFwiLi9kaXN0L2VzL3RoZW1lXCIsIChlcnIpID0+IHtcclxuICAgIGlmIChlcnIpIHJldHVybiBkZWxheShtb3ZlU3R5bGVzLCBUUllfTU9WRV9TVFlMRVNfREVMQVkpO1xyXG4gICAgZGVmZXIoKCkgPT4gc2hlbGwubXYoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgXCIuL2Rpc3RcIikpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vL1x1NTFGRFx1NjU3MFx1NTkwNFx1NzQwNlx1N0VDNFx1NEVGNlx1NTIwNlx1NTMwNVxyXG5mdW5jdGlvbiBnZXREaXJlY3Rvcmllc1N5bmMoYmFzZVBhdGg6IHN0cmluZykge1xyXG4gIGNvbnN0IGVudHJpZXMgPSByZWFkZGlyU3luYyhiYXNlUGF0aCwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pO1xyXG5cclxuICByZXR1cm4gbWFwKFxyXG4gICAgZmlsdGVyKGVudHJpZXMsIChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSksXHJcbiAgICAoZW50cnkpID0+IGVudHJ5Lm5hbWVcclxuICApO1xyXG59XHJcbi8vXHU3RUM0XHU0RUY2XHU1MjA2XHU1MzA1XHJcbmNvbnN0IENPTVBfTkFNRVMgPSBbXHJcbiAgICBcIkFsZXJ0XCIsXHJcbiAgICBcIkJ1dHRvblwiLFxyXG4gICAgXCJJY29uXCIsXHJcbiAgICBcIklucHV0XCIsXHJcbiAgICBcIklucHV0TnVtYmVyXCIsXHJcbiAgICBcIlJhZGlvXCIsXHJcbiAgICBcIkNoZWNrYm94XCIsXHJcbiAgICBcIlNlbGVjdFwiLFxyXG4gICAgXCJTd2l0Y2hcIixcclxuICAgIFwiU2xpZGVyXCIsXHJcbiAgICBcIlRhYmxlXCIsXHJcbiAgICBcIlRhZ1wiLFxyXG4gICAgXCJQcm9ncmVzc1wiLFxyXG4gICAgXCJQYWdpbmF0aW9uXCIsXHJcbiAgICBcIlRyZWVcIixcclxuICAgIFwiRHJvcGRvd25cIixcclxuICAgIFwiQmFkZ2VcIixcclxuICAgIFwiQ2FyZFwiLFxyXG4gICAgXCJDb2xsYXBzZVwiLFxyXG4gICAgXCJUaW1lbGluZVwiLFxyXG4gICAgXCJDYXJvdXNlbFwiLFxyXG4gICAgXCJNb2RhbFwiLFxyXG5dIGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6W3Z1ZSgpLFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIHRzY29uZmlnUGF0aDogXCIuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uXCIsXHJcbiAgICAgICAgICAgIG91dERpcjogXCJkaXN0L3R5cGVzXCIsXHJcbiAgICAgICAgfSkgYXMgUGx1Z2luLC8vXHU2NjNFXHU1RjBGXHU1QkZDXHU1MTY1XHU1RjUzXHU1MjREIFZpdGUgXHU3Njg0IFBsdWdpbiBcdTdDN0JcdTU3OEIsXHU3MjQ4XHU2NzJDXHU0RTBEXHU1MTdDXHU1QkI5XHVGRjBDXHU1RjNBXHU1MjM2XHU4RjZDXHU2MzYyXHJcbiAgICAgICAgaG9va3Moe1xyXG4gICAgICAgICAgICBybUZpbGVzOltcIi4vZGlzdC9lc1wiLCBcIi4vZGlzdC90aGVtZVwiLFwiLi9kaXN0L3R5cGVzXCJdLFxyXG4gICAgICAgICAgICBhZnRlckJ1aWxkOm1vdmVTdHlsZXNcclxuICAgICAgICB9KSxcclxuICAgICAgICB0ZXJzZXIoe1xyXG4gICAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICBzZXF1ZW5jZXM6IGlzUHJvZCxcclxuICAgICAgICAgICAgYXJndW1lbnRzOiBpc1Byb2QsXHJcbiAgICAgICAgICAgIGRyb3BfY29uc29sZTogaXNQcm9kICYmIFtcImxvZ1wiXSxcclxuICAgICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogaXNQcm9kLFxyXG4gICAgICAgICAgICBwYXNzZXM6IGlzUHJvZCA/IDQgOiAxLFxyXG4gICAgICAgICAgICBnbG9iYWxfZGVmczoge1xyXG4gICAgICAgICAgICBcIkBERVZcIjogSlNPTi5zdHJpbmdpZnkoaXNEZXYpLFxyXG4gICAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXHJcbiAgICAgICAgICAgIFwiQFRFU1RcIjogSlNPTi5zdHJpbmdpZnkoaXNUZXN0KSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgICBzZW1pY29sb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXHJcbiAgICAgICAgICAgIGJyYWNlczogIWlzUHJvZCxcclxuICAgICAgICAgICAgYmVhdXRpZnk6ICFpc1Byb2QsXHJcbiAgICAgICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFuZ2xlOiB7XHJcbiAgICAgICAgICAgIHRvcGxldmVsOiBpc1Byb2QsXHJcbiAgICAgICAgICAgIGV2YWw6IGlzUHJvZCxcclxuICAgICAgICAgICAga2VlcF9jbGFzc25hbWVzOiBpc0RldixcclxuICAgICAgICAgICAga2VlcF9mbmFtZXM6IGlzRGV2LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6e1xyXG4gICAgICAgIG91dERpcjonZGlzdC9lcycsXHJcbiAgICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICAgICAgbGliOntcclxuICAgICAgICAgICAgZW50cnk6cmVzb2x2ZShfX2Rpcm5hbWUsJy4uL2luZGV4LnRzJyksXHJcbiAgICAgICAgICAgIG5hbWU6J3RveS1lbGVtZW50JyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6J2luZGV4JyxcclxuICAgICAgICAgICAgZm9ybWF0czpbJ2VzJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6e1xyXG4gICAgICAgIGV4dGVybmFsOltcclxuICAgICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCIsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxyXG4gICAgICAgICAgICBcIkBwb3BwZXJqcy9jb3JlXCIsXHJcbiAgICAgICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBvdXRwdXQ6e1xyXG4gICAgICAgICAgICBhc3NldEZpbGVOYW1lczooYXNzZXRJbmZvKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoYXNzZXRJbmZvLm5hbWU9PT0nc3R5bGUuY3NzJykgcmV0dXJuICdpbmRleC5jc3MnO1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0SW5mby50eXBlID09PSBcImFzc2V0XCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChhc3NldEluZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0aGVtZS9bbmFtZV0uW2V4dF1cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKGlkLCBcIm5vZGVfbW9kdWxlc1wiKSkgcmV0dXJuIFwidmVuZG9yXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVzKGlkLCBcIi9wYWNrYWdlcy9ob29rc1wiKSkgcmV0dXJuIFwiaG9va3NcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZXMoaWQsIFwiL3BhY2thZ2VzL3V0aWxzXCIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZXMoaWQsIFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBDT01QX05BTUVTKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpZC5pbmNsdWRlcyhgL3BhY2thZ2VzL2NvbXBvbmVudHMvJHtpdGVtfWApKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoaW5jbHVkZXMoaWQsIGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIH0sXHJcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RpbmdcXFxcdnVlMy1jb21wb25lbnRcXFxcdG95LWVsZW1lbnRcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY29kaW5nXFxcXHZ1ZTMtY29tcG9uZW50XFxcXHRveS1lbGVtZW50XFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NvZGluZy92dWUzLWNvbXBvbmVudC90b3ktZWxlbWVudC9wYWNrYWdlcy9jb3JlL2hvb2tzUGx1Z2luLnRzXCI7aW1wb3J0IHsgZWFjaCwgaXNGdW5jdGlvbiB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuaW1wb3J0IHNoZWxsIGZyb20gXCJzaGVsbGpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBob29rc1BsdWdpbih7XHJcbiAgcm1GaWxlcyA9IFtdLFxyXG4gIGFmdGVyQnVpbGQsXHJcbiAgYmVmb3JlQnVpbGQsXHJcbn06IHtcclxuICBiZWZvcmVCdWlsZD86IEZ1bmN0aW9uO1xyXG4gIGFmdGVyQnVpbGQ/OiBGdW5jdGlvbjtcclxuICBybUZpbGVzPzogc3RyaW5nW107XHJcbn0pIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogXCJjdXN0b20taG9va3MtcGx1Z2luXCIsXHJcbiAgICBidWlsZFN0YXJ0KCkge1xyXG4gICAgICBlYWNoKHJtRmlsZXMsIChmTmFtZSkgPT4gc2hlbGwucm0oXCItcmZcIiwgZk5hbWUpKTtcclxuICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcclxuICAgIH0sXHJcbiAgICBidWlsZEVuZChlcnI/OiBFcnJvcikge1xyXG4gICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFcsU0FBUyxvQkFBb0I7QUFDM1ksT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFFaEIsU0FBUSxVQUFTLFFBQU8sV0FBVTtBQUNsQyxTQUFTLGFBQWEsZUFBZTtBQUNyQyxPQUFRQSxZQUFXO0FBQ25CLFNBQVEsT0FBTyxhQUFZOzs7QUNSeVQsU0FBUyxNQUFNLGtCQUFrQjtBQUNyWCxPQUFPLFdBQVc7QUFFSCxTQUFSLFlBQTZCO0FBQUEsRUFDbEMsVUFBVSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFDRixHQUlHO0FBQ0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUNYLFdBQUssU0FBUyxDQUFDLFVBQVUsTUFBTSxHQUFHLE9BQU8sS0FBSyxDQUFDO0FBQy9DLGlCQUFXLFdBQVcsS0FBSyxZQUFZO0FBQUEsSUFDekM7QUFBQSxJQUNBLFNBQVMsS0FBYTtBQUNwQixPQUFDLE9BQU8sV0FBVyxVQUFVLEtBQUssV0FBVztBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGOzs7QURaQSxPQUFPLFlBQVk7QUFWbkIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTSx3QkFBd0I7QUFDOUIsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBQ3hDLElBQU0sUUFBUSxRQUFRLElBQUksYUFBYTtBQUN2QyxJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFFeEMsU0FBUyxhQUFhO0FBQ3BCLFVBQVEsbUJBQW1CLENBQUMsUUFBUTtBQUNsQyxRQUFJLElBQUssUUFBTyxNQUFNLFlBQVkscUJBQXFCO0FBQ3ZELFVBQU0sTUFBTUMsT0FBTSxHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFBQSxFQUNuRCxDQUFDO0FBQ0g7QUFZQSxJQUFNLGFBQWE7QUFBQSxF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
