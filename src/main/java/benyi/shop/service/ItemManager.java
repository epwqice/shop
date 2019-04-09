package benyi.shop.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;

import benyi.shop.db.ItemRepository;
import benyi.shop.model.ItemModel;
import benyi.shop.model.ItemModels;

@Component
public class ItemManager {
	
	@Autowired
	private ItemRepository itemRep;
	
	private ItemModel createAppleItem() {
    	ItemModel item1 = new ItemModel();
    	item1.setId(UUID.randomUUID().toString());
    	item1.setName("苹果");
    	item1.setOldPrice(10);
    	item1.setPrice(4.5);
    	item1.setUnit("/斤");
    	item1.setPicture("/image/apple.jpg");
    	
    	return item1;
    }
    
    private ItemModel createOrangeItem(int i) {
    	ItemModel item2 = new ItemModel();
//    	item2.setId(UUID.randomUUID().toString());
    	item2.setId("item" + i);
    	item2.setName(i % 2 == 0 ? "橘子" : "苹果");
    	double oldPrice = Math.min(Math.random() * 100, 10);
    	item2.setOldPrice(oldPrice);
    	item2.setPrice(Math.min(oldPrice - 1, 0.01));
    	item2.setUnit("/斤");
    	item2.setPicture(i % 2 == 0 ? "/image/orange.jpg" : "/image/apple.jpg");
    	
    	return item2;
    }
    
    public void init() {
//    	ItemModels itemModel1 = new ItemModels();
//    	ItemModels itemModel2 = new ItemModels();
//    	ItemModels itemModel3 = new ItemModels();
//    	ItemModels itemModel4 = new ItemModels();
//    	ItemModels itemModel5 = new ItemModels();
//    	ItemModels itemModel6 = new ItemModels();
//    	ItemModels itemModel7 = new ItemModels();
//    	ItemModels itemModel8 = new ItemModels();
//    	ItemModels itemModel9 = new ItemModels();
//    	ItemModels itemModel10 = new ItemModels();
//    	ItemModels itemModel11 = new ItemModels();
//    	ItemModels itemModel12 = new ItemModels();
//    	
//    	itemModel1.setDatas(new HashMap<>());
//    	itemModel2.setDatas(new HashMap<>());
//    	itemModel3.setDatas(new HashMap<>());
//    	itemModel4.setDatas(new HashMap<>());
//    	itemModel5.setDatas(new HashMap<>());
//    	itemModel6.setDatas(new HashMap<>());
//    	itemModel7.setDatas(new HashMap<>());
//    	itemModel8.setDatas(new HashMap<>());
//    	itemModel9.setDatas(new HashMap<>());
//    	itemModel10.setDatas(new HashMap<>());
//    	itemModel11.setDatas(new HashMap<>());
//    	itemModel12.setDatas(new HashMap<>());
//    	
//    	itemModel1.getDatas().put("item1", createAppleItem());
//    	itemModel2.getDatas().put("item2", createOrangeItem());
//    	itemModel3.getDatas().put("item3", createAppleItem());
//    	itemModel4.getDatas().put("item4", createOrangeItem());
//    	itemModel5.getDatas().put("item5", createAppleItem());
//    	itemModel6.getDatas().put("item6", createOrangeItem());
//    	itemModel7.getDatas().put("item7", createAppleItem());
//    	itemModel8.getDatas().put("item8", createOrangeItem());
//    	itemModel9.getDatas().put("item9", createAppleItem());
//    	itemModel10.getDatas().put("item10", createOrangeItem());
//    	itemModel11.getDatas().put("item11", createAppleItem());
//    	itemModel12.getDatas().put("item12", createOrangeItem());
//    	itemRep.insert(itemModel1);
//    	itemRep.insert(itemModel2);
//    	itemRep.insert(itemModel3);
//    	itemRep.insert(itemModel4);
//    	itemRep.insert(itemModel5);
//    	itemRep.insert(itemModel6);
//    	itemRep.insert(itemModel7);
//    	itemRep.insert(itemModel8);
//    	itemRep.insert(itemModel9);
//    	itemRep.insert(itemModel10);
//    	itemRep.insert(itemModel11);
    	for (int i = 0;i < 100;i++) {
    		itemRep.insert(createOrangeItem(i));
    	}
    }
    
    /**
     * 分页查询
     * @param order 排序：asc/desc
     * @param orderBy 排序字段
     * @param perPage 每页数量
     * @param page 第几页，0计数
     * @return 查询结果
     */
    public ItemModels queryItems(String order, String orderBy, Integer perPage, Integer page) {
    	Pageable pageReq;
    	List<ItemModel> qResult;
    	ItemModels itemModel = new ItemModels();
    	// 全量查询
    	if (perPage == null) {
    		qResult = itemRep.findAll();
    	} else {
    		// 只分页不排序
    		if (order == null) {
    			pageReq = PageRequest.of(page, perPage);
    		} else { // 分页排序查询
    			Direction direction = "asc".equals(order.toLowerCase()) ? Direction.ASC : Direction.DESC;
    			Sort sort = Sort.by(direction, orderBy);
    			pageReq = PageRequest.of(page, perPage, sort);
    		}
    		Page<ItemModel> pageResult = itemRep.findAll(pageReq);
    		qResult = pageResult.getContent();
    		itemModel.setPage(pageResult.getNumber());
    		itemModel.setTotal(pageResult.getTotalElements());
    	}
    	itemModel.setOrder(order);
    	itemModel.setOrderBy(orderBy);
    	
    	itemModel.setDatas(new HashMap<String, ItemModel>());
    	
    	for (ItemModel item : qResult) {
    		itemModel.getDatas().put(item.getId(), item);
		}
    	
    	return itemModel;
    }
}
