package br.com.mural.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Papel {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String titulo;

    @Column(length = 300)
    private String conteudo;

    @Column(nullable = true)
    private String fontFamily;

    @Column(nullable = true)
    private String backgroundColor;
}
