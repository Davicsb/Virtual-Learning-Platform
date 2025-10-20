package mudarNome;

public class Classes extends Item {
    //Toda turma vai ter esses três atributos além dos de `Item`
    String course;
    //Ver se vai ser string mesmo ou objetos
    String tutors[];
    String students[];

    Classes(String newId, String newTitle, String newContent, String newCourse, String[] newTutors, String[] newStudents){
        super(newId, newTitle, newContent);
        course = newCourse;
        tutors = newTutors;
        students = newStudents;
    }

    public void view(){
        System.out.println("View");
    }
}
