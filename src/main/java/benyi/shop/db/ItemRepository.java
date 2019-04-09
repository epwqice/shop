package benyi.shop.db;

import org.springframework.data.mongodb.repository.MongoRepository;

import benyi.shop.model.ItemModel;

public interface ItemRepository extends MongoRepository<ItemModel, Integer> {

}
