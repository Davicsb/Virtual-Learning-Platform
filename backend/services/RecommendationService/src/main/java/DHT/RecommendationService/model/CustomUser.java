package DHT.RecommendationService.model;


import DHT.RecommendationService.util.UserType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "User")
public class CustomUser {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "User_Type")
    private UserType userType; // "ALUNO", "TUTOR", "ADMIN"

}
