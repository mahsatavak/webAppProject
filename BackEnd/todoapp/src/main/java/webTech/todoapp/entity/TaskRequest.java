package webTech.todoapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //von Lombok wird verwendet, um Boilerplate-Code wie Getter, Setter, toString, equals, und hashCode Methoden automatisch zu generieren.
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    private String _id;
    private String title;
    private String description;
    private TaskStatus status;
    private String responsible;
    private String creator;
}
