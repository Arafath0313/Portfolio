import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import environment from "../config/environment";
import { useAppContext } from "../contexts/AppContext";
import { buildMediaUrl } from "../utils/apiHelpers";

const ensureMetaTag = (attribute, value) => {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  return tag;
};

const ensureLinkTag = (rel) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  return tag;
};

const usePageSeo = ({
  title,
  description,
  image,
  type = "website",
  noIndex = false,
} = {}) => {
  const location = useLocation();
  const { brandName, about, siteSettings } = useAppContext() || {};

  useEffect(() => {
    const siteName = brandName || environment.APP_NAME;
    const metaDescription =
      description ||
      siteSettings?.seoDescription ||
      about?.bio ||
      `Explore ${siteName}, a modern portfolio built with live project, passion, and credential data.`;
    const pageTitle = title ? `${title} | ${siteName}` : siteName;
    const resolvedImage = image
      ? buildMediaUrl(image)
      : buildMediaUrl(siteSettings?.logoUrl || about?.profileImage || "");
    const absoluteUrl = `${window.location.origin}${location.pathname}`;

    document.title = pageTitle;

    ensureMetaTag("name", "description").setAttribute("content", metaDescription);
    ensureMetaTag("property", "og:title").setAttribute("content", pageTitle);
    ensureMetaTag("property", "og:description").setAttribute("content", metaDescription);
    ensureMetaTag("property", "og:type").setAttribute("content", type);
    ensureMetaTag("property", "og:url").setAttribute("content", absoluteUrl);
    ensureMetaTag("name", "twitter:title").setAttribute("content", pageTitle);
    ensureMetaTag("name", "twitter:description").setAttribute("content", metaDescription);
    ensureMetaTag("name", "twitter:card").setAttribute(
      "content",
      resolvedImage ? "summary_large_image" : "summary"
    );
    ensureMetaTag("name", "robots").setAttribute(
      "content",
      noIndex ? "noindex, nofollow" : "index, follow"
    );

    if (resolvedImage) {
      ensureMetaTag("property", "og:image").setAttribute("content", resolvedImage);
      ensureMetaTag("name", "twitter:image").setAttribute("content", resolvedImage);
    }

    ensureLinkTag("canonical").setAttribute("href", absoluteUrl);
  }, [about?.bio, about?.profileImage, brandName, description, image, location.pathname, noIndex, siteSettings?.logoUrl, siteSettings?.seoDescription, title, type]);
};

export default usePageSeo;
