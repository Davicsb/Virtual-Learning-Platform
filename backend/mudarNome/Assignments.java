package mudarNome;

public class Assignments extends Item {
    //Toda atividade vai ter esses 3 atributos, além dos de `item`
    String dueDate;
    int maxpoints; // Implementar: se for 0 a atividade não tem nota
    String classId;

    Assignments(String newId, String newTitle, String newContent, String newDueDate, int newMaxPoints, String newClassId){
        super(newId, newTitle, newContent);
        dueDate = newDueDate;
        maxpoints = newMaxPoints;
        classId = newClassId;
    }

    public void view(){
        System.out.println("View");
    }
}
