package DHT.RecommendationService;

import DHT.RecommendationService.model.Material;
import DHT.RecommendationService.services.RecommendationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rec")
public class RecommendationServiceController {

    private final RecommendationService recomendacaoService;

    public RecommendationServiceController(RecommendationService recomendacaoService) {
        this.recomendacaoService = recomendacaoService;
    }

    @GetMapping("/{alunoId}")
    public List<Material> recomendar(@RequestParam Integer alunoId) {
        return recomendacaoService.recomendar(alunoId);
    }
}
