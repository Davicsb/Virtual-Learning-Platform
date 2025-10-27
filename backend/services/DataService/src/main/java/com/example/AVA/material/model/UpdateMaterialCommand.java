package com.example.AVA.material.model;

import com.example.AVA.curso.model.Curso;
import lombok.Data;

@Data
public class UpdateMaterialCommand {
    private Integer id;
    private Material material;

    public UpdateMaterialCommand(Integer id, Material material){
        this.id = id;
        this.material = material;
    }
}
