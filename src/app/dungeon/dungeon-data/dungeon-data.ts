import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";
import { InventoryDataService } from "src/app/inventory/inventory-data/inventory-data.service";
import { CombatDataService } from "src/app/combat/combat-data/combat-data.service";

export interface Dungeon {
    name: string,
    action?: Action,
    actionList: Action[],
    encounterChance: number,
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
        inventory: InventoryDataService,
        combat: CombatDataService) => void
}

export interface Difficulty {
    skill: number,
    difficulty: number,
    weight: number
}

export interface Enemy {
    name: string,
    health: number,
    stats: number[],
    skills: Skill[]
}

export interface Skill {
    name: string,
    action: () => void
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
        action: function(dungeon, player, inventory, combat) {
            if (!dungeon.isFullyExplored() && !dungeon.isInCombat()) {
                var actionProgress = player.calculateProgress(this.usedSkills);
                dungeon.progressAction(0, actionProgress/60);
                for (var usedSkill of this.usedSkills) {
                    player.gainExp(usedSkill.skill, 1/60 * usedSkill.difficulty);
                }
                if (dungeon.encounterRoll(dungeon.getEncounterChance())) {
                    dungeon.setInCombat(true);
                }
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 10,
        active: true,
        repeatable: true,
        progress: {label: "Gathering", current: 0, max: 5},
        usedSkills: [
            {skill: 0, difficulty: 10, weight: 2},
            {skill: 2, difficulty: 5, weight: 1}
        ],
        action: function(dungeon, player, inventory, combat) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            if (dungeon.progressAction(1, actionProgress/60)) {
                inventory.gainItem(0, 1);
            }
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, 1/60 * usedSkill.difficulty);
            }
        }
    }],
    encounterChance: 1,
    enemyList: [{
        name: "Boar",
        health: 25,
        stats: [10, 3, 4],
        skills: [{
            name: "Charge",
            action: function() {
                console.log("Used " + this.name);
            }
        }]
    }, {
        name: "Wolf",
        health: 15,
        stats: [6, 2, 7],
        skills: [{
            name: "Bite",
            action: function() {
                console.log("Used " + this.name);
            }
        }]
    }]
}