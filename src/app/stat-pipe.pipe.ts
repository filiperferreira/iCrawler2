import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statPipe'
})
export class StatPipePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "Strength":
        return "STR";
      case "Dexterity":
        return "DEX";
      case "Constitution":
        return "CON";
      case "Speed":
        return "SPD";
      case "Magic":
        return "MGC";
      case "Luck":
        return "LUK";
      default:
        return "ERR";
    }
  }
}
