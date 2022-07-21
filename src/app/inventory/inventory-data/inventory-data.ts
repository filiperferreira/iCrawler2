import { PlayerDataService } from "src/app/player/player-data/player-data.service";

export interface Item {
    name: string,
    description: string,
    amount: number,
    action: (player: PlayerDataService) => void
}

export interface Inventory {
    items: Item[]
}

export const INVENTORY: Inventory = {
    items: [{
        name: "Green Herb",
        description: "Restores 25 HP",
        amount: 0,
        action: function(player) {
            player.restoreHP(25);
        }
    }]
}