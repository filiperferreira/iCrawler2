export interface Player {
    name: string,
    health: Resource,
    mana: Resource,
    life_skills: Skill[],
    combat_stats: Stat[]
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
    life_skills: [
        {id: "Exploration", level: 1, exp: 0, expToLevel: 100},
        {id: "Gathering", level: 1, exp: 0, expToLevel: 100},
        {id: "Combat", level: 1, exp: 0, expToLevel: 100}
    ],
    combat_stats: [
        {id: "Attack", level: 5},
        {id: "Defense", level: 5},
        {id: "Speed", level: 5}
    ]
};