// categories section
const loadCategories = () => {
  const categoriesUrl = "https://openapi.programming-hero.com/api/categories";
  fetch(categoriesUrl)
    .then((res) => res.json())
    .then((data) => getCategories(data.categories));
};

loadCategories();

const getCategories = (datas) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = `<h1 class="inter-font font-semibold text-xl mb-4">Categories</h1>`;

  const container = document.getElementById("trees");

  for (let data of datas) {
    const newdiv = document.createElement("div");
    newdiv.innerHTML = `
      <p class="tree-btn inter-font mb-2 cursor-pointer">${data.category_name}</p>
    `;
    newdiv.querySelector("p").addEventListener("click", () => {
      manageSpinner(true);
      const categories = document.getElementsByClassName("tree-btn");
      for (let category of categories) {
        category.classList.remove(
          "rounded-sm",
          "text-white",
          "bg-green-700",
          "p-2"
        );
      }
      newdiv
        .querySelector("p")
        .classList.add("rounded-sm", "text-white", "bg-green-700", "p-2");
      const categoryDataUrl = `https://openapi.programming-hero.com/api/category/${data.id}`;

      fetch(categoryDataUrl)
        .then((res) => res.json())
        .then((datas) => {
          loadTrees(datas.plants, container);
        });
    });

    categoriesContainer.appendChild(newdiv);
  }
};

// Preloaded Data in trees

const preloadTrees = () => {
  const allTreesLink = "https://openapi.programming-hero.com/api/plants";
  const container = document.getElementById("trees");
  fetch(allTreesLink)
    .then((res) => res.json())
    .then((data) => loadTrees(data.plants, container));
};

preloadTrees();

const loadTrees = (datas, container) => {
  container.innerHTML = "";
  for (let data of datas) {
    const newdiv = document.createElement("div");
    newdiv.innerHTML = `
    <div class="bg-white w-[300px] p-5 rounded-xl space-y-3">
              <img class="w-[280px] h-[190px] rounded-xl" src="${data.image}" alt="" />
              <h1 onclick="loadTreeDetail(${data.id})" class="inter-font text-sm font-semibold">${data.name}</h1>
              <p class="inter-font text-xs">
                ${data.description}
              </p>
              <div class="flex justify-between items-center">
                <button class="btn btn-soft btn-success rounded-2xl">
                  ${data.category}
                </button>
                <h4 class="text-sm inter-font font-semibold">৳${data.price}</h4>
              </div>
              <div class="flex justify-center">
                <button onclick="cartloader('${data.name}', ${data.price})"  class="btn bg-green-700 text-white w-[95%] rounded-3xl">Add to Cart</button>
              </div>
            </div>`;
    container.appendChild(newdiv);
  }
  manageSpinner(false);
};

// tree detail modal

const loadTreeDetail = (id) => {
  const TreeUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(TreeUrl)
    .then((res) => res.json())
    .then((data) => getTreeDetails(data.plants));
};

const getTreeDetails = (data) => {
  const modalContainer = document.getElementById("my_modal_5");
  modalContainer.innerHTML = "";

  const newdiv = document.createElement("div");

  newdiv.innerHTML = `
  <div class="modal-box flex flex-col rounded-xl space-y-3">
          <img class="w-[100%] h-[100%] rounded-xl" src="${data.image}" alt="" />
              <h1 class="inter-font text-sm font-semibold">${data.name}</h1>
              <p class="inter-font text-xs">
                ${data.description}
              </p>
              <div class="flex justify-between items-center">
                <button class="btn btn-soft btn-success rounded-2xl">
                  ${data.category}
                </button>
                <h4 class="text-sm inter-font font-semibold">৳${data.price}</h4>
              </div>
              <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
        </div>`;
  modalContainer.appendChild(newdiv);
  modalContainer.showModal();
};

// cart section

const cartloader = (name, price) => {
  const currenttotal = document.getElementById("cart-total").innerHTML;
  const currenttotalInt = parseInt(currenttotal);
  const newtotal = price + currenttotalInt;
  document.getElementById("cart-total").innerHTML = newtotal;

  const cartDiv = document.getElementById("cart");
  const newdiv = document.createElement("div");
  newdiv.innerHTML = `
  <div class="bg-green-50 flex justify-between items-center p-3 rounded-xl mb-2">
    <div>
      <h4 class="inter-font font-semibold text-sm">${name}</h4>
      <h4 class="inter-font text-gray-800">৳${price} x 1</h4>
    </div>
    <i class="fa-solid fa-xmark text-gray-800"></i>
  </div>
  `;
  cartDiv.appendChild(newdiv);

  const deleteBtn = newdiv.querySelector("i");
  deleteBtn.addEventListener("click", () => {
    cartDiv.removeChild(newdiv);

    const currenttotal = document.getElementById("cart-total").innerHTML;
    const currenttotalInt = parseInt(currenttotal);
    const newtotal = currenttotalInt - price;

    document.getElementById("cart-total").innerHTML = newtotal;
  });
};

// manage spinner

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("trees").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("trees").classList.remove("hidden");
  }
};
