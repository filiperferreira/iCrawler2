import { LogWindowDataService } from "src/app/log-window/log-window-data/log-window-data.service";
import { PlayerDataService } from "src/app/player/player-data/player-data.service";

export interface Item {
    name: string,
    description: string,
    amount: number,
    action?: (player: PlayerDataService, messageLog: LogWindowDataService) => void
}

export interface Inventory {
    items: Item[]
}

export const INVENTORY: Inventory = {
    items: [{
        name: "Anima",
        description: "A piece of the life essence of the beings you have killed",
        amount: 0,
        action: undefined
    }, {
        name: "Green Herb",
        description: "Restores 25 HP",
        amount: 0,
        action: function(player, messageLog) {
            player.restoreHP(25);
            messageLog.addMessageToLog("You restored 25 HP.");
        }
    }]
}