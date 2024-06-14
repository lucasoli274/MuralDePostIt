package br.com.mural.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.mural.entity.Papel;

@Repository
public interface PapelRepository extends CrudRepository<Papel, Long> {
}
