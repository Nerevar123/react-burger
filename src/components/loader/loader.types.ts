export enum ESizes {
  small = 16,
  medium = 24,
  large = 40,
}

export interface ILoaderProps {
  size: ESizes;
  inverse: boolean;
}

export interface ILoaderSvgProps {
  color: string;
  size: ESizes;
}
