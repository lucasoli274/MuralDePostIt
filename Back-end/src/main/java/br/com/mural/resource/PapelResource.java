package br.com.mural.resource;

import br.com.mural.entity.Papel;
import br.com.mural.repository.PapelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postit")
public class PapelResource {

    @Autowired
    private PapelRepository papelRepository;

    @GetMapping
    private Iterable<Papel> getPostIt() {
        return papelRepository.findAll();
    }

    @PostMapping
    private Papel criaPostIt(@RequestBody Papel postIt) {
        return papelRepository.save(postIt);
    }

}
