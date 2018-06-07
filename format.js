let DAY, DEFAULT_FORMAT, HOUR, MINUTE, MONTH, SECOND, YEAR, entry, getFullTime, map, replace, time, two, unify;
YEAR = "year";
MONTH = "month";
DAY = "day";
HOUR = "hour";
MINUTE = "minute";
SECOND = "second";
DEFAULT_FORMAT = "%y-%M-%d";
map = {
    "%y": YEAR,
    "%M": MONTH,
    "%d": DAY,
    "%h": HOUR,
    "%m": MINUTE,
    "%s": SECOND
};
unify = function (time) {
    time -= 0;
    if (("" + time).length === 10) {
        time *= 1000;
    }
    return time;
};
two = function (str) {
    let s;
    s = "" + str;
    if (s.length === 1) {
        s = "0" + s;
    }
    return s;
};
replace = function (str, src, dst) {
    let reg;
    reg = new RegExp(src, "g");
    return str.replace(reg, dst);
};
getFullTime = function (time) {
    let date;
    date = new Date(unify(time));
    return {
        year: date.getFullYear(),
        month: two(date.getMonth() + 1),
        day: two(date.getDate()),
        hour: two(date.getHours()),
        minute: two(date.getMinutes()),
        second: two(date.getSeconds())
    };
};
function formatDiffTime(time) {
    let ago, curTime, diff, int;
    time = unify(time);
    int = parseInt;
    curTime = +new Date();
    diff = curTime - time;
    ago = "";
    if (1000 * 60 > diff) {
        ago = "刚刚";
    } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
        ago = int(diff / (1000 * 60)) + "分钟前";
    } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
        ago = int(diff / (1000 * 60 * 60)) + "小时前";
    } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
    } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
    } else {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
    }
    return ago;

}
//格式化日期
function formatTime(time, format) {
    let fullTime, ret, src;
    if (format && (typeof format) !== "string") {
        throw new Error("format must be a string.");
    }
    fullTime = getFullTime(time);
    ret = format || DEFAULT_FORMAT;
    for (src in map) {
        ret = replace(ret, src, fullTime[map[src]]);
    }
    return ret;
}

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }
    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)
    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}

module.exports = {
    formatDiffTime: formatDiffTime,
    formatLocation: formatLocation,
    formatTime: formatTime
}