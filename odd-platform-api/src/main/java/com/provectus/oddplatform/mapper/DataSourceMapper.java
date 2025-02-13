package com.provectus.oddplatform.mapper;

import com.provectus.oddplatform.api.contract.model.DataSource;
import com.provectus.oddplatform.api.contract.model.DataSourceFormData;
import com.provectus.oddplatform.api.contract.model.DataSourceList;
import com.provectus.oddplatform.api.contract.model.DataSourceUpdateFormData;
import com.provectus.oddplatform.model.tables.pojos.DataSourcePojo;

public interface DataSourceMapper
    extends CRUDMapper<DataSource, DataSourceList, DataSourceFormData, DataSourceUpdateFormData, DataSourcePojo> {
}
