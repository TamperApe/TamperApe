export class Test {
    constructor() { }
    resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }
    async asyncCall() {
        console.log('calling');
        var result = await this.resolveAfter2Seconds();
        console.log(result);
        // expected output: "resolved"
    }
    async method2() {
        await this.asyncCall();
    }
}
