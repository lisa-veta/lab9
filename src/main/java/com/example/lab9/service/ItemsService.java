package com.example.lab9.service;

import org.springframework.stereotype.Service;
import com.example.lab9.model.Item;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class ItemsService {
    public List<Item> items = new ArrayList<>();
    int counter = 1;

    public Item addItem(String text){
        counter++;
        Item item = new Item(counter, text);
        items.add(item);
        return item;
    }
    public List<Item> getItems(){
        return items;
    }

    public Item setMark(int id){
        Item item = getItemById(id);
        item.setMarked();
        return item;
    }

    public Item getItemById(int id){
        List<Item> newItems = new ArrayList<>();
        for (Item item : items) {
            if (item.getId() == id) {
                newItems.add(item);
            }
        }
        if (!newItems.isEmpty()) {
            return newItems.get(0);
        }
        return null;
    }

    public void deleteItem(int id){
        items.remove(getItemById(id));
        counter--;
    }
}
