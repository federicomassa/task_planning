class TaskUtils {
    taskLinksToPage(task, page) {
        const pagePath = page.file.path;
        const pageName = page.file.name;

        if (task.outlinks && task.outlinks.some(link => link.path === pagePath)) {
            return true;
        }

        return (
            task.text.includes(`[[${pagePath}]]`) ||
            task.text.includes(`[[${pageName}]]`) ||
            task.text.includes(`[[${pagePath}|`) ||
            task.text.includes(`[[${pageName}|`)
        );
    }

    getTaskPages(dv, scopePath = "") {
        const tasksPath = scopePath
            ? `"${scopePath}/Tasks"`
            : "";

        return tasksPath
            ? dv.pages(tasksPath)
            : dv.pages();
    }

    countCompletedTasksLinkedToPage(dv, page, start, end, scopePath = "") {
        let completed = 0;

        for (const sourcePage of this.getTaskPages(dv, scopePath)) {
            for (const task of sourcePage.file.tasks) {
                if (!task.completed) continue;
                if (!task.completion) continue;
                if (!this.taskLinksToPage(task, page)) continue;

                const completion = moment(task.completion);

                if (completion.isSameOrAfter(start) && completion.isSameOrBefore(end)) {
                    completed++;
                }
            }
        }

        return completed;
    }

    countOpenTasksLinkedToPage(dv, page, scopePath = "") {
        let count = 0;

        for (const sourcePage of this.getTaskPages(dv, scopePath)) {
            for (const task of sourcePage.file.tasks) {
                if (task.completed) continue;
                if (!this.taskLinksToPage(task, page)) continue;

                count++;
            }
        }

        return count;
    }
}