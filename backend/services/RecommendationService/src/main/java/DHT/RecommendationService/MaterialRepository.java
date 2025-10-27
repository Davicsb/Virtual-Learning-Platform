package DHT.RecommendationService;

import DHT.RecommendationService.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer> {
    List<Material> findByTurmaIdIn(List<Integer> turmaIds);
}
