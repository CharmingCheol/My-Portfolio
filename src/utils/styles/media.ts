export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xxlarge: mediaQuery(1920),
  xlarge: mediaQuery(1440),
  large: mediaQuery(1200),
  laptop: mediaQuery(1024),
  tablet: mediaQuery(769),
  smallTablet: mediaQuery(600),
  mobile: mediaQuery(480),
  custom: mediaQuery,
};

export default media;
