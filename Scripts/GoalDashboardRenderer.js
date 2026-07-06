class GoalDashboardRenderer {
    render(dv, parent, goals, options = {}) {
        const { GoalCardRenderer } = customJS;

        const title = document.createElement("h2");
        title.textContent = "Active goals";
        parent.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "goal-dashboard";
        parent.appendChild(grid);

        for (const goal of goals) {
            GoalCardRenderer.render(dv, goal, grid, options);
        }
    }
}