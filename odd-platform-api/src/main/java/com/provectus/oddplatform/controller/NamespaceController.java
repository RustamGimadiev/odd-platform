package com.provectus.oddplatform.controller;

import com.provectus.oddplatform.api.contract.api.NamespaceApi;
import com.provectus.oddplatform.api.contract.model.Namespace;
import com.provectus.oddplatform.api.contract.model.NamespaceFormData;
import com.provectus.oddplatform.api.contract.model.NamespaceList;
import com.provectus.oddplatform.api.contract.model.NamespaceUpdateFormData;
import com.provectus.oddplatform.service.NamespaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
public class NamespaceController
    extends AbstractCRUDController<Namespace, NamespaceList, NamespaceFormData, NamespaceUpdateFormData, NamespaceService>
    implements NamespaceApi {

    public NamespaceController(final NamespaceService entityService) {
        super(entityService);
    }

    @Override
    public Mono<ResponseEntity<Namespace>> createNamespace(
        @Valid final Mono<NamespaceFormData> namespaceFormData,
        final ServerWebExchange exchange
    ) {
        return create(namespaceFormData);
    }

    @Override
    public Mono<ResponseEntity<Namespace>> getNamespaceDetails(
        final Long namespaceId,
        final ServerWebExchange exchange
    ) {
        return get(namespaceId);
    }

    @Override
    public Mono<ResponseEntity<NamespaceList>> getNamespaceList(final ServerWebExchange exchange) {
        return list();
    }

    @Override
    public Mono<ResponseEntity<Namespace>> updateNamespace(
        final Long namespaceId,
        @Valid final Mono<NamespaceUpdateFormData> namespaceUpdateFormData,
        final ServerWebExchange exchange
    ) {
        return update(namespaceId, namespaceUpdateFormData);
    }
}
