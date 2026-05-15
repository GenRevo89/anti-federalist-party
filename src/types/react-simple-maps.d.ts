declare module "react-simple-maps" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: { scale?: number; center?: [number, number]; rotate?: [number, number, number] };
    style?: CSSProperties;
    width?: number;
    height?: number;
    children?: ReactNode;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: any[] }) => ReactNode;
  }

  interface GeographyStyleProps {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    transition?: string;
    cursor?: string;
  }

  interface GeographyProps {
    geography: any;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: {
      default?: GeographyStyleProps;
      hover?: GeographyStyleProps;
      pressed?: GeographyStyleProps;
    };
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
}
