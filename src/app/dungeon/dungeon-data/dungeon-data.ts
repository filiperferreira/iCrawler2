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
    skill: number,
    difficulty: number,
    weight: number
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
        usedSkills: [{skill: 3, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory) {
            if (!dungeon.isFullyExplored()) {
                var actionProgress = player.calculateProgress(this.usedSkills);
                dungeon.progressAction(0, actionProgress/60);
                for (var pair of this.usedSkills) {
                    player.gainExp(pair.skill, 1/60 * pair.weight);
                }
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 10,
        active: true,
        repeatable: true,
        progress: {label: "Gathering", current: 0, max: 5},
        usedSkills: [{skill: 0, difficulty: 10, weight: 2}, {skill: 2, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            if (dungeon.progressAction(1, actionProgress/60)) {
                inventory.gainItem(0, 1);
            }
            for (var pair of this.usedSkills) {
                player.gainExp(pair.skill, 1/60 * pair.weight);
            }
        }
    }]
}