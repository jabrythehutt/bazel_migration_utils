package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

all_sources = ["**/*.ts"]

all_tests = [
    "**/*.spec.ts",
    "**/test/**",
]

module_name = "@djabry/json-value-extractor"
npm_deps = [
    "@npm//jsonpath",
    "@npm//yargs",
]

ts_library(
    name = "lib",
    srcs = glob(
        all_sources,
        exclude = all_tests,
    ),
    module_name = module_name,
    deps = [
        "@npm//@types/node",
        "@npm//@types/yargs",
    ] + npm_deps,
)

ts_library(
    name = "test_lib",
    srcs = glob(all_tests),
    deps = [
        ":lib",
        "@npm//@types/chai",
        "@npm//@types/jasmine",
        "@npm//chai",
    ],
)

load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

jasmine_node_test(
    name = "test",
    deps = [
        ":test_lib",
        "@npm//chai",
        "@npm//jasmine",
    ],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

nodejs_binary(
    name = "bin",
    bootstrap = ["source-map-support/register"],
    data = [
        ":lib",
        "@npm//source-map-support",
    ],
    entry_point = ":index.ts",
)

load("//npm:package.bzl", "enhanced_npm_package")
load("//:version.bzl", "VERSION")

enhanced_npm_package(
    name = "package",
    srcs = [
        "README.md"
    ],
    version = VERSION,
    module_name = module_name,
    root_package_json = "//:package.json",
    npm_deps = npm_deps,
    package_layers = [
        "//:common.package.json",
        ":json-value-extractor.package.json"
    ],
    deps = [":lib"],
)

