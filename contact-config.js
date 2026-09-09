// Public configuration only. Never put an API key or password in this file.
// See the private integration notes before enabling a remote destination.
window.POINT_SEPARATION_CONTACT = Object.freeze({
  mode: "local", // local | webhook | external
  webhookUrl: "",
  formUrl: "",
  privacyNoticeUrl: "", // Published collection notice, required for webhook mode.
  timeoutMs: 15000,
});
