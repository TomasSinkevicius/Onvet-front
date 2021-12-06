const breakpoints = {
  sm_360: "360px",
  sm: "585px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xl_1350: "1350px",
  xxl: "1420px",
};

// Usage:
// ${mediaQuery('md')} {
//    background-color: red;
// }

export const mediaQuery = (key, type = "max", customSize) =>
  `@media (${type}-width: ${
    customSize && !key ? customSize : breakpoints[key]
  })`;
