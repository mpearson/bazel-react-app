import { Color } from '@deck.gl/core/typed';

/**
 * Convert a hex string (e.g. "ff0000") to an array of RGB values (e.g. [255, 0, 0]).
 */
export const hexToRgb = (hex: string): Color => {
  const rgb = hex.match(/[0-9a-f]{2}/ig)?.map((channelHex: string) => parseInt(channelHex, 16));
  if (rgb === undefined || rgb.length < 3 || rgb.length > 4) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return rgb as Color;
};
