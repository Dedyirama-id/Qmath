import CONFIG from '../globals/config';

const QmathConfig = {
  getAllConfig() {
    const qmathConfig = JSON.parse(localStorage.getItem(CONFIG.QMATH_CONFIG_STORE_NAME));
    if (!qmathConfig) {
      return {
        error: 'Please select configuration',
      };
    }

    if (!Object.values(qmathConfig.options).includes(true)) {
      return {
        error: 'Please select at least one option',
      };
    }

    return qmathConfig;
  },

  saveConfig({ options, level }) {
    localStorage.setItem(CONFIG.QMATH_CONFIG_STORE_NAME, JSON.stringify({ options, level }));
  },

  getOptions() {
    const qmathConfig = this.getAllConfig();
    return qmathConfig.options;
  },

  getLevel() {
    const qmathConfig = this.getAllConfig();
    return qmathConfig.level;
  },
};

export default QmathConfig;
