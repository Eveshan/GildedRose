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
    it("should not change quality or sellin for legendary items", () => {
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

  describe("Aged Brie", () => {
    it("should increase by 1 in quality", () => {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", 10, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: "Aged Brie",
        sellIn: 9,
        quality: 21,
      });
    });

    describe("within sell in", () => {
      it("should increase by 1 in quality when given quality is less than 50", () => {
        const gildedRose = new GildedRose([
          new Item("Aged Brie", 3, 49),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: 2,
          quality: 50,
        });
      });

      it("should not change in quality when given quality is 50", () => {
        const gildedRose = new GildedRose([
          new Item("Aged Brie", 3, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: 2,
          quality: 50,
        });
      });
    });

    describe("outside sell in", () => {
      it("should increase by 2 in quality when given quality is less than 49", () => {
        const gildedRose = new GildedRose([
          new Item("Aged Brie", -1, 48),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: -2,
          quality: 50,
        });
      });

      it("should not allow quality greater than 50", () => {
        const gildedRose = new GildedRose([
          new Item("Aged Brie", -1, 49),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: -2,
          quality: 50,
        });
      });
    });
  });
});
