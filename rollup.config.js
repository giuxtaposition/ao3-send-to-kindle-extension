import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-css-only"
import livereload from "rollup-plugin-livereload"
import svelte from "rollup-plugin-svelte"
import { terser } from "rollup-plugin-terser"
import sveltePreprocess from "svelte-preprocess"

const production = !process.env.ROLLUP_WATCH

function serve() {
    let server

    function toExit() {
        if (server) server.kill(0)
    }

    return {
        writeBundle() {
            if (server) return
            server = require("child_process").spawn(
                "yarn",
                ["start", "--dev"],
                {
                    stdio: ["ignore", "inherit", "inherit"],
                    shell: true,
                }
            )

            process.on("SIGTERM", toExit)
            process.on("exit", toExit)
        },
    }
}

export default [
    {
        input: "src/layouts/Popup/popup.ts",
        output: {
            sourcemap: true,
            format: "iife",
            name: "app",
            dir: "public/build/",
        },
        plugins: [
            svelte({
                preprocess: sveltePreprocess({ sourceMap: !production }),
                compilerOptions: {
                    dev: !production,
                },
            }),
            css({ output: "popup.css" }),
            resolve({
                browser: true,
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }),
            !production && serve(),
            !production && livereload("public"),
            production && terser(),
        ],
        watch: {
            clearScreen: false,
        },
    },
    {
        input: "src/layouts/Works/works.ts",
        output: {
            sourcemap: true,
            format: "iife",
            name: "app",
            dir: "public/build/",
        },
        plugins: [
            svelte({
                preprocess: sveltePreprocess({ sourceMap: !production }),
                compilerOptions: {
                    dev: !production,
                },
            }),
            css({ output: "works.css" }),
            resolve({
                browser: true,
                dedupe: ["svelte"],
            }),
            commonjs(),
            typescript({
                sourceMap: !production,
                inlineSources: !production,
            }),
            !production && serve(),
            !production && livereload("public"),
            production && terser(),
        ],
        watch: {
            clearScreen: false,
        },
    },
]
