import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {


  describe("Given Random Item", () => {
    it("should reduce sellin value", () => {
      const gildedRose = new GildedRose([new Item("BattleAxe", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: "BattleAxe",
        sellIn: -1,
        quality: 0,
      });
    });

    it("should reduce sellin by 2 if its value is negative", () => {
      const gildedRose = new GildedRose([new Item("BattleAxe", -1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: "BattleAxe",
        sellIn: -2,
        quality: 0,
      });
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
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
});
