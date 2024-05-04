package com.example.lab9.controller;

import com.example.lab9.model.Item;
import com.example.lab9.service.ItemsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemsViewController {

    @Autowired
    private ItemsService itemsService;


    @GetMapping
    public List<Item> getAllProducts() {
        return itemsService.getItems();
    }


    @PostMapping
    public Item addItem(@RequestBody JSONObject object) {
        Item item = itemsService.addItem((object.getAsString("text")));
        return item;
    }


    @PutMapping("/{id}")
    public Item markAsBought(@PathVariable int id) {
        return itemsService.setMark(id);
    }


    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        itemsService.deleteItem(id);
    }
}
