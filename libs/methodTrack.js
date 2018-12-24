
const tracking = {
    'pages/film/index': [
        {
            eventName: 'buttonClick',
            method: 'getBanner',
            data: ['imgUrls'],
        },
        {
            method: 'toBannerDetail',
            data: ['imgUrls'],
        },
    ],
};
const getActivePage = function () {
    const curPages = getCurrentPages();
    if (curPages.length) {
        return curPages[curPages.length - 1];
    }
    return {};
};

function isPromise(value) {
    return value && Object.prototype.toString.call(value) === '[object Promise]';
  }

const recordPageFn = function (page, methodName) {
    const userDefinedMethod = page[methodName];
    page[methodName] = function () {
        const { route } = getActivePage();
        const tracks = tracking[route];
        const result = userDefinedMethod.apply(this, arguments);
        if (isPromise(result)) {
            result.then(() => {
                tracks.forEach((item) => {
                    if (item.method === methodName) {
                        console.log(this.data.imgUrls);
                    }
                });
            });
        } else {
            tracks.forEach((item) => {
                if (item.method === methodName) {
                    console.log(this.data.imgUrls);
                }
            });
        }
        return result;
    };
};

const rewritePage = function () {
    const originPage = Page;
    Page = (page) => {
        Object.keys(page).forEach((methodName) => {
            typeof page[methodName] === 'function'
                && recordPageFn(page, methodName);
        });
        // 执行原Page对象
        return originPage(page);
    };
};
rewritePage();
