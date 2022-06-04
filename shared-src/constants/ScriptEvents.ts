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
    IncrementDeaths: 'gui:stats:incrementDeaths'
  }
};
