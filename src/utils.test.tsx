import { hexToRgb } from './utils';

describe("hextToRgb()", () => {
  it("converts hex codes to 0-255 RGB values", () => {
    expect(hexToRgb("000000")).toEqual([0, 0, 0]);
    expect(hexToRgb("7acc13")).toEqual([122, 204, 19]);
    expect(hexToRgb("#7acc13")).toEqual([122, 204, 19]);
    expect(hexToRgb("#7ACC13")).toEqual([122, 204, 19]);
    expect(hexToRgb("#7ACC13f0")).toEqual([122, 204, 19, 240]);
  });
});
