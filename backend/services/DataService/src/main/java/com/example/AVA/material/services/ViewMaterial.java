package com.example.AVA.material.services;

import com.example.AVA.Command;
import com.example.AVA.alunos.AlunosRepository;
import com.example.AVA.alunos.model.Aluno;
import com.example.AVA.material.MaterialRepository;
import com.example.AVA.material.model.Material;
import com.example.AVA.material.model.ViewMaterialCommand;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
public class ViewMaterial implements Command<ViewMaterialCommand, Resource> {

    private final MaterialRepository materialRepository;
    private final AlunosRepository alunosRepository;

    public ViewMaterial(MaterialRepository materialRepository, AlunosRepository alunosRepository) {
        this.materialRepository = materialRepository;
        this.alunosRepository = alunosRepository;
    }

    @Override
    public ResponseEntity<Resource> execute(ViewMaterialCommand input){
        try {
            Material material = materialRepository.findById(input.getMaterialId())
                    .orElseThrow(() -> new RuntimeException("Material não encontrado"));

            Aluno aluno = alunosRepository.findById(input.getUserId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

            aluno.getMateriaisVisualizados().add(material.getId());
            alunosRepository.save(aluno);

            Path caminho = Paths.get(material.getUrlArquivo());
            Resource arquivo = new UrlResource(caminho.toUri());

            if (!arquivo.exists() || !arquivo.isReadable()) {
                throw new RuntimeException("Arquivo não encontrado ou inacessível");
            }

            String tipoMime = Files.probeContentType(caminho);
            MediaType tipo = tipoMime != null ? MediaType.parseMediaType(tipoMime) : MediaType.APPLICATION_OCTET_STREAM;

            return ResponseEntity.ok().contentType(tipo).body(arquivo);

        }  catch (IOException e) {

            throw new RuntimeException("Erro ao carregar o arquivo", e);

        }
    }

}
