const { createLogger, format, transports } = require('winston');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Log to console

    // Log rotation with daily rotation and deletion after 7 days
    new DailyRotateFile({
      filename: path.join(__dirname, '../../Logs', '%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d', // Keep logs for 7 days and delete older logs
      zippedArchive: true, // Optional: compress older log files
    }),
  ],
});

// Export the logger
module.exports = logger;
