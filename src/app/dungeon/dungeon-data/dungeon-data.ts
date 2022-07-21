import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";
import { InventoryDataService } from "src/app/inventory/inventory-data/inventory-data.service";
import { Resource, Stat } from "src/app/player/player-data/player-data";

export interface Dungeon {
    name: string,
    action?: Action,
    actionList: Action[]
    enemyList: Enemy[]
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
    action: (dungeon: DungeonDataService,
        player: PlayerDataService,
        inventory: InventoryDataService) => void
}

export interface Difficulty {
    skill: number,
    difficulty: number,
    weight: number
}

export interface Enemy {
    name: string,
    health: Resource,
    mana: Resource,
    stats: Stat[]
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: undefined,
    actionList: [{
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
    }],
    enemyList: [{
        name: "Boar",
        health: {current: 25, min: 0, max: 25},
        mana: {current: 0, min: 0, max: 0},
        stats: [
            {id: "Strength", level: 5, exp: 0, expToLevel: 100},
            {id: "Dexterity", level: 5, exp: 0, expToLevel: 100},
            {id: "Constitution", level: 5, exp: 0, expToLevel: 100},
            {id: "Speed", level: 5, exp: 0, expToLevel: 100},
            {id: "Magic", level: 5, exp: 0, expToLevel: 100},
            {id: "Luck", level: 5, exp: 0, expToLevel: 100}
        ]
    }]
}