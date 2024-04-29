package com.example.lab9.controller;

import com.example.lab9.model.Item;
import com.example.lab9.service.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemsViewController {
    @Autowired
    private ItemsService itemsService;


    @ResponseBody
    @GetMapping
    public List<Item> getAllProducts() {
        return itemsService.getItems();
    }

    @ResponseBody
    @PostMapping
    public Item addItem(@RequestBody Item product) {
        Item item = itemsService.addItem(product.getText());
        return item;
    }

    @ResponseBody
    @PutMapping("/{id}")
    public Item markAsBought(@PathVariable int id) {
        return itemsService.setMark(id);
    }

    @ResponseBody
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        itemsService.deleteItem(id);
    }
}
