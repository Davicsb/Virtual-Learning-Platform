package DHT.RecommendationService.services;

import DHT.RecommendationService.AlunosRepository;
import DHT.RecommendationService.MaterialRepository;
import DHT.RecommendationService.model.Aluno;
import DHT.RecommendationService.model.Material;
import DHT.RecommendationService.model.Turma;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final AlunosRepository alunoRepository;
    private final MaterialRepository materialRepository;

    public RecommendationService(AlunosRepository alunoRepository, MaterialRepository materialRepository) {
        this.alunoRepository = alunoRepository;
        this.materialRepository = materialRepository;
    }

    public List<Material> recomendar(Integer alunoId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        List<Integer> visualizados = aluno.getMateriaisVisualizados();
        List<Integer> turmaIds = aluno.getTurmas().stream()
                .map(Turma::getId)
                .toList();

        return materialRepository.findByTurmaIdIn(turmaIds).stream()
                .filter(mat -> !visualizados.contains(mat.getId()))
                .collect(Collectors.toList());
    }
}
