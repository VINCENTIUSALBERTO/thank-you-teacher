// Generate stable random values for animations
// Uses index-based seeding for consistent values across renders

export function generateRandomStyles(count, options = {}) {
  const {
    minLeft = 0,
    maxLeft = 100,
    minTop = 0,
    maxTop = 100,
    minDelay = 0,
    maxDelay = 5,
    minDuration = 2,
    maxDuration = 4,
    minSize = 10,
    maxSize = 25
  } = options;

  // Use seeded random for consistent values
  const seededRandom = (seed) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => ({
    left: `${minLeft + seededRandom(i * 1) * (maxLeft - minLeft)}%`,
    top: `${minTop + seededRandom(i * 2) * (maxTop - minTop)}%`,
    animationDelay: `${minDelay + seededRandom(i * 3) * (maxDelay - minDelay)}s`,
    animationDuration: `${minDuration + seededRandom(i * 4) * (maxDuration - minDuration)}s`,
    fontSize: `${minSize + seededRandom(i * 5) * (maxSize - minSize)}px`
  }));
}

// Pre-generated styles for common use cases
export const STAR_STYLES = generateRandomStyles(50, {
  maxDelay: 3,
  minDuration: 2,
  maxDuration: 4
});

export const PETAL_STYLES = generateRandomStyles(15, {
  maxDelay: 5,
  minDuration: 8,
  maxDuration: 12
});

export const BLOSSOM_STYLES = generateRandomStyles(30, {
  maxDelay: 5,
  minDuration: 6,
  maxDuration: 10
});

export const LEAF_STYLES = generateRandomStyles(25, {
  maxDelay: 5,
  minDuration: 8,
  maxDuration: 12
});

export const SNOWFLAKE_STYLES = generateRandomStyles(40, {
  maxDelay: 5,
  minDuration: 5,
  maxDuration: 10,
  minSize: 10,
  maxSize: 25
});

export const FLOATING_STAR_STYLES = generateRandomStyles(20, {
  maxDelay: 3,
  minDuration: 2,
  maxDuration: 4
});

export const HEART_STYLES = generateRandomStyles(30, {
  maxDelay: 5,
  minDuration: 8,
  maxDuration: 12,
  minSize: 15,
  maxSize: 35
});

export const SPARKLE_STYLES = generateRandomStyles(50, {
  maxDelay: 2,
  minDuration: 1,
  maxDuration: 2
});
