export const getItem = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`localStorage: failed to read "${key}"`, error);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`localStorage: failed to write "${key}"`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`localStorage: failed to remove "${key}"`, error);
    return false;
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("localStorage: failed to clear", error);
    return false;
  }
};
