package com.provectus.oddplatform.dto;

// TODO: replace with database impl
public enum DataEntitySubtype {
    TABLE,
    FILE,
    FEATURE_GROUP,
    TOPIC,

    JOB,
    JOB_RUN,
    EXPERIMENT,
    ML_MODEL_TRAINING,
    ML_MODEL_INSTANCE,

    DASHBOARD,
    ML_MODEL_ARTIFACT,

    VIEW,

    UNKNOWN
}
