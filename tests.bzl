# This excludes all folders that start with `.` annotation to remove folders like `.github`
directories = native.glob(["*"], exclude_directories = 0, exclude = native.glob(["*", ".*"], exclude_directories = 1))

TEST_GROUPS = {
    name: native.glob([name + "/**/*"])
    for name in directories
}
