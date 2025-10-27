package DHT.RecommendationService.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Turma {
    @Id
    private Integer id;
    private String nome;
}
