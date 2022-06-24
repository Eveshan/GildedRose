import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should reduce sellin value on random item", () => {
    const gildedRose = new GildedRose([new Item("BattleAxe", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual({
      name: "BattleAxe",
      sellIn: -1,
      quality: 0,
    });
  });

  it("should reduce sellin by 2 if its value is negative on random item", () => {
    const gildedRose = new GildedRose([new Item("BattleAxe", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual({
      name: "BattleAxe",
      sellIn: -2,
      quality: 0,
    });
  });

  it("should not reduce quality or sellin for legendary items", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual({
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 10,
      quality: 20,
    });
  });
});
