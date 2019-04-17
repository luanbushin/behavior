package com.socket;

import java.util.*;
import org.java_websocket.WebSocket;

/**
 * Created by Administrator on 2016/9/13.
 */
public class WebSocketPool {
    private static final Map<WebSocket, String> userconnections = new HashMap<WebSocket, String>();

    /**
     * ��ȡ�û���
     * @param conn
     * @return
     */
    public static String getUserByKey(WebSocket conn) {
        return userconnections.get(conn);
    }

    /**
     * ��ȡ��������
     * @return
     */
    public static int getUserCount() {
        return userconnections.size();
    }

    /**
     * ��ȡWebSocket
     * @param user
     * @return
     */
    public static WebSocket getWebSocketByUser(String user) {
        Set<WebSocket> keySet = userconnections.keySet();
        synchronized (keySet) {
            for (WebSocket conn : keySet) {
                String cuser = userconnections.get(conn);
                if (cuser.equals(user)) {
                    return conn;
                }
            }
        }
        return null;
    }

    /**
     * �����ӳ����������
     * @param user
     * @param conn
     */
    public static void addUser(String user, WebSocket conn) {
        userconnections.put(conn, user); // �������
    }

    /**
     * ��ȡ���е������û�
     * @return
     */
    public static Collection<String> getOnlineUser() {
        List<String> setUsers = new ArrayList<String>();
        Collection<String> setUser = userconnections.values();
        for (String u: setUser) {
            setUsers.add(u);
        }
        return setUsers;
    }

    /**
     * �Ƴ����ӳ��е�����
     * @param conn
     * @return
     */
    public static boolean removeUser(WebSocket conn) {
        if (userconnections.containsKey(conn)) {
            userconnections.remove(conn); // �Ƴ�����
            return true;
        } else
            return false;
    }

    /**
     * ���ض����û���������
     * @param conn
     * @param message
     */
    public static void sendMessageToUser(WebSocket conn, String message) {
        if (null != conn) {
            conn.send(message);
        }
    }


    public static void sendMessage(String message) {
        Set<WebSocket> keySet = userconnections.keySet();
        synchronized (keySet) {
            for (WebSocket conn : keySet) {
                String user = userconnections.get(conn);
                if (user != null) { conn.send(message);
                }
            }
        }
    }

}
