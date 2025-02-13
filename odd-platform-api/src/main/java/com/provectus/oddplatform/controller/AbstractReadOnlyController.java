package com.provectus.oddplatform.controller;

import com.provectus.oddplatform.exception.NotFoundException;
import com.provectus.oddplatform.service.ReadOnlyCRUDService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
public class AbstractReadOnlyController<E, EL, S extends ReadOnlyCRUDService<E, EL>> {
    final protected S entityService;

    protected Mono<ResponseEntity<E>> get(final long id) {
        return entityService.get(id)
            .subscribeOn(Schedulers.boundedElastic())
            .map(ResponseEntity::ok)
            .onErrorReturn(NotFoundException.class, ResponseEntity.notFound().build());
    }

    protected Mono<ResponseEntity<EL>> list() {
        return entityService.list()
            .subscribeOn(Schedulers.boundedElastic())
            .map(ResponseEntity::ok);
    }

    protected Mono<ResponseEntity<EL>> list(final String query) {
        return entityService.list(query)
            .subscribeOn(Schedulers.boundedElastic())
            .map(ResponseEntity::ok);
    }

    protected Mono<ResponseEntity<EL>> list(final int page, final int size) {
        return entityService.list(page, size)
            .subscribeOn(Schedulers.boundedElastic())
            .map(ResponseEntity::ok);
    }

    protected Mono<ResponseEntity<EL>> list(final int page, final int size, final String query) {
        return entityService.list(page, size, query)
            .subscribeOn(Schedulers.boundedElastic())
            .map(ResponseEntity::ok);
    }
}
