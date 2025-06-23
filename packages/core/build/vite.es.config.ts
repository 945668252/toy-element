import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import dts from 'vite-plugin-dts'
import type { Plugin } from 'vite'
import {includes,filter,map} from 'lodash-es';
import { readdirSync, readdir } from "fs";
import  shell from "shelljs";
import {defer, delay} from "lodash-es";
import  hooks  from "../hooksPlugin.ts";
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

const TRY_MOVE_STYLES_DELAY = 750 as const;
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
}

//函数处理组件分包
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
//组件分包
const COMP_NAMES = [
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
    "Modal",
] as const;

export default defineConfig({
    plugins:[
        vue(),
        visualizer({
            filename:'dist/stats.es.html'
        }),
        dts({
            tsconfigPath: "../../tsconfig.build.json",
            outDir: "dist/types",
        }) as Plugin,//显式导入当前 Vite 的 Plugin 类型,版本不兼容，强制转换
        hooks({
            rmFiles:["./dist/es", "./dist/theme","./dist/types"],
            afterBuild:moveStyles
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
            "@TEST": JSON.stringify(isTest),
            },
        },
        format: {
            semicolons: false,
            shorthand: isProd,
            braces: !isProd,
            beautify: !isProd,
            comments: !isProd,
        },
        mangle: {
            toplevel: isProd,
            eval: isProd,
            keep_classnames: isDev,
            keep_fnames: isDev,
        },
        }),
    ],
    build:{
        outDir:'dist/es',
        cssCodeSplit: true,
        minify: false,
        lib:{
            entry:resolve(__dirname,'../index.ts'),
            name:'toy-element',
            fileName:'index',
            formats:['es']
        },
        rollupOptions:{
        external:[
            'vue',
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/vue-fontawesome",
            "@popperjs/core",
            "async-validator",
        ],
        output:{
            assetFileNames:(assetInfo)=>{
                if(assetInfo.name==='style.css') return 'index.css';
                if (
                    assetInfo.type === "asset" &&
                    /\.(css)$/i.test(assetInfo.name as string)
                ) {
                    return "theme/[name].[ext]";
                }
                return assetInfo.name as string;
            },
            manualChunks(id) {
                if (includes(id, "node_modules")) return "vendor";

                if (includes(id, "/packages/hooks")) return "hooks";

                if (
                    includes(id, "/packages/utils") ||
                    includes(id, "plugin-vue:export-helper")
                )
                    return "utils";

                for(const item of COMP_NAMES){
                    if(id.includes(`/packages/components/${item}`)){
                        return item;
                    }
                }
                // for (const item of getDirectoriesSync("../components")) {
                //     if (includes(id, `/packages/components/${item}`)) return item;
                // }
            },
        }
    }
    },
})