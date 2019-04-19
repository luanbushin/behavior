var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketConnector = (function () {
    function SocketConnector(ip, port) {
        this.initSocket(ip, port);
    }
    SocketConnector.prototype.initSocket = function (ip, port) {
        this._socket = new egret.WebSocket();
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);
        this._socket.connect(ip, port);
    };
    SocketConnector.prototype.onReceiveMessage = function (e) {
        console.log("收到数据");
        var msg = Main.webSocket.readUTF();
        this.onmessage(msg);
    };
    SocketConnector.prototype.onSocketConnect = function (e) {
        console.log("连接成功");
        EngineMain.instance.initmap(MapManager.instance.getMapData(), MapManager.instance.endPoint);
        // this._socket.writeUTF("creatroom,46545");
    };
    SocketConnector.prototype.onmessage = function (str) {
        var messageArr = str.split(",");
        console.log(messageArr[0]);
        switch (messageArr[0]) {
            case "mapdata":
                // EngineMain.instance.initmap(MapManager.instance.getMapData(),MapManager.instance.endPoint);
                break;
        }
    };
    return SocketConnector;
}());
__reflect(SocketConnector.prototype, "SocketConnector");
//# sourceMappingURL=SocketConnector.js.map