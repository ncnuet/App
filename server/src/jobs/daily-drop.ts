import cron from "node-cron";

cron.schedule("0 0 0 */5 * *", ()=>{ // Running task every 5 days
    // TODO: delete expried refresh token
}).start()

// console.log(cron.validate("0 0 0 */5 * *"));