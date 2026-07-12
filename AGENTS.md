# Project Structure Overview
- src/api - API for fetching and sending data to the backend. Usually split into block files, e.g. comments.ts - All methods related to comments in the project;
- src/components - Frequently used components, the folder is also split into three subfolders:
- - base - Core components (Buttons, Selectors, etc.);
- - content - Components for displaying games, users, and images;
- - custom - Customized versions of base components used in rare cases;
- src/configs - Folder for .json files used in dropdowns, table columns, etc. Only frequently used configs are stored here;
- src/fonts - Project fonts;
- src/hooks - Hooks;
- src/i18n - App translations for different languages;
- src/icons - App icons;
- src/pages - App pages, split into folders (blocks);
- src/routes - App routes;
- src/stories - Redux;
- src/types - Interfaces and types for entities;
- src/utils - Reusable utility scripts for the project.

## Page Section (Block) Structure
A folder consists of index.tsx - which contains the main page logic, e.g. if it's a posts section, then index.tsx holds the list of posts,
while details.tsx holds detailed information about a post. But if a section has no entity list, then index.tsx contains the detailed entity information.

### Example of src/pages/dashboard folder (with a list and tabbed details):
- dashboard/index.tsx - Main container with dashboard tabs;
- dashboard/compontents/filter.tsx - Filter component for the dashboard;
- dashboard/filters - Filters for each dashboard tab;
- dashboard/configs - .json configs for dropdowns and dashboard tables;
- dashboard/api.ts - API for backend integration;
- dashboard/routes.tsx - Routes and paths for the dashboard and its tabs;

### Example of src/pages/users folder (details only):
- users/index.tsx - Detailed user information;
- users/modals - Modal windows for the users section, including delete, edit, and session view modals;
- users/api.ts - API for user operations;
- users/routes.tsx - Routes and paths for users;

## API Structure in a File:
### Method Template
```
    /**
     * What the method does
     *
     * @param parameter_name - description
     * @returns
    */
    const method_name = (parameter: type) =>
        apiInstance.<request_type>("api/path", parameters);
```
### Example of a GET Request with Filters
```
    /**
     * Games list
     *
     * @param params - Filters
     * @returns
    */
    const games_list = (params: Record<string, string>) =>
        apiInstance.get("/api/v1/games", {
            params
        });
```
