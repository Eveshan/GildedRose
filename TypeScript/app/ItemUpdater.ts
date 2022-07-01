import { Item } from "./Item";
import { ItemName } from "./ItemType";

export function update(item: Item) {

  if (item.name != ItemName.AgedBrie && item.name != ItemName.Backstage) {
    if (item.quality > 0) {
      if (item.name != ItemName.Sulfuras) {
        item.quality = item.quality - 1;
      }
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == ItemName.Backstage) {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }

  if (item.name != ItemName.Sulfuras) {
    item.sellIn = item.sellIn - 1;
  }

  if (item.sellIn < 0) {
    if (item.name != ItemName.AgedBrie) {
      if (item.name != ItemName.Backstage) {
        if (item.quality > 0) {
          if (item.name != ItemName.Sulfuras) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
   return item;
}
