package(default_visibility = ["//visibility:public"])
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "lib",
    srcs = glob(["**/*.ts"]),
    deps = [
        "@npm//@types/node",
        "@npm//@types/yargs",
        "@npm//yargs",
    ],
)

load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

nodejs_binary(
    name = "bin",
    data = [
        ":lib",
        "@npm//source-map-support",
    ],
    entry_point = ":index.ts",
)
