import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';

export interface Settings {
    site_name: string;
    site_tagline: string;
    site_description: string;
    hero_title: string;
    hero_tagline: string;
    hero_description: string;
    hero_image: string;
    featured_collection_title: string;
    featured_collection_description: string;
    categories_title: string;
    categories_description: string;
    contact_address: string;
    contact_phone: string;
    contact_email: string;
    facebook_link: string;
    insta_link: string;
    tiktok_link: string;
    delivery_cost_standard: string;
    delivery_cost_fast: string;
    delivery_cost_sameday: string;
    site_logo: string;
}

interface SettingsContextType {
    settings: Settings | null;
    loading: boolean;
    error: Error | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get<Settings>('/settings');
                setSettings(response.data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch settings'));
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, error }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
