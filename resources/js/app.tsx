import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { Toaster } from 'sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const appPages = import.meta.glob('./pages/**/*.tsx');
const modulePage = import.meta.glob('Modules/**/resources/assets/js/pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        // First check module pages - look for exact match or nested structure
        const moduleKey = Object.keys(modulePage).find((path) => {
            return path.endsWith(`/pages/${name}.tsx`) || 
                   path.endsWith(`/${name}/Index.tsx`) ||
                   path.includes(`/pages/${name.replace('/', '/')}.tsx`);
        });

        if (moduleKey) {
            const page = await modulePage[moduleKey]() as { default: any };
            return page.default;
        }

        // Then check app-level pages
        const appKey = `./pages/${name}.tsx`;
        if (appPages[appKey]) {
            const page = await appPages[appKey]() as { default: any };
            return page.default;
        }

        // Try alternative app page structures
        const altAppKey = Object.keys(appPages).find(path => 
            path.includes(name) || path.endsWith(`/${name}.tsx`)
        );
        
        if (altAppKey) {
            const page = await appPages[altAppKey]() as { default: any };
            return page.default;
        }

        console.error(`Page not found: ${name}`);
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <Toaster position="top-right" richColors closeButton />
                <div className="mx-auto w-full max-w-[1920px]">
                    <App {...props} />
                </div>
            </>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
