package game;

public class GameMain {
	private GameRoom[] roomList;
	
    public void onMessage(org.java_websocket.WebSocket conn, String message) {
        if(message != null) {
            String[] messagelist = message.split(",");
            
            switch(messagelist[0]) {
            	case "creatroom":
            		creatroom(messagelist[1],conn,messagelist[2],messagelist[3],messagelist[4]);
            	break;
             	case "jionroom":
             		jionroom(messagelist[1],conn);
                	break;
             	case "startgame":
             		startgame(messagelist[1]);
             		break;
             	case "week":
             		weekto(messagelist[1],messagelist[2],messagelist[3],conn);
             		break;
            }
        }
    }
    public void weekto(String str,String str1,String str2,org.java_websocket.WebSocket conn) {
    	if(getGameRoomByID(str) != null) {
    		getGameRoomByID(str).weekto(str1,str2,conn);
    	}
    }
    public void creatroom(String str,org.java_websocket.WebSocket conn,String str1,String str2,String str3) {
    	if(getGameRoomByID(str) == null) {
    		try {
    			this.roomList[getRoomLenght()] = new GameRoom(str,conn,str1,str2,str3);
    		}catch(Exception e){
	    		System.out.println("穿件房间失败");
    		}
    	}
    	else {
    		getGameRoomByID(str).joinPlayer(conn);
    		conn.send("房间ID已存在进入房间");
    	}
    }
    
    public void jionroom(String str,org.java_websocket.WebSocket conn) {
    	if(getGameRoomByID(str) != null) {
    		getGameRoomByID(str).joinPlayer(conn);
    	}
    }
    
    public void startgame(String str) {
    	getGameRoomByID(str).startgame();
    }
    
    
    
    public GameRoom getGameRoomByID(String str){
    	for(int i = 0;i < getRoomLenght();i++) {
    		if(roomList[i] != null) {
    			if(roomList[i].roomId.equals(str)) {
    				return roomList[i];
    			}
    		}
    	}
    	return null;
    }
    
    
    
    
    
    public GameMain() {
    	roomList = new GameRoom[100];
    	
    }
    private int getRoomLenght() {
    	for(int i = 0;i < roomList.length;i++) {
    		if(roomList[i] == null)
    			return i;
    	}
    	return roomList.length;
    }
    
	private static GameMain instance = null; 

	public static GameMain newInstance(){  
	   if(null == instance){  
	       instance = new GameMain();  
	   }  
	   return instance;  
	} 
}
