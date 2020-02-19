def archive(name, srcs):
    native.genrule(
        name = name,
        srcs = srcs,
        outs = [name + ".tgz"],
        cmd = "tar -cvzf $(location {name}.tgz) -C $(location :{name})/.. --dereference {name}"
            .format(name = name),
    )