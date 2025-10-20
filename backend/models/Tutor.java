package models;

public class Tutor extends User {
    String curso;
    String turmas[];
    int atividades[];
    
    Tutor(String name, String email, String password) {
        super(name, email, password, U.PROFESSOR);
        //System.out.println("Conta de PROFESSOR Criada.");
    }
    
    public void view(){
        System.out.println("View");
    }
    
}