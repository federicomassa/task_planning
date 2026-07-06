const goal = input?.goalPath
    ? dv.page(input.goalPath)
    : dv.current();

const { GoalCardRenderer } = customJS;

const container = dv.el("div", "", {
    cls: "goal-dashboard-wrapper"
});

GoalCardRenderer.render(dv, goal, container, {
    detailedStatus: true,
    expectedLabel: "Expected by now"
});
