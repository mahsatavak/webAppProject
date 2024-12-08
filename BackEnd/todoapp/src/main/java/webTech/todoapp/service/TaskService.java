package webTech.todoapp.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import webTech.todoapp.entity.*;
import webTech.todoapp.repository.TaskRepository;
import webTech.todoapp.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task  createTask (Task taskRequest ) {

        User responsibleUser = userRepository.findByUsername(taskRequest.getResponsible())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + taskRequest.getResponsible()));

        var task = new Task();

        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setResponsible(taskRequest.getResponsible());
        task.setStatus(taskRequest.getStatus());
        task.setCreator(taskRequest.getCreator());

        return  taskRepository.save(task);
    }

    public List<Task> getTasksByResponsible(String username) {
        return taskRepository.findByResponsible(username);
    }



    public  Task updateTask (Task taskRequest ) {
       Task sevedTask = taskRepository.findById(taskRequest.get_id())
                .orElseThrow(()->new IllegalArgumentException("Task not found by id " + taskRequest.get_id()));
       sevedTask.setTitle(taskRequest.getTitle());
       sevedTask.setDescription(taskRequest.getDescription());
       sevedTask.setResponsible(taskRequest.getResponsible());
       sevedTask.setStatus(taskRequest.getStatus());
       taskRepository.save(sevedTask);
       return sevedTask;
    }

    public List<Task> getCompletedTasks(String username) {
        return taskRepository.findByCreatorAndStatus(username, TaskStatus.COMPLETED);
    }
}
