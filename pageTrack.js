
const trackConfig = [
    {
        path: 'pages/film/index',
        tracks: [
            {
                element: '.playing-item',
                dataKeys: ['imgUrls', 'playingFilms'],
            },
            {
                element: '.more',
                dataKeys: ['imgUrls', 'playingFilms'],
            },
            {
                element: '.testTrack',
                dataKeys: ['imgUrls', 'playingFilms'],
            },
        ],
    },
];

/**
 * 获取当前页面的埋点配置
 * @returns {Array}
 */
const findPageTracks = function () {
    try {
        const { route } = this;
        const pageTrackConfig = trackConfig.find(item => item.path === route);
        const { tracks } = pageTrackConfig;
        return tracks || [];
    } catch (e) {
        return [];
    }
};

/**
 * 获取页面元素信息
 * @param {String} element 元素class或者id
 * @returns {Promise}
 */
const getBoundingClientRect = function (element) {
    return new Promise((reslove) => {
        const query = wx.createSelectorQuery();
        query.select(element).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => reslove({ boundingClientRect: res[0], scrollOffset: res[1] }));
    });
};

/**
 * 判断点击是否落在目标元素
 * @param {Object} clickInfo 用户点击坐标
 * @param {Object} boundingClientRect 目标元素信息
 * @param {Object} scrollOffset 页面位置信息
 * @returns {Boolean}
 */
const isClickTrackArea = function (clickInfo, boundingClientRect, scrollOffset) {
    const { x, y } = clickInfo.detail; // 点击的x y坐标
    const { left, right, top, height } = boundingClientRect;
    const { scrollTop } = scrollOffset;
    if (left < x && x < right && scrollTop + Math.abs(top) < y && y < scrollTop + Math.abs(top) + height) {
        return true;
    }
    return false;
};

const report = function (track) {
    console.log(`被点击元素className:${track.element}`);
    track.dataKeys.forEach((name) => {
        console.log(`被记录数据key:${name}, value: ${JSON.stringify(this.data[name])}`);
    });
};


const addPageMethod = function () {
    const originPage = Page;
    Page = (page) => {
        page.pageAutoTrack = function (e) {
            const tracks = findPageTracks.call(this);
            tracks.forEach((track) => {
                getBoundingClientRect(track.element).then((res) => {
                    const isHit = isClickTrackArea(e, res.boundingClientRect, res.scrollOffset);
                    isHit && report.call(this, track);
                });
            });
        };
        page.addElementTrack = function (element, dataKeys) {
            const tracks = findPageTracks.call(this);
            const track = tracks.find(item => item.element === element);
            !track && tracks.push({ element, dataKeys });
        };
        // 执行原Page对象
        return originPage(page);
    };
};

addPageMethod();
