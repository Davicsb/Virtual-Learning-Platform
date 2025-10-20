package mudarNome;

public class Materials extends Item{
    //Todo material terá esses atributos a mais
    String[] fileUrl; //Pode ter mais de um arquivo
    String createdAt;

    Materials(String newId, String newTitle, String newContent, String[] newFileUrl, String newCreatedAt){
        super(newId, newTitle, newContent);
        fileUrl = newFileUrl;
        createdAt = newCreatedAt;
    }

    public void view(){
        System.out.println("View");
    }
}
