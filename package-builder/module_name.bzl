def module_name(scope):
    lib_name = native.package_name()
    return scope + "/" + lib_name