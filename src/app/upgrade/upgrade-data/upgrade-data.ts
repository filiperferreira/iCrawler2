export interface Upgrade {
    name: string,
    description: string,
    cost: number,
    value: number
}

export const UPGRADES: Upgrade[] = [{
    name: "EXP Gain",
    description: "Increases the amount of experience you gain by executing actions.",
    cost: 100,
    value: 1
}, {
    name: "Max HP",
    description: "Increases your maximum HP value.",
    cost: 100,
    value: 1
}]
