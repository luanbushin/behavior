package com.socket;

import org.java_websocket.WebSocketImpl;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import game.GameMain;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;

/**
 * Created by Administrator on 2016/9/13.
 */
public class WebSocket extends WebSocketServer {

    int j=0;
    int h=0;
    int e=0;
    int l=0;

    public WebSocket(InetSocketAddress address) {
        super(address);
        System.out.println("地址" + address);
    }

    public WebSocket(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
        System.out.println("端口" + port);
    }

    /**
     * 触发连接事件
     * @param conn
     * @param handshake
     */
    @Override
    public void onOpen(org.java_websocket.WebSocket conn, ClientHandshake handshake) {
        System.out.println("有人连接Socket conn:" + conn);
        l++;
    }

    /**
     * 触发关闭事件
     * @param conn
     * @param message
     * @param reason
     * @param remote
     */
    @Override
    public void onClose(org.java_websocket.WebSocket conn, int message, String reason, boolean remote) {
        userLeave(conn);
    }


    /**
     * 触发异常事件
     * @param conn
     * @param message
     */
    @Override
    public void onError(org.java_websocket.WebSocket conn, Exception message) {
        userLeave(conn);
        System.out.println("Socket异常:" + message.toString());
        e++;
    }

    /**
     * 用户下线处理
     * @param conn
     */
    public void userLeave(org.java_websocket.WebSocket conn) {
        String user = WebSocketPool.getUserByKey(conn);
        boolean b = WebSocketPool.removeUser(conn); // 在连接池中移除连接
        if (b) {
            WebSocketPool.sendMessage(user); // 把当前用户从所有在线用户列表中删除
            String leaveMsg = "[系统]" + user + "下线了";
            WebSocketPool.sendMessage(leaveMsg); // 向在线用户发送当前用户退出的信息
        }
    }
    /**
     * 客户端发送消息到服务器是触发事件
     * @param conn
     * @param message
     */
    @Override
    public void onMessage(org.java_websocket.WebSocket conn, String message) {
        if(message != null) {
            //将用户加入
            //this.userJoin(message, conn);
        	GameMain.newInstance().onMessage(conn, message);
        }
    }

    public void userJoin(String user, org.java_websocket.WebSocket conn) {
        WebSocketPool.sendMessage(user); // 把当前用户加入到所有在线用户列表中
        //String joinMsg = "[系统]" + user + "上线了！";
        WebSocketPool.sendMessage(user); // 向所有在线用户推送当前用户上线的消息
        WebSocketPool.addUser(user, conn); // 向连接池添加当前的连接的对象
        WebSocketPool.sendMessageToUser(conn, WebSocketPool.getOnlineUser().toString());
        // 向当前连接发送当前在线用户的列表
    }

    public static void main(String[] args) throws InterruptedException{
        System.out.println("开始启动webSocket");
        WebSocketImpl.DEBUG = false;
        int port = 4788; // 端口随便设置，只要不跟现有端口重复就可以了
        WebSocket s =null;
        try {
            s = new WebSocket(port);
            s.start();
        } catch (UnknownHostException e1) {
            System.out.println("启动webSocket失败！");
            e1.printStackTrace();
        }
        System.out.println("启动webSocket成功！");
    }
}
