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
        System.out.println("��ַ" + address);
    }

    public WebSocket(int port) throws UnknownHostException {
        super(new InetSocketAddress(port));
        System.out.println("�˿�" + port);
    }

    /**
     * ���������¼�
     * @param conn
     * @param handshake
     */
    @Override
    public void onOpen(org.java_websocket.WebSocket conn, ClientHandshake handshake) {
        System.out.println("��������Socket conn:" + conn);
        l++;
    }

    /**
     * �����ر��¼�
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
     * �����쳣�¼�
     * @param conn
     * @param message
     */
    @Override
    public void onError(org.java_websocket.WebSocket conn, Exception message) {
        userLeave(conn);
        System.out.println("Socket�쳣:" + message.toString());
        e++;
    }

    /**
     * �û����ߴ���
     * @param conn
     */
    public void userLeave(org.java_websocket.WebSocket conn) {
        String user = WebSocketPool.getUserByKey(conn);
        boolean b = WebSocketPool.removeUser(conn); // �����ӳ����Ƴ�����
        if (b) {
            WebSocketPool.sendMessage(user); // �ѵ�ǰ�û������������û��б���ɾ��
            String leaveMsg = "[ϵͳ]" + user + "������";
            WebSocketPool.sendMessage(leaveMsg); // �������û����͵�ǰ�û��˳�����Ϣ
        }
    }
    /**
     * �ͻ��˷�����Ϣ���������Ǵ����¼�
     * @param conn
     * @param message
     */
    @Override
    public void onMessage(org.java_websocket.WebSocket conn, String message) {
        if(message != null) {
            //���û�����
            //this.userJoin(message, conn);
        	GameMain.newInstance().onMessage(conn, message);
        }
    }

    public void userJoin(String user, org.java_websocket.WebSocket conn) {
        WebSocketPool.sendMessage(user); // �ѵ�ǰ�û����뵽���������û��б���
        //String joinMsg = "[ϵͳ]" + user + "�����ˣ�";
        WebSocketPool.sendMessage(user); // �����������û����͵�ǰ�û����ߵ���Ϣ
        WebSocketPool.addUser(user, conn); // �����ӳ���ӵ�ǰ�����ӵĶ���
        WebSocketPool.sendMessageToUser(conn, WebSocketPool.getOnlineUser().toString());
        // ��ǰ���ӷ��͵�ǰ�����û����б�
    }

    public static void main(String[] args) throws InterruptedException{
        System.out.println("��ʼ����webSocket");
        WebSocketImpl.DEBUG = false;
        int port = 4788; // �˿�������ã�ֻҪ�������ж˿��ظ��Ϳ�����
        WebSocket s =null;
        try {
            s = new WebSocket(port);
            s.start();
        } catch (UnknownHostException e1) {
            System.out.println("����webSocketʧ�ܣ�");
            e1.printStackTrace();
        }
        System.out.println("����webSocket�ɹ���");
    }
}
