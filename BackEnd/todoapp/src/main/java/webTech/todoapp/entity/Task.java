package webTech.todoapp.entity;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Task")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    private String _id;
    @NotBlank
    @Size(max = 50)
    private String title;
    private String description;
    private TaskStatus status;
    private String responsible;
    private String creator;
}

/*one-to-many mapping means that one row in
a table is mapped to multiple rows in another table.*/