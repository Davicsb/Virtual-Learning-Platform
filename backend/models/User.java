package models;

abstract class User {
    //Atributos básicos de um usuário
    String id;
    private String userName;
    private String userEmail;
    private String userPassword;
    private U userType; // tipo do usuário

    User(String newId, String name, String email, String password, U type){ //Construtor (init)
        id = newId;
        userName = name;
        userEmail = email;
        userPassword = password;
        userType = type;
    }

    public String getName() {
        return userName;
    }

    public void setName(String newName) {
        userName = newName;
    }

    public String getEmail() {
        return userEmail;
    }

    public void setEmail(String newEmail) {
        userEmail= newEmail;
    }

    public String getPassword() {
        return userPassword;
    }

    public void setPassword(String newPassword) {
        userEmail = newPassword;
    }

    public U getType() {
        return userType;
    }

    public abstract void view();

}