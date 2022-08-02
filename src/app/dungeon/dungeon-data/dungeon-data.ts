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
                inventory.gainItem(1, 1);
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
        progress: {label: "Meet Hermit", current: 0, max: 100},
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
                dungeon.deactivateAction(3);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Meet Adventurer",
        unlockedAt: 30,
        active: true,
        repeatable: false,
        progress: {label: "Meet Adventurer", current: 0, max: 50},
        usedSkills: [{skill: 3, difficulty: 5, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (dungeon.progressAction(4, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "The adventurer politely introduces himself to you."
                )
                dungeon.deactivateAction(4);
                dungeon.activateAction(5);
                dungeon.activateAction(6);
                dungeon.activateAction(7);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Question Adventurer",
        unlockedAt: 30,
        active: false,
        repeatable: false,
        progress: {label: "Question Adventurer", current: 0, max: 100},
        usedSkills: [{skill: 3, difficulty: 10, weight: 1}],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (dungeon.progressAction(5, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "The adventurer tells you about a goblin village somewhere nearby, maybe you should check it out."
                );
                dungeon.deactivateAction(5);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Get Exploration Tips From Adventurer",
        unlockedAt: 30,
        active: false,
        repeatable: false,
        progress: {label: "Exploration Tips", current: 0, max: 50},
        usedSkills: [
            {skill: 1, difficulty: 20, weight: 3},
            {skill: 3, difficulty: 5, weight: 0.5}
        ],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (dungeon.progressAction(6, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "The adventurer has taught you everything he knows."
                );
                dungeon.deactivateAction(6);
                dungeon.setActiveAction(undefined);
            }
        }
    },{
        name: "Spar With Adventurer",
        unlockedAt: 30,
        active: false,
        repeatable: false,
        progress: {label: "Sparring", current: 0, max: 50},
        usedSkills: [
            {skill: 0, difficulty: 20, weight: 3}
        ],
        action: function(dungeon, player, inventory, combat, messageLog) {
            var actionProgress = player.calculateProgress(this.usedSkills);
            for (var usedSkill of this.usedSkills) {
                player.gainExp(usedSkill.skill, usedSkill.difficulty, 1/60);
            }
            if (player.takeDamage(1)) {
                messageLog.addMessageToLog(
                    "The adventurer has defeated you, regain your strength before trying again."
                )
                dungeon.setActiveAction(undefined);
            }
            if (dungeon.progressAction(7, actionProgress/60)) {
                messageLog.addMessageToLog(
                    "You are finally able to defeat the adventurer in combat, he seems very impressed with your growth."
                );
                dungeon.deactivateAction(7);
                dungeon.setActiveAction(undefined);
            }
        }
    }],
    encounterChance: 10/60,
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
                var modStats = [
                    {id: combatData.enemy.stats[0].id, level: combatData.enemy.stats[0].level},
                    {id: combatData.enemy.stats[1].id, level: combatData.enemy.stats[1].level},
                    {id: combatData.enemy.stats[2].id, level: combatData.enemy.stats[2].level * 2},
                ]
                return combatData.calculateDamage(modStats, playerStats);
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
                var modStats = [
                    {id: combatData.enemy.stats[0].id, level: combatData.enemy.stats[0].level * 2},
                    {id: combatData.enemy.stats[1].id, level: combatData.enemy.stats[1].level},
                    {id: combatData.enemy.stats[2].id, level: combatData.enemy.stats[2].level},
                ]
                return combatData.calculateDamage(modStats, playerStats);
            }
        }]
    }]
}