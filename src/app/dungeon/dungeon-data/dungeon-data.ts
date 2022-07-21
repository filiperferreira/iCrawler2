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
    progress: Progress,
    action: (
        dungeon: DungeonDataService,
        player: PlayerDataService,
        inventory: InventoryDataService) => void
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: undefined,
    action_list: [{
        name: "Explore", 
        unlockedAt: 0,
        progress: {label: "Explored", current: 0, max: 100},
        action: function(dungeon, player, inventory) {
            if (!dungeon.isFullyExplored()) {
                dungeon.explore(1);
                player.gainExp(3,1);
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 10,
        progress: {label: "Gathering", current: 0, max: 5},
        action: function(dungeon, player, inventory) {
            console.log("hi?");
        }
    }]
}