export type RapsodoBallTrackingShot = {
    sessionId: string; // or whatever
    // CSV columns
    clubType: string;
    clubBrand: string;
    clubModel: string;
    carryDistance: number;
    totalDistance: number;
    ballSpeed: number;
    launchAngle: number;
    launchDirection: number;
    apex: number;
    sideCarry: number;
    clubSpeed: number;
    smashFactor: number;
    descentAngle: number;
    attackAngle: number;
    clubPath: number;
    clubDataEstType: unknown;
};
