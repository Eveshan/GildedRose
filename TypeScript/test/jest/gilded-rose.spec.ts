import {  GildedRose } from "@/gilded-rose";
import { Item } from "@/Item";

xdescribe("Gilded Rose", () => {
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
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toEqual({
        name: "Aged Brie",
        sellIn: 9,
        quality: 21,
      });
    });

    describe("within sell in", () => {
      it("should increase by 1 in quality when given quality is less than 50", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 3, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: 2,
          quality: 50,
        });
      });

      it("should not change in quality when given quality is 50", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 3, 50)]);
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
        const gildedRose = new GildedRose([new Item("Aged Brie", -1, 48)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: -2,
          quality: 50,
        });
      });

      it("should not allow quality greater than 50", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", -1, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual({
          name: "Aged Brie",
          sellIn: -2,
          quality: 50,
        });
      });
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

    it("with sellin greater than 10 days should increase by 2 in quality on boundary", () => {
      //Arrange
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 10, 20)]);

      //Act
      const items = gildedRose.updateQuality();

      //Expect
      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: BACKSTAGE_PASSES,
        sellIn: 9,
        quality: 22,
      });
    });

    it("with sellin less than 10 days should increase by 2 in quality", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 9, 20)]);
      const items = gildedRose.updateQuality();

      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: BACKSTAGE_PASSES,
        sellIn: 8,
        quality: 22,
      });
    });

    it("with sellin less than 6 days should increase by 2 in quality", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 6, 20)]);
      const items = gildedRose.updateQuality();

      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: BACKSTAGE_PASSES,
        sellIn: 5,
        quality: 22,
      });
    });

    it("with sellin less than 5 days should increase by 3 in quality", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 5, 20)]);
      const items = gildedRose.updateQuality();

      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: BACKSTAGE_PASSES,
        sellIn: 4,
        quality: 23,
      });
    });

    it("with sellin reachin 0 days should make decrease quality zero", () => {
      const gildedRose = new GildedRose([new Item(BACKSTAGE_PASSES, 0, 20)]);
      const items = gildedRose.updateQuality();

      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: BACKSTAGE_PASSES,
        sellIn: -1,
        quality: 0,
      });
    });
  });

  describe.skip("Conjured", () => {
    it("should decrease in quality twice as fast", () => {
      //Arrange
      const gildedRose = new GildedRose([new Item("Conjured", 10, 20)]);

      //Act
      const items = gildedRose.updateQuality();

      //Expect
      expect(items.length).toEqual(1);
      expect(items[0]).toEqual({
        name: "Conjured",
        sellIn: 9,
        quality: 18,
      });
    });
  });
});
