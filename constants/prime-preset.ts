import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{soho.50}",
      100: "{soho.100}",
      200: "{soho.200}",
      300: "{soho.300}",
      400: "{soho.400}",
      500: "{soho.500}",
      600: "{soho.600}",
      700: "{soho.700}",
      800: "{soho.800}",
      900: "{soho.900}",
      950: "{soho.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.950}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.800}",
          activeColor: "{primary.700}",
        },
        highlight: {
          background: "{primary.950}",
          focusBackground: "{primary.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
      },
      dark: {
        primary: {
          color: "{primary.50}",
          contrastColor: "{primary.950}",
          hoverColor: "{primary.200}",
          activeColor: "{primary.300}",
        },
        highlight: {
          background: "{primary.50}",
          focusBackground: "{primary.300}",
          color: "{primary.950}",
          focusColor: "{primary.950}",
        },
      },
    },
  },
});
