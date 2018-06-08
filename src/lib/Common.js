class ArrayEx {
    constructor() {
        Array.prototype.remove = function (from, to) {
            var rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };

        Array.prototype.removeObj = function (target) {
            console.log("removeObj");
            var index = this.indexOf(target);
            if (index > -1) {
                var result = this.splice(index, 1);
                return result;
            }
            return this;
        };
    }
}

export default new class common {
    constructor() {
        new ArrayEx();
    }
}();