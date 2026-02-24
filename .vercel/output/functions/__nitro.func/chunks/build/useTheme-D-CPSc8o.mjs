import { ref, computed, readonly } from 'vue';

const useTheme = () => {
  const theme = ref("light");
  const isDark = computed(() => theme.value === "dark");
  const initTheme = () => {
  };
  const toggleTheme = () => {
    theme.value = isDark.value ? "light" : "dark";
  };
  const setTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      theme.value = newTheme;
    }
  };
  const watchSystemTheme = () => {
  };
  return {
    theme: readonly(theme),
    isDark,
    toggleTheme,
    setTheme,
    initTheme,
    watchSystemTheme
  };
};

export { useTheme as u };
//# sourceMappingURL=useTheme-D-CPSc8o.mjs.map
