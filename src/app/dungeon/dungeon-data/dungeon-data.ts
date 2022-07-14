export interface Dungeon {
    name: string,
    action: string,
    exploration: {current: number, max: number},
    action_list: Action[]
}

export interface Action {
    name: string,
    unlocked: boolean
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: "None",
    exploration: {current: 0, max: 100},
    action_list: [
        {name: "Explore", unlocked: true},
        {name: "Gather Herbs", unlocked: false}]
}