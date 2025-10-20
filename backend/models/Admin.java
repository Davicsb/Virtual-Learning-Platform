package models;

public class Admin extends User {
    Admin(String name, String email, String password) {
        super(name, email, password, U.ADMIN);
        //System.out.println("Admin Criado.");
    }

    public void view(){
        System.out.println("View");
    }
}