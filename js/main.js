/* 杜玉 · 深夜主场 — 交互脚本（纯原生 JS，无任何依赖与密钥） */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 页脚年份 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 阅读进度条 ---------- */
  var progress = document.querySelector(".progress");
  if (progress) {
    var updateProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      progress.style.width = pct + "%";
    };
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- 滚动渐显 ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- 代码卡片状态轮播 ---------- */
  var statusEl = document.getElementById("statusText");
  if (statusEl && !reduceMotion) {
    var statuses = ['"睡觉中 zzz"', '"吃魔芋爽中…"', '"双排中，勿扰"', '"研究卡网技巧"'];
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % statuses.length;
      statusEl.style.opacity = "0";
      setTimeout(function () {
        statusEl.textContent = statuses[idx];
        statusEl.style.opacity = "1";
      }, 220);
    }, 3400);
  }

  /* ---------- 睡眠模式（彩蛋） ---------- */
  var sleepBtn = document.getElementById("sleepToggle");
  if (sleepBtn) {
    sleepBtn.addEventListener("click", function () {
      var on = document.body.classList.toggle("sleep");
      sleepBtn.setAttribute("aria-pressed", String(on));
      var label = sleepBtn.querySelector(".nav__sleep-text");
      if (label) label.textContent = on ? "起床了" : "睡眠模式";
    });
  }

  /* ---------- 魔芋爽粒子（彩蛋） ---------- */
  if (!reduceMotion) {
    document.querySelectorAll(".js-spicy").forEach(function (el) {
      el.addEventListener("click", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX || rect.left + rect.width / 2;
        var y = e.clientY || rect.top + rect.height / 2;
        for (var i = 0; i < 16; i++) {
          var p = document.createElement("span");
          p.className = "particle";
          var angle = Math.random() * Math.PI * 2;
          var dist = 40 + Math.random() * 95;
          p.style.left = x + "px";
          p.style.top = y + "px";
          p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
          p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
          if (Math.random() > 0.55) p.style.background = "var(--accent)";
          document.body.appendChild(p);
          p.addEventListener("animationend", function () { this.remove(); });
        }
      });
    });
  }

  /* ---------- 复制邮箱 ---------- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    var originalText = copyBtn.textContent;
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "";
      var done = function () {
        copyBtn.textContent = "已复制 ✓";
        setTimeout(function () { copyBtn.textContent = originalText; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          fallbackCopy(email, done);
        });
      } else {
        fallbackCopy(email, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (err) { /* 忽略 */ }
    ta.remove();
  }
})();
