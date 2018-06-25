import React from 'react';
import { AsyncIntlProvider } from '@bone/intl-helper';
import { config, logger } from '@bone/living-sdk';
import { LOCALE_DEFAULT } from '../config/constants';
import localMessages from '../config/i18n';

const log = logger('layout/global');

export default function (AppContainer) {
  return class MainContainer extends React.Component {
    async componentWillMount() {
      AsyncIntlProvider.config = {
        appName: 'IoT-Living-mobile-plugin-scene',
        locale: LOCALE_DEFAULT,
        localMessages,
      };

      try {
        const conf = await config.fetch();
        if (conf && conf.language) {
          AsyncIntlProvider.config = {
            ...AsyncIntlProvider.config,
            locale: conf.language,
          };
        }
      } catch (err) {
        log.error('get config error:', err.message);
      }
    }

    render() {
      return (
        <AsyncIntlProvider>
          <AppContainer {...this.props} />
        </AsyncIntlProvider>
      );
    }
  };
}
