import { UAParser } from "ua-parser-js";

export const isMobile = (ua?: string): boolean => {
  return !isDesktop(ua);
};

export const isDesktop = (ua?: string): boolean => {
  const device = UAParser(ua).device;
  return (
    device.type === undefined || !["wearable", "mobile"].includes(device.type)
  );
};
