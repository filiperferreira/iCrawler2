export interface Player {
    name: string,
    health: Resource,
    mana: Resource,
    lifeSkills: Skill[],
    combatStats: Stat[],
    unallocatedStats: number
}

export interface Resource {
    current: number, min: number, max: number
}

export interface Skill {
    id: string, level: number, exp: number, expToLevel: number
}

export interface Stat {
    id: string, level: number
}

export const PLAYER: Player = {
    name: "Crawler",
    health: {current: 100, min: 0, max: 100},
    mana: {current: 50, min: 0, max: 50},
    lifeSkills: [
        {id: "Combat", level: 1, exp: 0, expToLevel: 100},
        {id: "Exploration", level: 1, exp: 0, expToLevel: 100},
        {id: "Gathering", level: 1, exp: 0, expToLevel: 100},
        {id: "Social", level: 1, exp: 0, expToLevel: 100}
    ],
    combatStats: [
        {id: "Attack", level: 5},
        {id: "Defense", level: 5},
        {id: "Speed", level: 5}
    ],
    unallocatedStats: 0
};