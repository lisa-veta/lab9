package com.example.lab9.model;

public class Item {
    private int id;
    private String text;
    private boolean isMarked;

    public Item(int id, String text) {
        this.id = id;
        this.text = text;
        isMarked = false;
    }
    public void setMarked() {
        isMarked = !isMarked;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public boolean getIsMarked() {
        return isMarked;
    }
}
