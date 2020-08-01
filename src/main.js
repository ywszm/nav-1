const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-CSSTricks\"></use>\n" +
      "</svg>", url: "https://css-tricks.com/"
  },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-mozilla\"></use>\n" +
      "</svg>", url: "https://developer.mozilla.org/zh-CN/"
  },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-github\"></use>\n" +
      "</svg>", url: "https://github.com/"
  },
  { logo: "J", url: "https://jsbin.com/" },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-juejin\"></use>\n" +
      "</svg>", url: "https://juejin.im/"
  },
  { logo: "", url: "https://www.bootcdn.cn/" },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-zhihu\"></use>\n" +
      "</svg>", url: "https://www.zhihu.com/"
  },
  { logo: "", url: "http://jsrun.net/" },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-code-sandbox-circle-\"></use>\n" +
      "</svg>", url: "https://codesandbox.io/"
  },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-figma\"></use>\n" +
      "</svg>", url: "https://www.figma.com/"
  },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-jquery-original\"></use>\n" +
      "</svg>", url: "https://www.jquery123.com/"
  },
  { logo: "", url: "https://www.w3cways.com/css3-animation-tool" },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-HTML\"></use>\n" +
      "</svg>", url: "https://www.html.cn/tool/css3Preview/Border-Radius.html"
  },
  {
    logo: "<svg class=\"icon\" aria-hidden=\"true\">\n" +
      "    <use xlink:href=\"#icon-xxx\"></use>\n" +
      "</svg>", url: "https://www.yuque.com/"
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

// $(document).on("keypress", (e) => {
//   const { key } = e;
//   for (let i = 0; i < hashMap.length; i++) {
//     if (hashMap[i].logo.toLowerCase() === key) {
//       window.open(hashMap[i].url);
//     }
//   }
// });
