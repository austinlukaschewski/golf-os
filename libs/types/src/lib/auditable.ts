export type TimestampAuditable = {
    createdAt: Date;
    updatedAt: Date;
};

export type TimestampAuditableWithSoftDelete = TimestampAuditable & {
    deletedAt?: Date;
};
