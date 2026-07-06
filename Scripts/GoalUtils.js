class GoalUtils {
    getGoalWindow(period) {
        const now = moment();

        switch (period) {
            case "day":
                return {
                    start: now.clone().startOf("day"),
                    end: now.clone().endOf("day")
                };

            case "week":
                return {
                    start: now.clone().startOf("isoWeek"),
                    end: now.clone().endOf("isoWeek")
                };

            case "month":
                return {
                    start: now.clone().startOf("month"),
                    end: now.clone().endOf("month")
                };

            case "year":
                return {
                    start: moment(`${now.year() - 1}-12-31 00:00`, "YYYY-MM-DD HH:mm"),
                    end: moment(`${now.year()}-12-31 23:59:59`, "YYYY-MM-DD HH:mm:ss")
                };

            default:
                return null;
        }
    }

    getActiveGoals(dv, scopePath = "") {
        const goalsPath = scopePath
            ? `"${scopePath}/Goals"`
            : '"Goals"';

        return dv.pages(goalsPath)
            .where(p => p.type === "goal" && p.status === "active")
            .sort(p => p.file.name);
    }

    getScopePathFromCurrentFile(dv) {
        const path = dv.current().file.path;
        return path.split("/")[0];
    }
}