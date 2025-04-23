import antfu from "@antfu/eslint-config"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(antfu({
	standalone: false,
	stylistic: {
		indent: "tab",
		quotes: "double",
	},
	rules: {
		"no-console": "warn",
	},
}))
