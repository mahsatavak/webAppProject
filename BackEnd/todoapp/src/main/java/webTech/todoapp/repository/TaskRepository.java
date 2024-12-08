package webTech.todoapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import webTech.todoapp.entity.Task;
import webTech.todoapp.entity.TaskStatus;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    //community
    List<Task> findByCreatorOrResponsible(String creator, String responsible);
    //todos
    List<Task> findByResponsible( String responsible);
    List<Task> findByCreatorAndStatus(String creator, TaskStatus status);
}
