// client-src/main.ts
import {
  Player,
  log,
  on,
  onServer,
  setTimeout
} from "alt-client";
import {
  setClockTime
} from "natives";
setClockTime(15, 0, 0);
onServer("connectionComplete", () => {
  setTimeout(() => {
    log("connected");
  }, 2e3);
});
on("gameEntityCreate", (entity) => {
  const isCar = entity instanceof Player;
  log("Entity: " + isCar);
});
