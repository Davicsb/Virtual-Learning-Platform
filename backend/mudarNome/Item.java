package mudarNome;

public abstract class Item {
    //Atividades, avisos, materiais, cursos e turmas tem esses 3 atributos
    String id;
    String title;
    String content; //pode ser a descrição

    Item(String newId, String newTitle, String newContent){
        id = newId;
        title = newTitle;
        content = newContent;
    }

    public abstract void view();
}
