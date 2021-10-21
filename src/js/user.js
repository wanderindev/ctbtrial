(function(app) {
    app.ready = (callback) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    }

    app.ready(() => {
        const relativeTime = window.dayjs_plugin_relativeTime;
        dayjs.extend(relativeTime);

        // Reformat date for FAQ last update
        app.reformatDates = () => {
            document.querySelectorAll(".date-updated").forEach((elem) => {
                elem.textContent = dayjs(elem.textContent, "MM/DD/YYY").fromNow();
            });
        }
        app.reformatDates();

    });
})(window.app = window.app || {});