load("@npm//@bazel/typescript:index.bzl", "ts_library")
load("module_name.bzl", "module_name")

def library(srcs, scope, deps = [], devmode_module = "commonjs", devmode_target = "es5", **kwargs):
    name = native.package_name()
    ts_library(
        name = name,
        module_name = module_name(scope),
        srcs = srcs,
        deps = deps,
        devmode_module = devmode_module,
        devmode_target = devmode_target,
        **kwargs
    )