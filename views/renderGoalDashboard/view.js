const {
    GoalUtils,
    GoalDashboardRenderer
} = customJS;

const scopePath = GoalUtils.getScopePathFromCurrentFile(dv);
const goals = GoalUtils.getActiveGoals(dv, scopePath);

const root = dv.el("div", "", {
    cls: "goal-dashboard-wrapper"
});

GoalDashboardRenderer.render(dv, root, goals, {scopePath});