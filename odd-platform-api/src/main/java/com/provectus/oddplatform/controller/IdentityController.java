package com.provectus.oddplatform.controller;

import com.provectus.oddplatform.api.contract.api.IdentityApi;
import com.provectus.oddplatform.api.contract.model.AssociatedOwner;
import com.provectus.oddplatform.api.contract.model.OwnerFormData;
import com.provectus.oddplatform.service.IdentityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@RequiredArgsConstructor
public class IdentityController implements IdentityApi {
    private final IdentityService identityService;

    @Override
    public Mono<ResponseEntity<AssociatedOwner>> whoami(final ServerWebExchange exchange) {
        return identityService.whoami()
            .map(ResponseEntity::ok)
            .switchIfEmpty(Mono.just(ResponseEntity.noContent().build()));
    }

    @Override
    public Mono<ResponseEntity<AssociatedOwner>> associateOwner(final Mono<OwnerFormData> ownerFormData,
                                                                final ServerWebExchange exchange) {
        return ownerFormData
            .publishOn(Schedulers.boundedElastic())
            .flatMap(identityService::associateOwner)
            .map(ResponseEntity::ok);
    }
}
