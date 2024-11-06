import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import PreviewButton from './components/PreviewButton';

export default {
  register(app: any) {

    app.getPlugin('content-manager').apis.addEditViewSidePanel([PreviewButton]);

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      (locales as string[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
