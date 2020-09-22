class Singleton {
    private constructor(protected name: string) {}
    private static instance: Singleton;
    public static GetInstance(): Singleton {
        return Singleton.instance || (this.instance = new Singleton('name'));

        // if (!this.instance) {
        //     this.instance = new Singleton();
        // }
        // return this.instance;
    }
}

const instance = Singleton.GetInstance();
const instance2 = Singleton.GetInstance();
console.log(instance, instance2);
