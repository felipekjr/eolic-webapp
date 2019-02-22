import {L10nConfig, ProviderType, StorageStrategy} from 'angular-l10n';

export const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      {code: 'pt', dir: 'ltr'}
    ],
    language: 'pt_br',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      {type: ProviderType.Static, prefix: './assets/locale/locale-'}
    ],
    caching: true,
  }
};
