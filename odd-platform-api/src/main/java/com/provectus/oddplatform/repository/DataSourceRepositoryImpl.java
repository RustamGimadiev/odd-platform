package com.provectus.oddplatform.repository;

import com.provectus.oddplatform.model.tables.pojos.DataSourcePojo;
import com.provectus.oddplatform.model.tables.records.DataSourceRecord;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.provectus.oddplatform.model.Tables.DATA_SOURCE;

@Repository
public class DataSourceRepositoryImpl
    extends AbstractSoftDeleteCRUDRepository<DataSourceRecord, DataSourcePojo>
    implements DataSourceRepository {

    public DataSourceRepositoryImpl(final DSLContext dslContext) {
        super(dslContext, DATA_SOURCE, DATA_SOURCE.ID, DATA_SOURCE.IS_DELETED,
            DATA_SOURCE.ODDRN, DATA_SOURCE.NAME, DataSourcePojo.class);
    }

    @Override
    public Optional<DataSourcePojo> getByOddrn(final String oddrn) {
        return dslContext.selectFrom(DATA_SOURCE)
            .where(addSoftDeleteFilter(DATA_SOURCE.ODDRN.eq(oddrn)))
            .fetchOptional()
            .map(this::recordToPojo);
    }
}
