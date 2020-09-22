abstract class AbstractDepartment {
    constructor() {}

    protected abstract overrideThis(): void;
}

class DepartmentImpl extends AbstractDepartment {
    constructor() {
        super();
    }
    protected overrideThis() {}
}
