import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";
import { InventoryDataService } from "src/app/inventory/inventory-data/inventory-data.service";

export interface Dungeon {
    name: string,
    action?: Action,
    action_list: Action[]
}

export interface Progress {
    label: string,
    current: number,
    max: number
}

export interface Action {
    name: string,
    unlockedAt: number,
    active: boolean,
    repeatable: boolean,
    progress: Progress,
    usedSkills: Difficulty[],
    action: (
        dungeon: DungeonDataService,
        player: PlayerDataService,
        inventory: InventoryDataService) => void
}

export interface Difficulty {
    skill: number;
    difficulty: number
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: undefined,
    action_list: [{
        name: "Explore", 
        unlockedAt: 0,
        active: true,
        repeatable: false,
        progress: {label: "Explored", current: 0, max: 100},
        usedSkills: [{skill: 3, difficulty: 5}],
        action: function(dungeon, player, inventory) {
            if (!dungeon.isFullyExplored()) {
                dungeon.progressAction(0,1/60);
                player.gainExp(3,1/60);
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 10,
        active: true,
        repeatable: true,
        progress: {label: "Gathering", current: 0, max: 5},
        usedSkills: [{skill: 0, difficulty: 10}, {skill: 2, difficulty: 5}],
        action: function(dungeon, player, inventory) {
            if (dungeon.progressAction(1,1/60)) {
                inventory.gainItem(0, 1);
            }
        }
    }]
}