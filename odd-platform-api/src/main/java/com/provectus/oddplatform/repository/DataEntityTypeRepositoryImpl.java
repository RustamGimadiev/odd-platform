package com.provectus.oddplatform.repository;

import com.provectus.oddplatform.model.tables.pojos.DataEntitySubtypePojo;
import com.provectus.oddplatform.model.tables.pojos.DataEntityTypePojo;
import lombok.RequiredArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.provectus.oddplatform.model.Tables.*;

@Repository
@RequiredArgsConstructor
public class DataEntityTypeRepositoryImpl implements DataEntityTypeRepository {
    private final DSLContext dslContext;

    private Map<DataEntityTypePojo, List<DataEntitySubtypePojo>> types;

    @Override
    public Map<DataEntityTypePojo, List<DataEntitySubtypePojo>> getTypes() {
        if (types == null) {
            types = fetch();
        }

        return types;
    }

    @Override
    public DataEntityTypePojo findTypeByName(final String name) {
        return getTypes().keySet().stream()
            .filter(t -> t.getName().equals(name))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException(String.format("No supported type with name %s found", name)));
    }

    @Override
    public DataEntitySubtypePojo findSubtypeByName(final String name) {
        return getTypes().values().stream()
            .flatMap(List::stream)
            .filter(t -> t.getName().equals(name))
            .findFirst()
            .orElseThrow(() -> new IllegalStateException(String.format("No supported subtype with name %s found", name)));
    }

    private Map<DataEntityTypePojo, List<DataEntitySubtypePojo>> fetch() {
        return dslContext
            .select(DATA_ENTITY_TYPE.ID, DATA_ENTITY_TYPE.NAME)
            .select(DATA_ENTITY_SUBTYPE.ID, DATA_ENTITY_SUBTYPE.NAME)
            .from(DATA_ENTITY_TYPE)
            .leftJoin(TYPE_SUBTYPE_RELATION).on(TYPE_SUBTYPE_RELATION.TYPE_ID.eq(DATA_ENTITY_TYPE.ID))
            .leftJoin(DATA_ENTITY_SUBTYPE).on(DATA_ENTITY_SUBTYPE.ID.eq(TYPE_SUBTYPE_RELATION.SUBTYPE_ID))
            .fetchGroups(
                r -> new DataEntityTypePojo()
                    .setId(r.get(0, Long.class))
                    .setName(r.get(1, String.class)),
                r -> new DataEntitySubtypePojo()
                    .setId(r.get(2, Long.class))
                    .setName(r.get(3, String.class))
            );
    }
}
