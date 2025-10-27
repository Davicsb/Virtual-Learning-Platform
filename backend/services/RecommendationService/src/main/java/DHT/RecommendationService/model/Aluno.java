package DHT.RecommendationService.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Aluno {
    @Id
    private Integer id;

    @ElementCollection
    private List<Integer> materiaisVisualizados;

    @ManyToMany
    private List<Turma> turmas;
}
