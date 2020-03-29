package com.serafimodin.chatboot.models;

public class Message {

    public enum MessageType {
        JOIN,
        LEAVE,
        CHAT
    }

    private final String content;

    private final String senderName;

    private final MessageType type;

    public MessageType getType() {
        return type;
    }

    public Message(String content, String sender, MessageType type) {
        this.content = content;
        this.senderName = sender;
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public String getSenderName() {
        return senderName;
    }
}
