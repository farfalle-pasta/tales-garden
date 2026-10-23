/* ========================================
   テイルズガーデン
   JavaScript
======================================== */


/* ---------- 共通ヘッダーを読み込む ---------- */

async function loadHeader() {
  const headerContainer = document.getElementById("header");

  if (!headerContainer) {
    return;
  }

  try {
    const response = await fetch("components/header.html");

    if (!response.ok) {
      throw new Error("ヘッダーを読み込めませんでした。");
    }

    const headerHTML = await response.text();

    headerContainer.innerHTML = headerHTML;

    setupMenu();

  } catch (error) {
    console.error(error);
  }
}


/* ---------- メニューを設定 ---------- */

function setupMenu() {

  const menuButton = document.getElementById("menuButton");
  const menuOverlay = document.getElementById("menuOverlay");

  if (!menuButton || !menuOverlay) {
    return;
  }


  /* メニューを開く */

  function openMenu() {

    menuButton.classList.add("is-open");
    menuOverlay.classList.add("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "メニューを閉じる"
    );

    menuOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("menu-open");
  }


  /* メニューを閉じる */

  function closeMenu() {

    menuButton.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "メニューを開く"
    );

    menuOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("menu-open");
  }


  /* ---------- ボタンをクリック ---------- */

  menuButton.addEventListener("click", function () {

    const isOpen =
      menuButton.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  /* ---------- メニュー項目をクリック ---------- */

  const menuLinks =
    menuOverlay.querySelectorAll(".menu-item");


  menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {
      closeMenu();
    });

  });


  /* ---------- ESCキーで閉じる ---------- */

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      menuButton.classList.contains("is-open")
    ) {
      closeMenu();
    }

  });

}


/* ---------- ページ読み込み ---------- */

document.addEventListener(
  "DOMContentLoaded",
  loadHeader
);