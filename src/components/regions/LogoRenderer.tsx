import React from "react";
import { getMediaUrl } from '@/utils/getMediaUrl';

const LogoRenderer = ({ region }: { region: any }) => {
  // Assuming region has the structure from your example
  const logoComponent = region?.components?.find((component: any) => component.componentTemplate.view === "Teaser");

  if (!logoComponent) return null;

  const logoMedia = logoComponent.content?.media;
  const logoMediaAltText = logoMedia?.title
  const logoLink = logoComponent.content?.link?.internalLink?.url;
  const alternateText = logoComponent.content?.link?.alternateText;

  return logoMedia ? (
    <a href={logoLink ? `${logoLink}` : "/"} className="navbar-logo">
      <img src={getMediaUrl(logoMedia.url)} alt={logoMediaAltText} height="80" />
    </a>
  ) : null;
};

export default LogoRenderer;
