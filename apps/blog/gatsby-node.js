const path = require("path");

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  // Locate the CSS rule in Gatsby's webpack config
  const cssRule = config.module.rules.find(
    (rule) => String(rule.test) === String(/\.css$/),
  );

  if (cssRule) {
    // Modify the include paths to process CSS from the UI library
    cssRule.include = [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "../../packages/ui/src"),
    ];
  }

  actions.replaceWebpackConfig(config);
};
