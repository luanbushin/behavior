package game;

import java.util.Dictionary;

public class GameRoom {
	public String roomId;
	public int state;//0 等待 1正在进行
	
	public org.java_websocket.WebSocket[] playerSocket;
	
	private String startpoint;
	private String endpoint;
	
    public GameRoom(String str,org.java_websocket.WebSocket conn,String mstr,String start,String end) {
    	roomId = str;
    	playerSocket = new org.java_websocket.WebSocket[20];
    	playerSocket[0] = conn;
    	
    	startpoint = start;
    	endpoint = end;
    	mapStr = mstr;
		playerSocket[0].send("mapdata,"+roomId+","+mapStr+","+startpoint+","+endpoint);
        //System.out.println("创建房间成功,"+ playerSocket.length);
        //conn.send("creatroomsuccess," + roomId);
        
//        creatBaseMap(_width,_height);
    }
    
    public void joinPlayer(org.java_websocket.WebSocket conn) {
    	if(state != 0) {
    		conn.send("游戏已开始 不能加入");
    		return;
    	}
    	if(getPlayerLength() >= 5) {
    		conn.send("人数已满");
    		return;
    	}
    	int jionIndex = 0;
        for(int i = 0;i<playerSocket.length;i++) {
        	if(playerSocket[i] == null) {
        		jionIndex = i;
        		break;
        	}
        }
    
        String message = "";
        for(int i = 0;i<playerSocket.length;i++) {
        	if(playerSocket[i] == null) {
        		message += 0 + ";";
        	}else {
        		message += 1 + ";";
        	}
        }	
//        playerSocket[0].send("mapdata,"+roomId+","+mapStr);
        conn.send("selfjoinroomsuccess," + roomId + ","+mapStr+","+jionIndex+","+startpoint+","+endpoint);
        
        for(int i = 0;i<playerSocket.length;i++) {
        	if(playerSocket[i] != null) {
        		playerSocket[i].send("otherjoinroomsuccess," + jionIndex);
        	}
        }

        
       	playerSocket[jionIndex] = conn;
    }
    
    
    public void weekto (String str,String str1,org.java_websocket.WebSocket conn) {
    	int playerIndex = 0;
    	for(int i = 0;i<playerSocket.length;i++) {
    		if(conn == playerSocket[i]) {
    			playerIndex = i;
    		}
    	}
		for(int i = 0;i<playerSocket.length;i++) {
		if(playerSocket[i] != null) {
			playerSocket[i].send("weekto,"+ playerIndex +","+ str+","+ str1);
		}
	}
//    	if(conn == playerSocket[0]) {
//    		for(int i = 0;i<playerSocket.length;i++) {
//    			if(playerSocket[i] != null) {
//    				playerSocket[i].send("outHole," + str);
//    			}
//    		}
//    	}else {
//    		for(int i = 0;i<playerSocket.length;i++) {
//    			if(playerSocket[i] != null) {
//    				playerSocket[i].send("hitHole," + str);
//    			}
//    		}
//    	}
    }
    
    
	private int _width = 35;
	private int _height = 40;

	public int[][] maplist;
	public int[][] disposeList;
	public int[][] weekList;
	private void creatBaseMap(int w,int h){
		this.maplist = new int[w*2+1][h*2+1];
		this.disposeList = new int[w*2+1][];
		this.weekList = new int[w*h][];
		for(int i = 0;i < w*2+1;i++){
//			if(this.maplist[i] == null){
//				this.maplist[i] = new Array<number>(h*2+1);
//			}
			for(int j = 0;j<h*2+1;j++){
				if(i%2 == 1&&j%2==1){
					this.maplist[i][j] = 1;
				}else{
					this.maplist[i][j] = 0;	
				}
			}
		}
		
		startpoint = "1;1";
		this.randomDirection(1,1);
//		this.gettargetpoint();
	}

	private void gettargetpoint(){
		double num1 = Math.random();
		if(num1<0.25){
			double num2 = Math.floor(Math.random()*(this._height*2+1));
			this.maplist[0][(int)num2] = 1;
		}else if(num1<0.5){
			double num2 = Math.floor(Math.random()*(this._height*2+1));
			this.maplist[this._width*2][(int)num2] = 1;
		}else if(num1<0.75){
			double num2 = Math.floor(Math.random()*(this._width*2+1));
			this.maplist[(int)num2][0] = 1;
		}else {
			double num2 = Math.floor(Math.random()*(this._width*2+1));
			this.maplist[(int)num2][this._height*2] = 1;
		}
	}
	
	private int runtimes;
	private int weekListLenght = 0;
	private void randomDirection(int x,int y){
		runtimes++;
		System.out.println("运行次数:"+runtimes);
		int[][] maybeList = this.maybeGoList(x,y);
		if(getArrayLength(maybeList)>0){
			double random = Math.floor(Math.random()*getArrayLength(maybeList));
			int[] toarr = maybeList[(int)random];

			System.out.println("随机"+x+"---"+y +"to"+toarr[0]+"----"+toarr[1]+"目标可走"+getArrayLength(maybeGoList(toarr[0],toarr[1])));
			int tox = (toarr[0] - x)/2 + x;
			int toy = (toarr[1] - y)/2 + y;
			this.maplist[tox][toy] = 1;
//			System.out.println("数组"+this.disposeList[toarr[0]]);
			if(this.disposeList[toarr[0]] == null){
				this.disposeList[toarr[0]] = new int[this._height*2+1];
			}
			this.disposeList[toarr[0]][toarr[1]] = 1;
			if(getArrayLength(maybeList)>1){
				this.weekList[weekListLenght] = toarr;
				weekListLenght += 1;
			}
			//this.weekList.push(toarr);
			
			System.out.println("走过"+toarr[0]+"============="+toarr[1]);
			this.randomDirection(toarr[0],toarr[1]);
		}else {
			System.out.println("一条路走到头 ，查看之前的岔道"+ this.weekList.length);
			for(int i = weekListLenght-1;i>=0;i--){
				if(this.weekList[i] != null&&getArrayLength(this.maybeGoList(this.weekList[i][0],this.weekList[i][1]))>0){
					int curx = this.weekList[i][0];
					int cury = this.weekList[i][1];
					if(getArrayLength(this.maybeGoList(this.weekList[i][0],this.weekList[i][1]))==1)
						this.weekList[i] = null;
					this.randomDirection(curx,cury);
					return;
				}
			}
			
			mapStr = "";
			for(int i = 0;i < _width*2+1;i++){
				for(int j = 0;j<_height*2+1;j++){
					mapStr+=maplist[i][j]+";";
				}
				mapStr+="。";
			}
			endpoint = x + ";"+ y;
			playerSocket[0].send("mapdata,"+roomId+","+mapStr+","+startpoint+","+endpoint);
//			System.out.println("生成结束 运行次数"+runtimes);
		}
	}
	private String mapStr;
	
	private int getArrayLength(int[][] arr) {
		if(arr == null)
			return 0;
		for(int i = 0;i<arr.length;i++){
			if(arr[i] == null)
				return i;
		}
		return arr.length;
	}
	private int[][] maybeGoList(int x,int y){
		int[][] maybeList = new int[5][];
		int arrl = 0;
		if(x - 2 > 0){
			if(this.disposeList[x-2] == null ||this.disposeList[x-2][y] == 0) {
				maybeList[arrl] = new int[]{x-2,y};			
				arrl++;
			}
		}
		if(x + 2 < this._width*2+1){
			if(this.disposeList[x+2] == null ||this.disposeList[x+2][y] == 0) {
				maybeList[arrl] = new int[]{x+2,y};	arrl++;
		}
		}
		if(y- 2 > 0){
			if(this.disposeList[x] == null||this.disposeList[x][y-2] == 0) {
				maybeList[arrl] = new int[] {x,y-2};	arrl++;
		}
		}
		if(y + 2 < this._height*2+1){
			if(this.disposeList[x] == null||this.disposeList[x][y+2] == 0) {
				maybeList[arrl] = new int[] {x,y+2};	arrl++;
		}
		}
		if(arrl>0)
		System.out.println("可以走"+maybeList[0][0]+"---"+maybeList[0][1]);
		return maybeList;
	}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public void startgame() {
    	state = 1;
        for(int i = 0;i<playerSocket.length;i++) {
        	if(playerSocket[i] != null) {
        		playerSocket[i].send("startgamesuccess");
        	}
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public int getPlayerLength() {
    	for(int i = 0;i < playerSocket.length;i++) {
    		if(playerSocket[i] == null)
    			return i;
    	}
    	return playerSocket.length;
    }
}
