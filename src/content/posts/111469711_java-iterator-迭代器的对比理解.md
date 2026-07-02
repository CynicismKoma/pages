---
title: "java Iterator 迭代器的对比理解"
pubDatetime: 2020-12-21T11:10:32.000Z
description: "文章浏览阅读187次。public static void main(String[] args){        List<Integer> list = new ArrayList<>();        list.add(5);        list.add(23);        list.add(42);        for (int i = 0; i < list.size(); "
tags: []
draft: false
---

[code]
    public static void main(String[] args){
            List<Integer> list = new ArrayList<>();
            list.add(5);
            list.add(23);
            list.add(42);
    
            for (int i = 0; i < list.size(); i++) {
                System.out.print(list.get(i) + ",");
            }
    
            System.out.print("==============================");
    
            Iterator it = list.iterator();
            while (it.hasNext()) {
                System.out.print(it.next() + ",");
            }
    
            System.out.print("==============================");
    
            for (Integer i : list) {
                System.out.print(i + ",");
            }
        }
[/code]

导入的包为：
[code] 
    import java.util.ArrayList;
    import java.util.Iterator;
    import java.util.List;
[/code]
