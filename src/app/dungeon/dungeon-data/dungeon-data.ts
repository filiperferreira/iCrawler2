import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";

export interface Dungeon {
    name: string,
    action: number,
    exploration: {current: number, max: number},
    action_list: Action[]
}

export interface Action {
    name: string,
    id: number,
    unlockedAt: number,
    action: (dungeon: DungeonDataService, player: PlayerDataService) => void
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: -1,
    exploration: {current: 0, max: 100},
    action_list: [
        {name: "Explore", 
        id: 0,
        unlockedAt: 0,
        action: function(dungeon: DungeonDataService, player: PlayerDataService) {
            if (!dungeon.isFullyExplored()) {
                dungeon.explore(1);
                player.gainExp(3,1);
            }
        }},
        {name: "Gather Herbs", id: 1, unlockedAt: 10, action: function() {}}]
}