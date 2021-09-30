export class Mission {
	name: string;
	missionPatch: (patchSize: PatchSize) => string;
}

enum PatchSize {
	SMALL = "SMALL",
	LARGE = "LARGE"
}
