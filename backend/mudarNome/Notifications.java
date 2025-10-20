package mudarNome;

public class Notifications extends Item{
    String authorName;
    String createdAt;

    Notifications(String newId, String newTitle, String newContent, String newAuthorName, String newCreatedAt){
        super(newId, newTitle, newContent);
        authorName = newAuthorName;
        createdAt = newCreatedAt;
    }

    public void view(){
        System.out.println("View");
    }
}
