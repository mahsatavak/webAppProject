package webTech.todoapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import webTech.todoapp.entity.Task;
import webTech.todoapp.entity.TaskStatus;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    //community
    @Query("{ 'creator': ?0 , 'responsible':{ $ne: ?0 } , 'status': { $ne: 'COMPLETED' } }")
    List<Task> OtherResponsible(String creator);
    //todos
    @Query("{ 'responsible': ?0, 'status': { $ne: 'COMPLETED' } }")
    List<Task> findByResponsible( String responsible);

    List<Task> findByCreatorAndStatus(String creator, TaskStatus status);
}
