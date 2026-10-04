// Light / dark mode.
// Starts with the visitor's device setting; the toggle button overrides it
// and the choice is remembered for their next visit.
(function () {
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function save(theme) {
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }
  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var button = document.querySelector(".theme-toggle");
    if (button) {
      var label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    }
  }

  // Set the theme right away so the page doesn't flash the wrong colors.
  apply(saved() || systemTheme());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme"));
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    button.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      save(next);
    });
  });
})();
