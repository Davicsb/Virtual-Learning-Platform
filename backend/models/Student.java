package models;

public class Student extends User {
    String curso;
    String turmas[];
    String atividades[]; //talvez seja melhor hashmap...

    Student(String id, String name, String email, String password) {
        super(id, name, email, password, U.ALUNO);
        //System.out.println("Conta de ALUNO Criada.");
    }
    
    public void view(){
        System.out.println("View");
    }
}