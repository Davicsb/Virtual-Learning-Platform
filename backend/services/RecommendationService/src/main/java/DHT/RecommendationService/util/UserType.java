package DHT.RecommendationService.util;

public enum UserType {
    ADMIN, PROFESSOR, ALUNO;

    public String getRoleJwt(){
        return "ROLE_" + this.name();
    }
}
