package com.example.AVA.material.model;

import lombok.Data;

@Data
public class ViewMaterialCommand {
    private Integer userId;
    private Integer materialId;

    public ViewMaterialCommand(Integer alunoId, Integer materialId){
        this.userId = alunoId;
        this.materialId = materialId;
    }
}
