import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import environment from "../config/environment";
import aboutService from "../services/aboutService";
import resumeService from "../services/resumeService";
import siteSettingService from "../services/siteSettingService";
import socialLinkService from "../services/socialLinkService";
import { buildMediaUrl } from "../utils/apiHelpers";
import { filterActiveItems, sortByDisplayOrder } from "../utils/content";

/* eslint-disable react-refresh/only-export-components */
export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

const updateFavicon = (faviconUrl) => {
  if (!faviconUrl) {
    return;
  }

  const link = document.head.querySelector('link[rel="icon"]') || document.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("href", buildMediaUrl(faviconUrl));

  if (!link.parentNode) {
    document.head.appendChild(link);
  }
};

export function AppProvider({ children }) {
  const [state, setState] = useState({
    about: null,
    resume: null,
    siteSettings: null,
    socialLinks: [],
    loading: true,
    error: null,
    initialized: false,
  });

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));

    const results = await Promise.allSettled([
      aboutService.get(),
      resumeService.get(),
      siteSettingService.get(),
      socialLinkService.getAll(),
    ]);

    const [aboutResult, resumeResult, settingsResult, socialResult] = results;
    const allFailed = results.every((result) => result.status === "rejected");

    setState({
      about: aboutResult.status === "fulfilled" ? aboutResult.value : null,
      resume: resumeResult.status === "fulfilled" ? resumeResult.value : null,
      siteSettings: settingsResult.status === "fulfilled" ? settingsResult.value : null,
      socialLinks:
        socialResult.status === "fulfilled"
          ? sortByDisplayOrder(filterActiveItems(socialResult.value))
          : [],
      loading: false,
      error: allFailed ? results.find((result) => result.status === "rejected")?.reason ?? null : null,
      initialized: true,
    });
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    updateFavicon(state.siteSettings?.faviconUrl);
  }, [state.siteSettings?.faviconUrl]);

  const value = useMemo(() => {
    const brandName =
      state.siteSettings?.siteTitle || state.about?.fullName || environment.APP_NAME;

    return {
      ...state,
      refresh,
      brandName,
      siteDescription:
        state.siteSettings?.seoDescription || state.about?.headline || "Public portfolio website",
      contact: {
        email: state.siteSettings?.contactEmail || state.about?.email || "",
        phone: state.siteSettings?.contactPhone || state.about?.phone || "",
        address: state.siteSettings?.address || state.about?.address || state.about?.location || "",
      },
    };
  }, [refresh, state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
