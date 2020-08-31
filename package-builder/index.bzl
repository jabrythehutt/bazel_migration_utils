load("library.bzl", _library = "library")
load("module_name.bzl", _module_name = "module_name")
load("package_json.bzl", _package_json = "package_json")
load("package.bzl", _package = "package")

package_json = _package_json
module_name = _module_name
library = _library
package = _package