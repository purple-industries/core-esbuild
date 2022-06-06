export const ScriptEvents = {
  Webview: {
    EmitToServer: 'gui:webview:emitServer',
    EmitToGuiFromServer: 'gui:emitToGui',
    RouteTo: 'gui:webview:setRoute'
  },
  Client: {
    ConnectionComplete: 'client:connectionComplete'
  },
  Auth: {
    Request: 'gui:auth:requestAuth',
    SendUserDataToServer: 'server:auth:sendUserDataToServer'
  },
  Stats: {
    RequestStats: 'gui:stats:requestStats',
    ReceiveStats: 'gui:stats:receiveStats',
    IncrementKills: 'gui:stats:incrementKills',
    IncrementDeaths: 'gui:stats:incrementDeaths',
    UpdateStats: 'gui:stats:updateStats'
  },
  Notification: {
    Receive: 'gui:notification:receive'
  },
  Control: {
    DisableAll: 'client:player:disableAllControls',
    EnableAll: 'client:player:enableAllControls',
    ToggleGameControls: 'client:player:toggleGameControls'
  },
  Countdown: { StartCountdown: 'client:countdown:startCountdown' },
  Queue: {
    Register: 'queue:registerQueue'
  },
  OneVsOne: {
    PlayerKill: 'onevsone:PlayerKill'
  }


};
