/*global

 */
new class helloworld {
    constructor() {
        this.name = 'helloworld';
        this.version = '1.0';
        this.run_at = ["document_start", "document_domloaded"];
        this.includes = ['.*://.*baidu.*'];
    }

    get_Script() {
        return function () {
            function test(type) {
                alert('hello ' + type);
            }
        }
    }

    run_Script(type) {
        return function () {
            test(type);
        }
    }
}()