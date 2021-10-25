(function(app) {
    app.ready = (callback) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
        } else {
            callback();
        }
    }

    app.ready(() => {
        let auth0 = null;
        const relativeTime = window.dayjs_plugin_relativeTime;
        dayjs.extend(relativeTime);

        // Initialize Auth0
        const fetchAuthConfig = () => fetch("/auth_config.json");

        // Configure Auth0 client
        const configureClient = async () => {
            const response = await fetchAuthConfig();
            const config = await response.json();

            auth0 = await createAuth0Client({
                domain: config.domain,
                client_id: config.clientId
            });
        };

        window.onload = async () => {
            await configureClient();
        }

        // Reformat date for FAQ last update
        app.reformatDates = () => {
            document.querySelectorAll(".date-updated").forEach((elem) => {
                elem.textContent = dayjs(elem.textContent, "MM/DD/YYY").fromNow();
            });
        }
        app.reformatDates();

    });
})(window.app = window.app || {});