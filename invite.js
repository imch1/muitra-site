(function () {
  function inviteCodeFromLocation() {
    var params = new URLSearchParams(window.location.search);
    var queryCode = params.get("code");
    if (queryCode) return queryCode;

    var parts = window.location.pathname.split("/").filter(Boolean);
    var inviteIndex = parts.indexOf("invite");
    if (inviteIndex >= 0 && parts[inviteIndex + 1]) return parts[inviteIndex + 1];
    return "";
  }

  function normalizedCode() {
    return decodeURIComponent(inviteCodeFromLocation()).trim().toUpperCase();
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    return Promise.resolve();
  }

  var code = normalizedCode();
  var codeNode = document.getElementById("inviteCode");
  var copyButton = document.getElementById("copyInviteCode");
  var copiedNode = document.getElementById("inviteCopied");
  var openAppButton = document.getElementById("openAppBtn");

  if (codeNode) codeNode.textContent = code || "------";
  if (openAppButton) {
    openAppButton.href = code ? "muitra://join?code=" + encodeURIComponent(code) : "muitra://join";
  }

  if (copyButton) {
    copyButton.disabled = !code;
    copyButton.addEventListener("click", function () {
      if (!code) return;
      copyText(code).then(function () {
        if (!copiedNode) return;
        copiedNode.hidden = false;
        window.setTimeout(function () {
          copiedNode.hidden = true;
        }, 1800);
      });
    });
  }
})();
