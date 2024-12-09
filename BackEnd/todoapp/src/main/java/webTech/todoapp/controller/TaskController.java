package webTech.todoapp.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import webTech.todoapp.entity.Response;
import webTech.todoapp.entity.Task;
import webTech.todoapp.entity.TaskRequest;
import webTech.todoapp.repository.TaskRepository;
import webTech.todoapp.service.TaskService;

import java.util.*;

@RestController
@RequestMapping("/api/todos/")
@CrossOrigin("http://localhost:4200/")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    @Autowired
    private final TaskRepository taskRepository;


    @PostMapping("/task")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createTask(@RequestBody Task taskRequest, @CookieValue(value = "username", defaultValue = "") String username) {
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }
        taskRequest.setCreator(username); // Setzen des Creators auf den eingeloggten Benutzer
        try {
            Task createdTask = taskService.createTask(taskRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/my-tasks")
    public ResponseEntity<List<Task>> getMyTasks(@CookieValue(value = "username", defaultValue = "") String username) {
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.emptyList());
        }
        List<Task> tasks = taskService.getTasksByResponsible(username);
        return ResponseEntity.ok(tasks);
    }


    @PutMapping("/{_id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> updateTask(@PathVariable("_id") String id, @RequestBody Task taskRequest) {
      return   ResponseEntity.ok(taskService.updateTask(taskRequest));
    }


    @DeleteMapping("/{_id}")
    public ResponseEntity<String> deleteTask(@PathVariable("_id") String id) {

        Optional<Task> taskObj= taskRepository.findById(id);
        if (taskObj.isPresent()) {
            taskRepository.delete(taskObj.get());
            return ResponseEntity.ok("{\"message\":\"Task deleted successfully\"}");
        }
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Task not found\"}");
    }

    @GetMapping("/done")
    public ResponseEntity<List<Task>> getListOfDone(@CookieValue(value = "username", defaultValue = "") String username) {
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.emptyList());
        }
        List<Task> tasks = taskService.getCompletedTasks(username);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/other")
    public ResponseEntity<List<Task>> getListOfOthersResponsibility (@CookieValue(value = "username", defaultValue = "") String username) {
        if (username.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.emptyList());
        }
        List<Task> tasks = taskService.getOthersTasks(username);
        return ResponseEntity.ok(tasks);
    }
}
