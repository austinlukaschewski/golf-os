export type MinIOObject = {
    bucket: string;
    path: string;
};

export type OptionalMinIOObject = Partial<MinIOObject>;
