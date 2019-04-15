package benyi.shop.db;

import org.springframework.data.mongodb.repository.MongoRepository;

import benyi.shop.model.UserModel;

public interface UserRepository extends MongoRepository<UserModel, String> {

}
