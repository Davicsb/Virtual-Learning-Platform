package models;

public class Tutor extends User {
    String cursos[];
    String turmas[];
    String atividades[]; //talvez seja melhor hashmap...
    
    Tutor(String id, String name, String email, String password, String[] newCursos) {
        super(id, name, email, password, U.PROFESSOR);
        cursos = newCursos;
        //System.out.println("Conta de PROFESSOR Criada.");
    }
    
    public void view(){
        System.out.println("View");
    }
    
}