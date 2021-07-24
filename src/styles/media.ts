type MediaType = "min" | "max";

const mediaQuery = (width: number) => (type: MediaType) => `
  @media (${type}-width: ${width}px)
`;

const customQuery = (type: MediaType, width: number) => `
  @media (${type}-width: ${width}px)
`;

const media = {
  xlarge: mediaQuery(1440),
  desktop: mediaQuery(1200),
  laptop: mediaQuery(721),
  tablet: mediaQuery(581),
  custom: customQuery,
};

export default media;
