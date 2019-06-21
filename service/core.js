//艺术家信息进行处理
exports.formatArtist = function (artists) {
    let art = "";
    for (let i = 0; i < artists.length; i++) {
        art += artists[i].artist_name + " / ";
    }
    art = art.substring(0, art.lastIndexOf("/"));
    return art;
}
let k2x = {};
k2x.bfv1x = function (bB3x) {
    var de4i = bB3x;
    if (k2x.fM5R(bB3x))
        de4i = new Date(Date.parse(bB3x));
    if (!k2x.IC3x(bB3x))
        de4i = new Date(bB3x);
    console.log("17 " + de4i);
    return de4i
}
k2x.fM5R = function (i2x) {
    return HH3x(i2x, "string")
}
k2x.ib5g = function () {
    var bA3x = {
        i: !0,
        r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g
    }
        , clp7i = ["上午", "下午"]
        , clH7A = ["A.M.", "P.M."]
        , buk5p = ["日", "一", "二", "三", "四", "五", "六"]
        , clN7G = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]
        , clO7H = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var Tb7U = function (hm5r) {
        hm5r = parseInt(hm5r) || 0;
        return (hm5r < 10 ? "0" : "") + hm5r
    };
    var clP7I = function (qD8v) {
        return qD8v < 12 ? 0 : 1
    };
    return function (bB3x, Lg4k, clU7N) {
        console.log(bB3x, Lg4k);
        if (!bB3x || !Lg4k)
            return "";
        bB3x = k2x.bfv1x(bB3x);
        bA3x.yyyy = bB3x.getFullYear();
        bA3x.yy = ("" + bA3x.yyyy).substr(2);
        bA3x.M = bB3x.getMonth() + 1;
        bA3x.MM = Tb7U(bA3x.M);
        bA3x.eM = clO7H[bA3x.M - 1];
        bA3x.cM = clN7G[bA3x.M - 1];
        bA3x.d = bB3x.getDate();
        bA3x.dd = Tb7U(bA3x.d);
        bA3x.H = bB3x.getHours();
        bA3x.HH = Tb7U(bA3x.H);
        bA3x.m = bB3x.getMinutes();
        bA3x.mm = Tb7U(bA3x.m);
        bA3x.s = bB3x.getSeconds();
        bA3x.ss = Tb7U(bA3x.s);
        bA3x.ms = bB3x.getMilliseconds();
        bA3x.w = buk5p[bB3x.getDay()];
        var bME0x = clP7I(bA3x.H);
        bA3x.ct = clp7i[bME0x];
        bA3x.et = clH7A[bME0x];
        if (!!clU7N) {
            bA3x.H = bA3x.H % 12
        }
        return k2x.Ch2x(bA3x, Lg4k)
    }
}();

k2x.Ch2x = function (bA3x, bq3x) {
    if (!bA3x || !bq3x || !bq3x.replace)
        return bq3x || "";
    return bq3x.replace(bA3x.r, function ($1) {
        var m2x = bA3x[!bA3x.i ? $1.toLowerCase() : $1];
        return m2x != null ? m2x : $1
    })
}

k2x.IC3x = function (i2x) {
    return HH3x(i2x, "date")
}
var HH3x = function (i2x, u2x) {
    try {
        u2x = u2x.toLowerCase();
        if (i2x === null)
            return u2x == "null";
        if (i2x === undefined)
            return u2x == "undefined";
        return bc3x.toString.call(i2x).toLowerCase() == "[object " + u2x + "]"
    } catch (e) {
        return !1
    }
};
exports.formatDate = function (bB3x) {
    let num = 0;
    if (Object.prototype.toString.call(bB3x) == '[object String]') {
        for (let i = bB3x.length - 1; i >= 0; i--) {
            num = num * 10 + (bB3x[i] - '0');
        }
        bB3x = num;
    }

    console.log(bB3x);
    if (k2x.IC3x(bB3x))
        bB3x = bB3x.getTime();
    var fi5n = new Date
    kT6N = fi5n.getTime() - bB3x;
    if (kT6N <= 6e4)
        return "刚刚";
    var oj8b = fi5n.getHours() * 36e5 + fi5n.getMinutes() * 6e4 + fi5n.getSeconds() * 1e3;
    if (kT6N <= oj8b) {
        if (kT6N < 36e5) {
            var Gp3x = Math.floor(kT6N / 6e4);
            return Gp3x + "分钟前"
        }
        return k2x.ib5g(bB3x, "HH:mm")
    } else {
        if (kT6N < oj8b + 864e5) {
            return "昨天" + k2x.ib5g(bB3x, "HH:mm")
        } else {
            var gU5Z = fi5n.getFullYear()
                , WF8x = new Date(gU5Z, 0, 1);
            var oj8b = fi5n.getTime() - WF8x.getTime();
            if (kT6N < oj8b) {
                return k2x.ib5g(bB3x, "M月d日 HH:mm")
            }
            return k2x.ib5g(bB3x, "yyyy年M月d日")
        }
    }
}
