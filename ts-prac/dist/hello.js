var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Hello = (function () {
    function Hello(message, name) {
        this.msg = message;
        this.name = name;
    }
    Hello.prototype.say = function () {
        return 'Hello' + this.msg;
    };
    Hello.prototype.alertName = function (name) {
        alert(this.name + " " + name);
    };
    return Hello;
}());
var MiniHello = (function (_super) {
    __extends(MiniHello, _super);
    function MiniHello(msg, name) {
        return _super.call(this, msg, name) || this;
    }
    MiniHello.prototype.head = function () {
        var a = _super.prototype.say.call(this);
        return a;
    };
    return MiniHello;
}(Hello));
//# sourceMappingURL=hello.js.map