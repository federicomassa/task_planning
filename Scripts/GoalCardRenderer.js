class GoalCardRenderer {
    render(dv, goal, parent, options = {}) {
        const {
            detailedStatus = false,
            expectedLabel = "Expected",
            scopePath = "",
        } = options;

        const { GoalUtils, TaskUtils, GoalProgressUtils } = customJS;

        const window = GoalUtils.getGoalWindow(goal.period);

        if (!window) {
            const card = document.createElement("div");
            card.className = "goal-card goal-behind";
            card.innerHTML = `
                <div class="goal-card-title">${goal.file.name}</div>
                <div>Unsupported period: ${goal.period}</div>
            `;
            parent.appendChild(card);
            return;
        }

        const { start, end } = window;

        const completed = TaskUtils.countCompletedTasksLinkedToPage(dv, goal, start, end, scopePath);
        const openTasks = TaskUtils.countOpenTasksLinkedToPage(dv, goal, scopePath);

        const progress = GoalProgressUtils.computeGoalProgress(goal, {
            completed,
            openTasks,
            start,
            end
        });

        let statusText = progress.statusText;

        if (detailedStatus && progress.completed < progress.target) {
            statusText = progress.delta >= 0
                ? `🟢 On track — ahead by ${progress.delta.toFixed(1)}`
                : `🔴 Behind by ${Math.abs(progress.delta).toFixed(1)}`;
        }

        const card = document.createElement("div");
        card.className = `goal-card ${progress.statusClass}`;

        card.innerHTML = `
            <div class="goal-card-header">
                <div class="goal-card-title">${goal.file.name}</div>
                <div class="goal-card-status">${statusText}</div>
            </div>

            <div class="goal-card-progress-row">
                <div class="goal-card-progress-label">
                    <strong>${progress.completed}</strong> / ${progress.target}
                </div>
                <div class="goal-card-progress-percent">
                    ${progress.percentText}%
                </div>
            </div>

            <div class="goal-card-progress-bar">
                <div class="goal-card-progress-fill" style="width: ${progress.percentText}%"></div>
            </div>

            <div class="goal-card-details">
                <div>${expectedLabel}: <strong>${progress.expected.toFixed(1)}</strong> / ${progress.target}</div>
                <div>Remaining: <strong>${progress.remaining}</strong></div>
                <div>Due: <strong>${progress.dueText}</strong> <span class="goal-card-muted">(${progress.remainingTime} remaining)</span></div>
            </div>
        `;

        parent.appendChild(card);
    }
}