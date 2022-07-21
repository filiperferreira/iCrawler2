export interface Player {
    name: string,
    health: Resource,
    mana: Resource,
    stats: Stat[]
}

export interface Resource {
    current: number, min: number, max: number
}

export interface Stat {
    id: string, level: number, exp: number, expToLevel: number
}

export const PLAYER: Player = {
    name: "Crawler",
    health: {current: 50, min: 0, max: 100},
    mana: {current: 50, min: 0, max: 50},
    stats: [{id: "Strength", level: 5, exp: 0, expToLevel: 100},
            {id: "Dexterity", level: 5, exp: 0, expToLevel: 100},
            {id: "Constitution", level: 5, exp: 0, expToLevel: 100},
            {id: "Speed", level: 5, exp: 0, expToLevel: 100},
            {id: "Magic", level: 5, exp: 0, expToLevel: 100},
            {id: "Luck", level: 5, exp: 0, expToLevel: 100}]
};