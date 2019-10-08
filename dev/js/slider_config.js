// Set up date slider
    var beginMoment = moment("2014-09-01");
    var endMoment = moment();

    var beginDateRange = beginMoment;
    var endDateRange = endMoment;


if ($(window).width() < 960) {

    $(function () {
        $("#time").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: +moment(beginMoment).format("X"),
            max: +moment(endMoment).format("X"),
            from: +moment(beginMoment).format("X"),
            to: +moment(endMoment).format("X"),
            type: 'double',
            force_edges: true,
            onFinish: function (obj) {
              beginDateRange = moment(obj.from, "X").format("YYYY-MM-DD 00:00:00");
              endDateRange = moment(obj.to, "X").format("YYYY-MM-DD 23:59:59");
              refreshTrackerMap();
            },
            prettify: function (num) {
            return moment(num, "X").format("Do MMM YYYY");
            }
        });

    });


}
else {

   $(function () {
        $("#time").ionRangeSlider({
            hide_min_max: true,
            keyboard: true,
            min: +moment(beginMoment).format("X"),
            max: +moment(endMoment).format("X"),
            from: +moment(beginMoment).format("X"),
            to: +moment(endMoment).format("X"),
            type: 'double',
            force_edges: false,
            onFinish: function (obj) {
              beginDateRange = moment(obj.from, "X").format("YYYY-MM-DD 00:00:00");
              endDateRange = moment(obj.to, "X").format("YYYY-MM-DD 23:59:59");
              refreshTrackerMap();
            },
            prettify: function (num) {
            return moment(num, "X").format("Do MMM YYYY");
            }
        });

    });


}
