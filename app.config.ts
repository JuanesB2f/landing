export default defineAppConfig({
  ui: {
    breadcrumb: {
      variants: {
        active: {
          true: {
            link: "text-[var(--color-custom-50)] dark:text-[var(--color-custom-500)] font-semibold",
          },
          false: {
            link: "text-[var(--color-custom-300)] dark:text-[var(--color-custom-300)]",
          },
        },
      },
    },
    button: {
      slots: {
        base: "cursor-pointer px-4 rounded-2xl font-medium",
      },
      variants: {
        color: {
          secondary:
            "bg-white/60 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/15 text-[var(--color-custom-500)] dark:text-[var(--color-custom-50)] border border-black/5 dark:border-white/10",
        },
        variant: {
          subtle:
            "bg-white/50 dark:bg-white/10 backdrop-blur-md text-[var(--color-custom-500)] dark:text-[var(--color-custom-50)] border border-black/5 dark:border-white/10",
        },
      },
    },
    toast: {
      slots: {
        root: "ring-0 rounded-2xl backdrop-blur-xl bg-white/85 dark:bg-gray-900/85 shadow-lg",
      },
    },
    input: {
      slots: {
        base: "rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-md text-[var(--color-custom-500)] dark:text-[var(--color-custom-50)] border border-black/10 dark:border-white/15",
      },
    },
    card: {
      variants: {
        variant: {
          solid: {
            root: "ring-0 rounded-2xl backdrop-blur-xl bg-white/55 dark:bg-white/10 border border-black/8 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
          },
        },
      },
      defaultVariants: {
        variant: "solid",
      },
    },
    formField: {
      slots: {
        label:
          "text-[var(--color-custom-50)] dark:text-[var(--color-custom-500)]",
      },
    },
  },
});
