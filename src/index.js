const DEFAULT_DELAY = 500;
const MIN_DELAY = 300;

// 主方法
const install = function (Vue, options) {
  let delay = DEFAULT_DELAY;
  const funcLineMap = (options && options.funcLineMap) || {};
  const gitLink = (options && options.gitLink) || '';

  if (options
      && options.delay
      && options.delay >= MIN_DELAY
  ) {
    delay = options.delay;
  }

  Vue.mixin({
    mounted() {
      setTimeout(() => {
        addSourceLink(funcLineMap, gitLink);
      }, delay);
    },
  });
};


// 获取元素，赋予属性
function addSourceLink(funcLineMap, gitLink) {
  const sourceEle = document.getElementsByClassName('source-btn');

  sourceEle.forEach((item) => {
    if (!item.target) {
      const boforeTitle = item.parentElement && item.parentElement.previousElementSibling;
      item.href = getHref(item, funcLineMap, gitLink);
      item.target = '_blank';
      item.style = 'position: absolute;right: 0;bottom: 6px;font-size: 1rem;';
      item.innerText = 'source';

      // console.log(item, boforeTitle);
      if (boforeTitle) {
        boforeTitle.style = 'position: relative;';
        boforeTitle.appendChild(item);
      }
    }
  });
}

// 获取a标签的链接
function getHref(ele, funcLineMap, gitLink) {
  const eleClass = ele.classList && ele.classList[1] ? ele.classList[1] : '';
  const linkPostFix = funcLineMap[eleClass];
  if (!linkPostFix) {
    return '';
  }
  const resPath = pathResolve(gitLink, linkPostFix);
  return resPath;
}

// 模仿path.resolve
function pathResolve(dir, file = '') {
  if (file.startsWith('.')) {
    file = file.slice(1);
  }
  return dir + file;
}


export default install;
