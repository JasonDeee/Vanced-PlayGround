const GerenalConfig = {
  version: "1.0",
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("vanced-popup-container");
  const previewCanvas = document.getElementById("preview-canvas"); // New target for CSS vars
  const staticPreviewArea = document.getElementById("static-preview-area");
  const generator = window.vancedPopUp;

  // --- VISUAL BINDINGS ---
  const visualInputs = {
    "--vp-bg-color": "bg-color",
    "--vp-text-color": "text-color",
    "--vp-highlight-color": "highlight-color",
    "--vp-border-color": "border-color",
  };

  // Color & Opacity
  const bgColorInput = document.getElementById("bg-color");
  const bgOpacityInput = document.getElementById("bg-opacity");

  function updateBg() {
    const color = bgColorInput.value;
    const opacity = bgOpacityInput.value;
    // Convert hex to rgba
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    // Set on previewCanvas so valid for both static and animated popups
    previewCanvas.style.setProperty(
      "--vp-bg-color",
      `rgba(${r}, ${g}, ${b}, ${opacity})`,
    );
  }

  bgColorInput.addEventListener("input", updateBg);
  bgOpacityInput.addEventListener("input", updateBg);

  // Other Colors
  Object.keys(visualInputs).forEach((varName) => {
    if (varName === "--vp-bg-color") return; // Handled above
    const inputId = visualInputs[varName];
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener("input", (e) => {
        previewCanvas.style.setProperty(varName, e.target.value);
      });
    }
  });

  // Radius
  const radiusInput = document.getElementById("border-radius");
  const radiusVal = document.getElementById("val-radius");
  radiusInput.addEventListener("input", (e) => {
    const val = e.target.value + "px";
    previewCanvas.style.setProperty("--vp-border-radius", val);
    radiusVal.textContent = val;
  });

  // Border
  const borderEnable = document.getElementById("border-enable");
  const borderWidth = document.getElementById("border-width");
  const borderColor = document.getElementById("border-color");

  function updateBorder() {
    if (borderEnable.checked) {
      const width = borderWidth.value + "px";
      const color = borderColor.value;
      previewCanvas.style.setProperty("--vp-border-width", width);
      previewCanvas.style.setProperty("--vp-border-color", color);

      // We need to apply border-style to all popups manually or via CSS var?
      // Since style.scss uses border: var(--vp-border-width) solid ...
      // We can just rely on vars, but wait, style.scss has:
      // border: var(--vp-border-width) solid var(--vp-border-color);
      // So setting width to 0px hides it.
      // But logic was handling borderStyle 'none'.
      // Let's set --vp-border-width to 0px if disabled.
    } else {
      previewCanvas.style.setProperty("--vp-border-width", "0px");
    }
  }

  borderEnable.addEventListener("change", updateBorder);
  borderWidth.addEventListener("input", updateBorder);
  borderColor.addEventListener("input", updateBorder);

  // --- BEHAVIOR BINDINGS ---
  const animSpeedInput = document.getElementById("anim-speed");
  const animSpeedVal = document.getElementById("val-speed");

  animSpeedInput.addEventListener("input", (e) => {
    const val = e.target.value + "s";
    previewCanvas.style.setProperty("--vp-transition-speed", val);
    animSpeedVal.textContent = val;
  });

  // Logic updates (Delay, Time)
  const displayTimeInput = document.getElementById("display-time");
  const delayTimeInput = document.getElementById("delay-time");

  function updateLogicTiming() {
    if (generator && generator.animator) {
      generator.animator.updateConfig({
        displayDuration: parseInt(displayTimeInput.value),
        delayBetween: parseInt(delayTimeInput.value),
      });
    }
  }

  displayTimeInput.addEventListener("change", updateLogicTiming);
  delayTimeInput.addEventListener("change", updateLogicTiming);

  // Viewer Range
  const viewerMin = document.getElementById("viewer-min");
  const viewerMax = document.getElementById("viewer-max");

  function updateViewerRange() {
    if (generator) {
      generator.viewerRange = {
        min: parseInt(viewerMin.value),
        max: parseInt(viewerMax.value),
      };
    }
  }
  viewerMin.addEventListener("change", updateViewerRange);
  viewerMax.addEventListener("change", updateViewerRange);

  // --- ANIMATION TYPE ---
  const animTypeSelect = document.getElementById("anim-type");
  const animClasses = [
    "anim-slide-up",
    "anim-fade",
    "anim-zoom",
    "anim-slide-side",
  ];

  if (animTypeSelect) {
    animTypeSelect.addEventListener("change", (e) => {
      container.classList.remove(...animClasses);
      container.classList.add(e.target.value);
    });
  }

  // --- PLAY / PAUSE ---
  const togglePlayBtn = document.getElementById("toggle-play");
  const playIcon = document.getElementById("play-icon");

  // Initial State: Paused
  // generator should be paused by default (set in ScriptGenerator)
  // We need to sync UI
  if (generator && !generator.isPlaying) {
    staticPreviewArea.style.display = "flex";
    container.style.display = "none"; // Hide animated container
  }

  togglePlayBtn.addEventListener("click", () => {
    if (generator) {
      if (generator.isPlaying) {
        // Determine to Pause
        generator.pause();
        playIcon.textContent = "▶ Play Animation";
        togglePlayBtn.classList.remove("bg-red-100", "text-red-700");

        // Show Static, Hide Animated
        staticPreviewArea.style.display = "flex";
        container.style.display = "none";
      } else {
        // Determine to Play
        generator.play();
        playIcon.textContent = "⏸ Pause Animation";
        togglePlayBtn.classList.add("bg-red-100", "text-red-700");

        // Hide Static, Show Animated
        staticPreviewArea.style.display = "none";
        container.style.display = "block";

        // FIX: Clear inline opacity/pointer-events so .active class works
        container.style.opacity = "";
        container.style.pointerEvents = "";
      }
    }
  });

  // --- PADDING LOGIC (Refactored) ---
  const padTop = document.getElementById("pad-top");
  const padRight = document.getElementById("pad-right");
  const padBottom = document.getElementById("pad-bottom");
  const padLeft = document.getElementById("pad-left");
  const padConstrainBtn = document.getElementById("padding-constrain");
  let padConstrain = true;

  function updatePadding() {
    const t = padTop.value;
    const r = padRight.value;
    const b = padBottom.value;
    const l = padLeft.value;
    const pVal = `${t}px ${r}px ${b}px ${l}px`;
    previewCanvas.style.setProperty("--vp-padding", pVal);
  }

  // Bind inputs
  [padTop, padRight, padBottom, padLeft].forEach((input) => {
    input.addEventListener("input", (e) => {
      const val = e.target.value;
      if (padConstrain) {
        padTop.value = val;
        padRight.value = val;
        padBottom.value = val;
        padLeft.value = val;
      }
      updatePadding();
    });
  });

  padConstrainBtn.addEventListener("click", () => {
    padConstrain = !padConstrain;
    if (padConstrain) {
      padConstrainBtn.classList.add(
        "text-primary",
        "font-bold",
        "bg-primary/10",
      );
      padConstrainBtn.classList.remove("text-muted-foreground");
      // Sync to top value
      const val = padTop.value;
      padRight.value = val;
      padBottom.value = val;
      padLeft.value = val;
      updatePadding();
    } else {
      padConstrainBtn.classList.remove(
        "text-primary",
        "font-bold",
        "bg-primary/10",
      );
      padConstrainBtn.classList.add("text-muted-foreground");
    }
  });

  // --- SHADOW LOGIC ---
  const shadowEnable = document.getElementById("shadow-enable");
  const shadowX = document.getElementById("shadow-x");
  const shadowY = document.getElementById("shadow-y");
  const shadowBlur = document.getElementById("shadow-blur");
  const shadowColor = document.getElementById("shadow-color");
  const shadowOpacity = document.getElementById("shadow-opacity");
  const valShadowBlur = document.getElementById("val-shadow-blur");

  function updateShadow() {
    if (!shadowEnable.checked) {
      previewCanvas.style.setProperty("--vp-shadow", "none");
      return;
    }

    const x = shadowX.value + "px";
    const y = shadowY.value + "px";
    const blur = shadowBlur.value + "px";

    // Color HEX to RGBA
    const hex = shadowColor.value;
    const alpha = shadowOpacity.value;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const color = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    const shadowVal = `${x} ${y} ${blur} 0 ${color}`;
    previewCanvas.style.setProperty("--vp-shadow", shadowVal);

    valShadowBlur.textContent = blur;
  }

  [
    shadowEnable,
    shadowX,
    shadowY,
    shadowBlur,
    shadowColor,
    shadowOpacity,
  ].forEach((input) => {
    input.addEventListener("input", updateShadow);
  });
  // Init Shadow
  updateShadow();

  // --- CONTENT ---
  const positionSelect = document.getElementById("position-select");
  positionSelect.addEventListener("change", (e) => {
    const pos = e.target.value;
    // Reset defaults
    container.style.top = "auto";
    container.style.bottom = "auto";
    container.style.left = "auto";
    container.style.right = "auto";

    if (pos === "bottom-left") {
      container.style.bottom = "20px";
      container.style.left = "20px";
    } else if (pos === "bottom-right") {
      container.style.bottom = "20px";
      container.style.right = "20px";
    } else if (pos === "top-left") {
      container.style.top = "20px";
      container.style.left = "20px";
    } else if (pos === "top-right") {
      container.style.top = "20px";
      container.style.right = "20px";
    }
  });

  // Avatar Logic
  const useAvatarCheck = document.getElementById("use-avatar");
  const avatarConfigArea = document.getElementById("avatar-config-area");
  const avatarMale = document.getElementById("avatar-male");
  const avatarFemale = document.getElementById("avatar-female");
  const staticPurchaseImgContainer = document.getElementById(
    "static-purchase-img-container",
  ); // Static Preview Element

  function updateStaticAvatarVisibility(use) {
    if (use) {
      staticPurchaseImgContainer.style.display = "block";
    } else {
      staticPurchaseImgContainer.style.display = "none";
    }
  }

  // Init state
  // --- LOGIC: AVATAR & NAMES TOGGLE ---
  const namesFemaleArea = document.getElementById("names-female-area");
  const labelCustomNames = document.getElementById("label-custom-names");
  const nameInputFemale = document.getElementById("custom-names-female");

  function updateAvatarUI(isChecked) {
    if (isChecked) {
      avatarConfigArea.classList.remove("hidden");
      namesFemaleArea.classList.remove("hidden");
      labelCustomNames.textContent = "Custom Names (Male) ♂";
    } else {
      avatarConfigArea.classList.add("hidden");
      namesFemaleArea.classList.add("hidden");
      labelCustomNames.textContent = "Custom Names (One per line)";
    }
    updateStaticAvatarVisibility(isChecked);
  }

  // Init state
  updateAvatarUI(useAvatarCheck.checked);

  useAvatarCheck.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    if (generator) generator.useAvatar = isChecked;
    updateAvatarUI(isChecked);
  });

  avatarMale.addEventListener("change", () => {
    if (generator)
      generator.avatarsMale = avatarMale.value
        .split("\n")
        .filter((l) => l.trim());
  });

  avatarFemale.addEventListener("change", () => {
    if (generator)
      generator.avatarsFemale = avatarFemale.value
        .split("\n")
        .filter((l) => l.trim());
  });

  const nameInput = document.getElementById("custom-names");
  // We don't necessarily need to update the generator live for names unless we want to reflect it in the preview immediately.
  // For simplicity, we can just let the export handle the full structure.

  // --- EXPORT ---
  const getCodeBtn = document.getElementById("get-code-btn");
  getCodeBtn.addEventListener("click", () => {
    // Process Names with Gender
    let finalNames = [];
    const maleNames = nameInput.value
      .trim()
      .split("\n")
      .filter((l) => l.trim());
    const femaleNames = nameInputFemale.value
      .trim()
      .split("\n")
      .filter((l) => l.trim());

    if (useAvatarCheck.checked) {
      // Strict Gender Mode
      maleNames.forEach((n) =>
        finalNames.push({ name: n.trim(), gender: "male" }),
      );
      femaleNames.forEach((n) =>
        finalNames.push({ name: n.trim(), gender: "female" }),
      );
    } else {
      // Mixed/Neutral Mode (using only the first textarea)
      maleNames.forEach((n) =>
        finalNames.push({ name: n.trim(), gender: "neutral" }),
      );
    }

    const config = {
      visual: {
        bgColor:
          previewCanvas.style.getPropertyValue("--vp-bg-color").trim() ||
          "rgba(255,255,255,0.9)",
        textColor:
          previewCanvas.style.getPropertyValue("--vp-text-color").trim() ||
          "#333333",
        highlightColor:
          previewCanvas.style.getPropertyValue("--vp-highlight-color").trim() ||
          "#007bff",
        borderRadius:
          previewCanvas.style.getPropertyValue("--vp-border-radius").trim() ||
          "12px",
        borderWidth:
          previewCanvas.style.getPropertyValue("--vp-border-width").trim() ||
          "1px",
        borderColor:
          previewCanvas.style.getPropertyValue("--vp-border-color").trim() ||
          "rgba(255,255,255,0.5)",
        padding:
          previewCanvas.style.getPropertyValue("--vp-padding").trim() ||
          "12px 16px",
        shadow:
          previewCanvas.style.getPropertyValue("--vp-shadow").trim() || "none",
        position: positionSelect.value,
        animType: animTypeSelect ? animTypeSelect.value : "anim-slide-up",
      },
      behavior: {
        speed: animSpeedInput.value + "s",
        displayTime: displayTimeInput.value,
        delayTime: delayTimeInput.value,
        viewerMin: viewerMin.value,
        viewerMax: viewerMax.value,
      },
      content: {
        names: finalNames,
        useAvatar: useAvatarCheck.checked,
        avatarsMale: avatarMale.value.split("\n").filter((l) => l.trim()),
        avatarsFemale: avatarFemale.value.split("\n").filter((l) => l.trim()),
      },
    };

    const exportCode = generateExportCode(config);

    // Show in a simple prompt or overlay (using prompt for now for copy-paste)
    // Better: create a modal
    showModal(exportCode);
  });

  function showModal(code) {
    let modal = document.getElementById("export-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "export-modal";
      modal.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.5); z-index: 10000;
                display: flex; align-items: center; justify-content: center;
            `;
      // Updated Modal Style for Tailwind
      modal.innerHTML = `
                <div class="bg-white p-6 rounded-lg w-[600px] max-w-[90%] shadow-xl border">
                    <h3 class="text-lg font-semibold mb-2">Copy Code Below</h3>
                    <textarea id="export-area" class="w-full h-64 p-2 border rounded font-mono text-sm mb-4"></textarea>
                    <div class="flex justify-end gap-2">
                         <button id="close-modal" class="px-4 py-2 border rounded hover:bg-gray-100">Close</button>
                         <button id="copy-btn" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Copy</button>
                    </div>
                </div>
            `;
      document.body.appendChild(modal);

      modal
        .querySelector("#close-modal")
        .addEventListener("click", () => (modal.style.display = "none"));
      modal.querySelector("#copy-btn").addEventListener("click", () => {
        const area = modal.querySelector("#export-area");
        area.select();
        document.execCommand("copy");
        alert("Copied!");
      });
    }

    modal.querySelector("#export-area").value = code;
    modal.style.display = "flex";
  }

  function generateExportCode(config) {
    // Construct CSS Variables
    let cssVars = `
        :root {
            --vp-bg-color: ${config.visual.bgColor};
            --vp-text-color: ${config.visual.textColor};
            --vp-highlight-color: ${config.visual.highlightColor};
            --vp-border-radius: ${config.visual.borderRadius};
            --vp-border-width: ${config.visual.borderWidth};
            --vp-border-color: ${config.visual.borderColor};
            --vp-border-color: ${config.visual.borderColor};
            --vp-padding: ${config.visual.padding};
            --vp-shadow: ${config.visual.shadow};
            --vp-transition-speed: ${config.behavior.speed};
        }
        `;

    // Position Logic (Inline CSS for container)
    let posCSS = "";
    if (config.visual.position === "bottom-left")
      posCSS = "bottom: 20px; left: 20px;";
    if (config.visual.position === "bottom-right")
      posCSS = "bottom: 20px; right: 20px;";
    if (config.visual.position === "top-left")
      posCSS = "top: 20px; left: 20px;";
    if (config.visual.position === "top-right")
      posCSS = "top: 20px; right: 20px;";

    const cdnBase = `https://cdn.vanced.media/UserJoined_PopUp/v${GerenalConfig.version}`; // Versioned CDN

    return `<!-- Vanced Social Proof PopUp -->
<link rel="stylesheet" href="${cdnBase}/Styles/style.css">
<style>
${cssVars}
.vanced-popup-container { ${posCSS} }
</style>

<div id="vanced-popup-container" class="vanced-popup-container ${config.visual.animType}">
    <div class="vanced-popup-content">
        <div class="vanced-popup-image" style="display: none;">
            <img src="https://via.placeholder.com/50" alt="Avatar" id="vanced-popup-img" />
        </div>
        <div class="vanced-popup-text">
            <p id="vanced-popup-message">Waiting...</p>
            <span id="vanced-popup-time" class="vanced-time-ago">vừa xong</span>
        </div>
    </div>
</div>

<script>
    window.UserJoinedPopUpConfig = {
        autoPlay: true,
        displayDuration: ${config.behavior.displayTime},
        delayBetween: ${config.behavior.delayTime},
        viewerRange: { min: ${config.behavior.viewerMin}, max: ${config.behavior.viewerMax} },
        names: ${JSON.stringify(config.content.names.length > 0 ? config.content.names : null)},
        useAvatar: ${config.content.useAvatar},
        avatarsMale: ${JSON.stringify(config.content.avatarsMale)},
        avatarsFemale: ${JSON.stringify(config.content.avatarsFemale)}
    };
</script>
<script type="module">
    import '${cdnBase}/animation.js'; 
    import '${cdnBase}/ScriptGenerator.js';
</script>
`;
  }
});
