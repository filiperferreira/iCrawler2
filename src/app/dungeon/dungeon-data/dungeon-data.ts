import { PlayerDataService } from "src/app/player/player-data/player-data.service";
import { DungeonDataService } from "./dungeon-data.service";

export interface Dungeon {
    name: string,
    action?: Action,
    exploration: {current: number, max: number},
    action_list: Action[]
}

export interface Action {
    name: string,
    unlockedAt: number,
    action: (dungeon: DungeonDataService, player: PlayerDataService) => void
}

export const DUNGEON: Dungeon = {
    name: "Forest",
    action: undefined,
    exploration: {current: 0, max: 100},
    action_list: [{
        name: "Explore", 
        unlockedAt: 0,
        action: function(dungeon: DungeonDataService, player: PlayerDataService) {
            if (!dungeon.isFullyExplored()) {
                dungeon.explore(1);
                player.gainExp(3,1);
            }
        }
    },{
        name: "Gather Herbs",
        unlockedAt: 10,
        action: function(dungeon: DungeonDataService, player: PlayerDataService) {
            console.log("hi?");
        }
    }]
}