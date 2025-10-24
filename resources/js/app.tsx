import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const appPages = import.meta.glob('./pages/**/*.tsx');
const modulePage = import.meta.glob('Modules/**/resources/assets/js/pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        // First check module pages
        const moduleKey = Object.keys(modulePage).find((path) => path.endsWith(`/pages/${name}.tsx`));

        if (moduleKey) {
            const page = await modulePage[moduleKey]();
            return page.default;
        }

        // Then check app-level pages
        const appKey = `./pages/${name}.tsx`;
        if (appPages[appKey]) {
            const page = await appPages[appKey]();
            return page.default;
        }

        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <div className="mx-auto w-full max-w-[1920px]">
                <App {...props} />
            </div>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
