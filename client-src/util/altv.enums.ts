export enum Locale {
	Arabic = "ar",
	Belarusian = "by",
	Czech = "cz",
	German = "de",
	English = "en",
	Spanish = "es",
	Farsi = "fa",
	French = "fr",
	Hebrew = "he",
	Hungarian = "hu",
	Indonesian = "id",
	Hindi = "in_hd", // Wrong tag (hi_in)
	Malayalam = "in_ml", // Wrong tag (ml_in)
	Telugu = "in_tl", // Wrong tag (te_in)
	Tamil = "in_tm", // Wrong tag (ta_in)
	Italian = "it",
	Lithuanian = "lt",
	Latvian = "lv",
	NorwegianBokmal = "nb_no",
	NorwegianNynorsk = "nn_no",
	Polish = "pl",
	Portugese = "pt",
	BrazilianPortuguese = "pt_br",
	Romanian = "ro",
	Serbian = "rs", // Wrong tag (sr)
	Russian = "ru",
	Slovak = "sk",
	Thai = "th",
	Turkish = "tr",
	Ukrainian = "ua", // Wrong tag (uk)
	ChineseSimplified = "zh_cn",
	ChineseTraditional = "zh_tw",
}

export enum PermissionState {
	Allowed,
	Denied,
	Unspecified,
	Failed,
}

export enum StatName {
	Stamina = "stamina",
	Strength = "strength",
	LungCapacity = "lung_capacity",
	Wheelie = "wheelie_ability",
	Flying = "flying_ability",
	Shooting = "shooting_ability",
	Stealth = "stealth_ability",
}

export enum CheckpointType {
	CylinderSingleArrow,
	CylinderDoubleArrow,
	CylinderTripleArrow,
	CylinderCycleArrow,
	CylinderCheckerboard,
	CylinderWrench,
	CylinderSingleArrow2,
	CylinderDoubleArrow2,
	CylinderTripleArrow2,
	CylinderCycleArrow2,
	CylinderCheckerboard2,
	CylinderWrench2,
	RingSingleArrow,
	RingDoubleArrow,
	RingTripleArrow,
	RingCycleArrow,
	RingCheckerboard,
	SingleArrow,
	DoubleArrow,
	TripleArrow,
	CycleArrow,
	Checkerboard,
	CylinderSingleArrow3,
	CylinderDoubleArrow3,
	CylinderTripleArrow3,
	CylinderCycleArrow3,
	CylinderCheckerboard3,
	CylinderSingleArrow4,
	CylinderDoubleArrow4,
	CylinderTripleArrow4,
	CylinderCycleArrow4,
	CylinderCheckerboard4,
	CylinderSingleArrow5,
	CylinderDoubleArrow5,
	CylinderTripleArrow5,
	CylinderCycleArrow5,
	CylinderCheckerboard5,
	RingPlaneUp,
	RingPlaneLeft,
	RingPlaneRight,
	RingPlaneDown,
	Empty,
	Ring,
	Empty2,
	Cylinder,
	Cylinder1,
	Cylinder2,
	Cylinder3,
	Cylinder4,
	Cylinder5,
	Empty3,
	Empty4,
	Empty5,
	Empty6,
	RingDollar,
	RingWolf,
	RingQuestionMark,
	RingPlane,
	RingChopper,
	RingBoat,
	RingCar,
	RingBike,
	RingBicycle,
	RingTruck,
	RingParachute,
	RingJetpack,
	RingWhirl,
}

export enum VehicleIndicatorLights {
	BlinkLeft = 1,
	BlinkRight = 2,
	BlinkPermBoth = 4,
	StaticBoth = 8,
	Interior = 64,
}

export enum WebSocketReadyState {
	Connecting,
	Open,
	Closing,
	Closed,
}

export enum ConfigFlag {
	DisableAutoWeaponSwap = "DISABLE_AUTO_WEAPON_SWAP",
	DisablePedPropKnockOff = "DISABLE_PED_PROP_KNOCK_OFF",
	DisableIdleCamera = "DISABLE_IDLE_CAMERA",
}

export enum WatermarkPosition {
	BottomRight = 0,
	TopRight = 1,
	TopLeft = 2,
	TopCenter = 3,
	BottomCenter = 4,
}

export enum ProfileSourceType {
	Script = "script",
	Builtin = "builtins",
	Native = "native-callback",
	Internal = "internal",
	Unknown = "unknown",
}
