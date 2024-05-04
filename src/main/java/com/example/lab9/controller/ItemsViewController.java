package com.example.lab9.controller;

import com.example.lab9.model.Item;
import com.example.lab9.service.ItemsService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public HttpStatus addItem(@RequestBody JSONObject object) {
        Item item = itemsService.addItem((object.getAsString("text")));
        return HttpStatus.OK;
    }

    @PutMapping("/{id}")
    public HttpStatus markAsBought(@PathVariable int id) {
        itemsService.setMark(id);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}")
    public HttpStatus deleteProduct(@PathVariable int id) {
        itemsService.deleteItem(id);
        return HttpStatus.OK;
    }
}
