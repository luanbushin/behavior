class SocketConnector {

	public _socket:egret.WebSocket;
	
	public constructor(ip,port) {
		this.initSocket(ip,port);
	}

	private initSocket(ip,port):void{
        this._socket = new egret.WebSocket();        
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);                            
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketConnect, this);    
        this._socket.connect(ip,port);

	}

	private onReceiveMessage(e:egret.Event):void {   
   		console.log("收到数据");   
		var msg = Main.webSocket.readUTF(); 
		this.onmessage(msg);   
	}
	private onSocketConnect(e:egret.Event):void{
		console.log("连接成功");    
		EngineMain.instance.initmap(MapManager.instance.getMapData(),MapManager.instance.endPoint);
		// this._socket.writeUTF("creatroom,46545");
	}

    private onmessage(str:string){
        var messageArr:string[] = str.split(",");

       console.log(messageArr[0]);
        switch(messageArr[0]){
            case "mapdata":
			// EngineMain.instance.initmap(MapManager.instance.getMapData(),MapManager.instance.endPoint);
			break;
		}
	}

   
}