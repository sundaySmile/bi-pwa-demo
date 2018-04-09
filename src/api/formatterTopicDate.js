function formatterDataShow(list = []) {
    return list.map(item => {
        return formatterDayData(item);
    });
}

function formatterDayData(item = {}) {
    const {
        timeStart,
        timeEnd,
        averageChangeCount=0,
        averageViewCount=0,
        averageViewDuration=0,
        changeDetailCount=0,
        changeDetailPeopleCount=0,
        code=0,
        indexChange=0,
        name=0,
        shareCount=0,
        sharePersonCount=0,
        uv=0,
        viewCount=0
    } = item;
    const timeStartStr = dateToString(timeStart);
    const timeEndStr = dateToString(timeEnd);
    let dataPeriod = `${timeStartStr}~${timeEndStr}`;
    if (timeStartStr === timeEndStr) {
        dataPeriod = timeEndStr;
    }

    return {
        timeStart,
        timeEnd,
        averageChangeCount: Number(averageChangeCount).toFixed(1),
        averageViewCount:Number(averageViewCount).toFixed(1),
        averageViewDuration:"-",
        changeDetailCount,
        changeDetailPeopleCount,
        code,
        indexChange:"-",
        name,
        shareCount:"-",
        sharePersonCount:"-",
        uv,
        viewCount,
        dataPeriod
    };
}
function dateToString(date) {
    const activeDate = new Date(date);
    const month = activeDate.getMonth() + 1;
    const day = activeDate.getDate();
    return `${month}月${day}日`;
}

export default {
    formatterDataShow
}
