/**
 * Plugin de rendimiento (ligero).
 * El parche global de localStorage y listeners duplicados se eliminaron:
 * el debounce en setItem rompía lecturas síncronas y añadía CPU en cada escritura.
 */
export default defineNuxtPlugin(() => {})
