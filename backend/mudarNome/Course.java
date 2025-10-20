package mudarNome;

public class Course extends Item {
    //Utiliza apenas os atributos de item

    Course(String newId, String newTitle, String newContent){
        super(newId, newTitle, newContent);
    }

    public void view(){
        System.out.println("View");
    }
}
