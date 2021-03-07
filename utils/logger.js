'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.LoggerFactory = exports.getDefaultLogger = exports.printLog = exports.LOG_LEVELS = void 0;
const LOG_LEVELS = {
  DEBUG: 'debug',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  ALL: 'all',
};
exports.LOG_LEVELS = LOG_LEVELS;

const colorLog = (level) => {
  switch (level) {
    case LOG_LEVELS.WARNING:
      return 'color: Orange';

    case LOG_LEVELS.ERROR:
      return 'color: Red';

    default:
      return 'color: Gray';
  }
};

const printLog = ({ level, title, description = '' }) => {
  // eslint-disable-next-line no-console
  console.log(
    `%cSBChatAction | ${level.toUpperCase()} | ${new Date().toISOString()} | ${title} ${
      description && '|'
    }`,
    colorLog(level),
    description
  );
};

exports.printLog = printLog;

const getDefaultLogger = () => ({
  info: () => {},
  error: () => {},
  warning: () => {},
});

exports.getDefaultLogger = getDefaultLogger;

const LoggerFactory = (lvl, customInterface) => {
  const logInterface = customInterface || printLog;
  const lvlArray = Array.isArray(lvl) ? lvl : [lvl];

  const applyLog = (lgLvl) => (title, description) =>
    logInterface({
      level: lgLvl,
      title,
      description,
    });

  const logger = lvlArray.reduce((accumulator, currentLvl) => {
    if (currentLvl === LOG_LEVELS.DEBUG || currentLvl === LOG_LEVELS.ALL) {
      return {
        ...accumulator,
        info: applyLog(LOG_LEVELS.INFO),
        error: applyLog(LOG_LEVELS.ERROR),
        warning: applyLog(LOG_LEVELS.WARNING),
      };
    }

    if (currentLvl === LOG_LEVELS.INFO) {
      return { ...accumulator, info: applyLog(LOG_LEVELS.INFO) };
    }

    if (currentLvl === LOG_LEVELS.ERROR) {
      return { ...accumulator, error: applyLog(LOG_LEVELS.ERROR) };
    }

    if (currentLvl === LOG_LEVELS.WARNING) {
      return { ...accumulator, warning: applyLog(LOG_LEVELS.WARNING) };
    }

    return { ...accumulator };
  }, getDefaultLogger());
  return logger;
};

exports.LoggerFactory = LoggerFactory;
