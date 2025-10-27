package DHT.RecommendationService.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Material {
    @Id
    private Integer id;
    private String titulo;
    private String categoria;

    @ManyToOne
    private Turma turma;
}
