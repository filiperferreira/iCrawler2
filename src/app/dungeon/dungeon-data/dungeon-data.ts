import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";
import { InventoryDataService } from "src/app/inventory/inventory-data/inventory-data.service";
import { CombatDataService } from "src/app/combat/combat-data/combat-data.service";
import { LogWindowDataService } from "src/app/log-window/log-window-data/log-window-data.service";
import { Resource, Stat } from "src/app/player/player-data/player-data";

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
        combat: CombatDataService,
        messageLog: LogWindowDataService) => void
}

export interface Difficulty {
    skill: number,
    difficulty: number,
    weight: number
}

export interface Enemy {
    name: string,
    health: Resource,
    stats: Stat[],
    skills: Skill[]
}

export interface Skill {
    name: string,
    action: (playerStats: Stat[], combatData: CombatDataService) => number
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: undefined,
    actionList: [{
        name: "Explore", 
        unlockedAt: 0,
        active: true,
        repeatable: false,
        progress: {label: "Explore", current: 0, max: 100},
        usedSkills: [{skill: 1, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            if (!dungeon.isFullyExplored() && !dungeon.isInCombat()) {
                var actionProgress = player.calculateProgress(this.usedSkills);
                dungeon.progressAction(0, actionProgress/60);
                for (var usedSkill of this.usedSkills) {
                    player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
                }
                if (dungeon.encounterRoll(dungeon.getEncounterChance())) {
                    dungeon.setInCombat(true);
                    dungeon.setActiveAction(undefined);
                    messageLog.addMessageToLog("You were attacked by a " + combat.getEnemyName() + ".");
                }
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 1,
        active: true,
        repeatable: true,
        progress: {label: "Gather Herbs", current: 0, max: 5},
        usedSkills: [{skill: 2, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            if (dungeon.progressAction(1, actionProgress/60)) {
                inventory.gainItem(0, 1);
            }
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
        }
    },{
        name: "Meet Hermit",
        unlockedAt: 20,
        active: true,
        repeatable: false,
        progress: {label: "Meet Hermit", current: 0, max: 30},
        usedSkills: [{skill: 3, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (dungeon.progressAction(2, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "The hermit isn't thrilled to meet you, but at least he tolerates your presence."
                );
                dungeon.deactivateAction(2);
                dungeon.activateAction(3);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Befriend Hermit",
        unlockedAt: 20,
        active: false,
        repeatable: false,
        progress: {label: "Befriend Hermit", current: 0, max: 500},
        usedSkills: [{skill: 3, difficulty: 20, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (dungeon.progressAction(3, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "Now that took a lot of effort, but the hermit has finally warmed up to you."
                )
                messageLog.addMessageToLog(
                    "He is now willing to teach you how to skin the forest animals for pelts."
                )
                dungeon.deactivateAction(3);
                dungeon.activateAction(4);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Learn Skinning",
        unlockedAt: 20,
        active: false,
        repeatable: true,
        progress: {label: "Learn Skinning", current: 0, max: 200},
        usedSkills: [
            {skill: 3, difficulty: 10, weight: 0.5},
            {skill: 4, difficulty: 30, weight: 2}
        ],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            dungeon.progressAction(4, actionProgress/60);
        }
    }],
    encounterChance: 1,
    enemyList: [{
        name: "Boar",
        health: {current: 25, min: 0, max: 25},
        stats: [
            {id: "Attack", level: 10},
            {id: "Defense", level: 3},
            {id: "Speed", level: 4}
        ],
        skills: [{
            name: "Charge",
            action: function(playerStats, combatData) {
                return combatData.calculateDamage(combatData.enemy.stats, playerStats);
            }
        }]
    }, {
        name: "Wolf",
        health: {current: 15, min: 0, max: 15},
        stats: [
            {id: "Attack", level: 6},
            {id: "Defense", level: 2},
            {id: "Speed", level: 7}
        ],
        skills: [{
            name: "Bite",
            action: function(playerStats, combatData) {
                return combatData.calculateDamage(combatData.enemy.stats, playerStats);
            }
        }]
    }]
}