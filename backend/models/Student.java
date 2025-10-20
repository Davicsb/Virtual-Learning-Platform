package models;

public class Student extends User {
    String curso;
    String turmas[];
    int atividades[];

    Student(String name, String email, String password) {
        super(name, email, password, U.ALUNO);
        //System.out.println("Conta de ALUNO Criada.");
    }
    
    public void view(){
        System.out.println("View");
    }
}