// function internetConnection() {
//   return {
//     isOnline: navigator.onLine,
//     init() {
//       this.checkConnection();
//       window.addEventListener("online", () => this.checkConnection());
//       window.addEventListener("offline", () => this.checkConnection());
//     },
//     checkConnection() {
//       this.isOnline = navigator.onLine;
//       document.getElementById("modal").style.display = this.isOnline
//         ? "none"
//         : "flex";
//       document.getElementById("modal-message").textContent = this.isOnline
//         ? ""
//         : "You are offline. Please check your internet connection.";
//     },
//   };
// }

// window.onload = () => {
//   const connection = internetConnection();
//   connection.init();
// };

// start image zoom

const image = document.getElementById("image");
const lens = document.getElementById("lens");
const zoomResult = document.getElementById("zoomResult");
const zoomedImage = document.getElementById("zoomedImage");

if (image && lens) {
  image.addEventListener("mousemove", moveLens);
  lens.addEventListener("mousemove", moveLens);
  image.addEventListener("mouseleave", hideLensAndZoom);
  lens.addEventListener("mouseleave", hideLensAndZoom);

  function moveLens(e) {
    lens.style.display = "block";
    zoomResult.style.display = "block";

    const pos = getCursorPos(e);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x > image.width - lens.offsetWidth) x = image.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > image.height - lens.offsetHeight)
      y = image.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = x + "px";
    lens.style.top = y + "px";
    zoomedImage.style.left = -(x * 2) + "px";
    zoomedImage.style.top = -(y * 2) + "px";
  }

  function getCursorPos(e) {
    const rect = image.getBoundingClientRect();
    const x = e.pageX - rect.left - window.pageXOffset;
    const y = e.pageY - rect.top - window.pageYOffset;
    return { x: x, y: y };
  }

  function hideLensAndZoom() {
    lens.style.display = "none";
    zoomResult.style.display = "none";
  }
}

// end image zoom
// start list & grid
const listView = document.getElementById("listView");
const gridView = document.getElementById("gridView");
const productContainer = document.getElementById("productContainer");

if (listView && gridView && productContainer) {
  listView.addEventListener("click", function () {
    productContainer.classList.remove("grid");
    productContainer.classList.add("list");
  });

  gridView.addEventListener("click", function () {
    productContainer.classList.remove("list");
    productContainer.classList.add("grid");
  });
}

const listViewButton = document.querySelector(".fa-list");
const gridViewButton = document.querySelector(".fa-th-large");

if (listViewButton && gridViewButton) {
  listViewButton.addEventListener("click", function () {
    listViewButton.classList.add("active");
    gridViewButton.classList.remove("active");
  });

  gridViewButton.addEventListener("click", function () {
    gridViewButton.classList.add("active");
    listViewButton.classList.remove("active");
  });
}

// end list & grid
 