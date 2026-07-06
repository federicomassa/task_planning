class GoalProgressUtils {
    computeGoalProgress(goal, stats) {
        const {
            completed,
            openTasks = 0,
            start,
            end
        } = stats;

        const target = Number(goal.target);
        const now = moment();

        const totalWindow = end.diff(start);
        const elapsedWindow = now.diff(start);
        const elapsedFraction = Math.min(Math.max(elapsedWindow / totalWindow, 0), 1);

        const expected = target * elapsedFraction;
        const delta = completed - expected;
        const remaining = Math.max(target - completed, 0);

        const percent = Math.min(completed / target, 1);
        const percentText = Math.round(percent * 100);

        const isComplete = completed >= target;
        const isBehind = !isComplete && delta < 0;

        const requiredOpenTasks = Math.max(
            Math.ceil(expected) - completed,
            0
        );

        const isUnplanned = openTasks < requiredOpenTasks;

        const isBehindAndUnplanned = isBehind && isUnplanned;

        let statusClass;
        let statusText;

        if (isComplete) {
            statusClass = "goal-complete";
            statusText = "✅ Completed";
        } else if (isBehindAndUnplanned) {
            statusClass = "goal-unplanned";
            statusText = "⚫ Behind — unplanned";
        } else if (!isBehind) {
            statusClass = "goal-on-track";
            statusText = "🟢 On track";
        } else {
            statusClass = "goal-behind";
            statusText = "🔴 Behind";
        }

        return {
            target,
            completed,
            openTasks,
            expected,
            delta,
            remaining,
            percent,
            percentText,
            isComplete,
            isBehind,
            isUnplanned,
            isBehindAndUnplanned,
            statusClass,
            statusText,
            dueText: end.format("ddd, MMM D [at] h:mm A"),
            remainingTime: moment.duration(end.diff(now)).humanize()
        };
    }
}